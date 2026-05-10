# 06 · End-to-end data flow walkthroughs

Concrete sequences for the four user-facing flows. Open the linked source
files alongside this doc — every block annotates real lines.

---

## Flow A — Signup

```
Browser                        Node API                  MongoDB
   │  POST /api/signup            │                         │
   │  { name,email,role,...}      │                         │
   ├─────────────────────────────►│                         │
   │                              │  bcrypt.hash(pwd, 10)   │
   │                              │  new User(...)          │
   │                              ├────────────────────────►│
   │                              │                         │  insert into users
   │                              │◄────────────────────────┤
   │  201 { message: "..." }      │                         │
   │◄─────────────────────────────┤                         │
```

* Validation (in `server.js`):
  1. Required fields present (`name`, `email`, `password`, `role`).
  2. If `role === 'patient'` then `patientId` is required.
  3. Email uniqueness checked with `User.findOne({ email })`.
  4. Patient ID uniqueness checked with `User.findOne({ patientId })`.
* Mongoose schema validation runs on `.save()`: email regex, role enum, etc.
  See [`07-database-schema.md`](07-database-schema.md).

---

## Flow B — Login

```
Browser                        Node API                  MongoDB
   │  POST /api/login             │                         │
   │  { email, password }         │                         │
   ├─────────────────────────────►│  findOne({ email })     │
   │                              ├────────────────────────►│
   │                              │◄────────────────────────┤
   │                              │  bcrypt.compare(...)    │
   │                              │  jwt.sign(payload, ...) │
   │  { token, user }             │                         │
   │◄─────────────────────────────┤                         │
   localStorage.token = token
   localStorage.role  = user.role
   localStorage.userId = user._id
   navigate(role === 'patient' ? '/Patient' : '/Organization')
```

The JWT payload is `{ userId, role, name }` and lasts `JWT_EXPIRES_IN`
(default `1h`).

---

## Flow C — Upload + Predict + Save (the headline feature)

This is the only flow that touches **all three services**.

```
Browser                Node API (5001)              Flask ML (5002)              MongoDB
   │                       │                              │                          │
1. │ POST /api/upload      │                              │                          │
   │ multipart: image+id   │                              │                          │
   ├──────────────────────►│ multer writes:                                          │
   │                       │   backend/uploads/<rand>.jpg │                          │
   │                       │ User.findOne({patientId})    │                          │
   │                       ├──────────────────────────────┼─────────────────────────►│
   │                       │ patient.imageData.push({...})│                          │
   │                       │ patient.save()               │                          │
   │                       │◄─────────────────────────────┼──────────────────────────┤
   │ {filePath, imageId}   │                              │                          │
   │◄──────────────────────┤                              │                          │
   │                       │                              │                          │
2. │ POST /api/predict     │                              │                          │
   │ {imagePath:filePath}  │   (browser calls Flask DIRECTLY using                   │
   │                       │    REACT_APP_PREDICT_API_URL)│                          │
   ├──────────────────────────────────────────────────────►│ resolve_image_path()    │
   │                       │                              │ open + transform()      │
   │                       │                              │ model(tensor) → argmax  │
   │                       │                              │ class_names[idx]        │
   │ {prediction:"..."}    │                              │                          │
   │◄──────────────────────────────────────────────────────┤                          │
   │                       │                              │                          │
3. │ PUT /.../predict      │                              │                          │
   │ {prediction}          │ updateOne(positional `$`)    │                          │
   ├──────────────────────►│─────────────────────────────────────────────────────────►│
   │                       │                                                         │ imageData[i].prediction = ...
   │                       │◄────────────────────────────────────────────────────────┤
   │ updated user JSON     │                                                         │
   │◄──────────────────────┤                                                         │
```

Why does the *browser* call the Python service directly instead of routing
through Node? Two reasons:

1. **Latency** — one fewer hop, no need to re-serialise the JSON twice.
2. **Decoupling** — the Node API never has to import a PyTorch SDK or know
   the model exists. If you swap PyTorch → TensorFlow, only `app.py` and
   `Models/` change.

The downside: the browser must know `REACT_APP_PREDICT_API_URL`, and that
service's CORS config must include the React origin. Both are handled in
this codebase.

---

## Flow D — Chat about an image

```
Browser                                Node API                       Mongo                         Gemini
   │ GET  /api/chat/:userId/:imageId/history  Authorization: Bearer X │                              │
   ├────────────────────────────────────────────►                     │                              │
   │                                              authenticateToken   │                              │
   │                                              User.findById        ├────────────────────────────►│
   │                                              ch = chatHistory.find(...)                         │
   │ { messages, imageName, initialPrediction }                       ├──────────────────────────────┤
   │◄──────────────────────────────────────────────                                                  │
   │                                                                                                  │
   │ POST /api/chat/:userId/:imageId/message                                                          │
   │ { prompt: "Is this serious?" }              user = findById                                      │
   ├────────────────────────────────────────────►                     │                              │
   │                                              build geminiHistory  │                              │
   │                                              startChat({history,                                 │
   │                                                  systemInstruction,                              │
   │                                                  safetySettings})                                │
   │                                              sendMessage(prompt) ─────────────────────────────► │
   │                                                                                                  │  generates reply
   │                                                                  │◄────────────────────────────┤
   │                                              push user+model msgs                                │
   │                                              user.save()         ├──────────────────────────────►│
   │ { reply, fullHistory }                                                                          │
   │◄──────────────────────────────────────────────                                                  │
```

Important behaviours:

* **First-turn priming** — when the chat session is fresh, the user's prompt
  is prepended with `"Regarding the medical image named '<X>' with an initial
  prediction of '<Y>': <prompt>"` so Gemini has medical context even before
  any model turn exists.
* **Replay history** — every prior turn is replayed via `model.startChat({
  history })` so context survives across requests without us having to keep
  Gemini-side state.
* **Auth** — `authenticateToken` ensures only the patient (or an admin) can
  read/write that user's chat. (The history endpoint allows admins; the
  message endpoint restricts to the user themselves.)

---

## Flow E — Delete an image

```
Browser                  Node API               Mongo                FS
   │ DELETE /api/patients/:userId/images/:imageId
   ├──────────────────►│
   │                   │  findOne({ _id, role:'patient', "imageData._id": imageId },
   │                   │           { 'imageData.$': 1 })
   │                   ├──────────────────────►│
   │                   │◄──────────────────────┤
   │                   │  imagePathToDelete = imageToDelete.imagePath
   │                   │  updateOne($pull imageData by _id)
   │                   ├──────────────────────►│
   │                   │◄──────────────────────┤
   │                   │  fs.unlink(fullPath)  ────────────────────────►│
   │                   │◄──────────────────────────────────────────────┤
   │ { message: "Image deleted successfully" }
   │◄──────────────────┤
```

The DB record is removed first; the file unlink failure path *logs* but
returns success so the user-facing state stays consistent.

Continue to [`07-database-schema.md`](07-database-schema.md) for the schema
details.
