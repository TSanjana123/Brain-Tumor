# 04 · Node.js / Express backend (`backend/server.js`)

The Node backend is the **system of record**. It owns users, files, and
chat sessions. Everything stateful lives here; the Flask service is
stateless and the React UI is just a view.

---

## 1. Stack and why each library is here

| Library | What it does | Why we need it |
| ------- | ------------ | -------------- |
| `express` | HTTP server / routing | Standard Node web framework |
| `mongoose` | MongoDB ODM | Schemas, validation, partial indexes, sub-documents |
| `bcryptjs` | Password hashing | Never store plaintext passwords. Cost factor 10. |
| `jsonwebtoken` | JWT issuing/verifying | Stateless auth. Server doesn't keep sessions. |
| `cors` | CORS middleware | Lets the React origin (`http://localhost:3000`) call the API |
| `multer` | `multipart/form-data` parser | File uploads via a simple disk storage strategy |
| `@google/generative-ai` | Google Gemini SDK | Powers the per-image chat assistant |
| `dotenv` | Load `.env` into `process.env` | Keeps secrets out of code |
| `path`, `fs` | Node built-ins | Compute upload directory, delete files |

---

## 2. Boot sequence

```js
dotenv.config({ path: path.resolve(__dirname, '.env') });
```
Loads `backend/.env` into `process.env`. Everything from `MONGODB_URI` to
`GEMINI_API_KEY` is read from there.

```js
if (!geminiApiKey) console.warn(...);  // non-fatal
if (!mongoUri)     process.exit(1);    // fatal
if (!jwtSecret)    process.exit(1);    // fatal
```
**Fail fast** when the most critical secrets are missing. Gemini is treated
as optional (chat is degraded if missing) but Mongo and JWT are mandatory.

```js
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
```
Enable CORS only for the configured frontend origin and parse JSON bodies.

```js
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));
```
Create `backend/uploads/` if missing and expose it as a static route. After
this, an image saved as `uploads/abc.jpg` is reachable at
`http://localhost:5001/uploads/abc.jpg` — exactly what `<img src=...>` needs.

---

## 3. Multer (file upload) configuration

```js
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename:    (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
```

Notes:

* `Date.now() + '-' + random` makes name collisions effectively impossible
  even under high write concurrency.
* Spaces in the original filename are converted to `_` so the URL path is
  safe.
* 10 MB hard limit — typical MRI JPGs are well under this.

---

## 4. Authentication

### Signup — `POST /api/signup`

```js
const hashedPassword = await bcrypt.hash(password, 10);
const newUser = new User({ ..., password: hashedPassword, role: ..., patientId: ... });
await newUser.save();
```

* The salt-rounds value `10` is the bcrypt sweet spot for hashing latency
  (~80 ms).
* `patientId` is required only when `role === 'patient'`. The Mongoose schema
  enforces this at the document level; the route enforces it again before
  even reaching Mongo to give a friendlier error message.

### Login — `POST /api/login`

```js
const isMatch = await bcrypt.compare(password, user.password);
const token = jwt.sign({ userId: user._id, role: user.role, name: user.name },
                       jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
```

The token's payload (`userId`, `role`, `name`) is what `authenticateToken`
exposes as `req.user` on protected endpoints. The response also returns the
plaintext `user` object (without `password`) so the React app can render
"Welcome, &lt;name&gt;" without a second round-trip.

### Authentication middleware

```js
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
```

Simple, stateless: any request with a valid signed JWT passes.

> **Hardening note:** Many CRUD routes in this codebase deliberately don't
> apply `authenticateToken` yet (marked with `// TODO: Add authentication`).
> Adding it is a good first contribution — see `09-troubleshooting.md`.

---

## 5. Image lifecycle endpoints

| Verb | Path | What it does |
| ---- | ---- | ------------ |
| `POST`   | `/api/upload` | Save the file via multer, find the patient by `patientId`, push a new entry into their `imageData[]`, return `{ filePath, imageId }`. |
| `PUT`    | `/api/patients/:patientId/images/:imageId/predict` | Persist the prediction string returned by the Flask service. Uses the positional `$` operator: `{ "imageData.$.prediction": prediction }`. |
| `PUT`    | `/api/patients/:userId/images/:imageId/path` | Replace the stored relative path of an image (used when re-uploading a corrected scan). |
| `DELETE` | `/api/patients/:userId/images/:imageId` | Remove the sub-document with `$pull` *and* delete the file from disk via `fs.unlink`. |

### The MongoDB positional operator

```js
await User.updateOne(
  { patientId, role: 'patient', "imageData._id": new mongoose.Types.ObjectId(imageId) },
  { $set: { "imageData.$.prediction": prediction } }
);
```

The `$` placeholder refers to the *index of the matched element* in the
`imageData` array. Without it, `$set` would have to address the element by
its array index (which we don't know server-side). Read more in the
[MongoDB docs on the `$` positional operator](https://www.mongodb.com/docs/manual/reference/operator/update/positional/).

### Atomic delete of file + record

```js
const updateResult = await User.updateOne({ _id: userId }, { $pull: { imageData: { _id: imageId } } });
fs.unlink(fullPath, (err) => { /* log */ });
```

We delete the DB record first; if the file unlink fails we log it but still
return success — the user's view of the data has changed, and the orphaned
file can be reaped by a janitor job.

---

## 6. Chat with Gemini

### `GET /api/chat/:userId/:imageId/history` (auth required)

* Looks up `user.chatHistory.find(ch => ch.imageId.equals(imageId))`.
* If a session exists → return it (`{ messages, imagePath, ..., lastUpdated }`).
* If not → return an empty `messages: []` plus `imageName` and
  `initialPrediction` so the UI can show context.

### `POST /api/chat/:userId/:imageId/message` (auth required)

```js
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: "You are a helpful medical assistant AI. ...",
});
const geminiChat = model.startChat({ history: geminiChatHistory, generationConfig, safetySettings });
const result = await geminiChat.sendMessage(promptForGemini);
```

Key choices:

* **`gemini-2.0-flash-exp`** — fast, cheap, non-thinking. Suitable for
  conversational UX.
* **`systemInstruction`** — frames the model as a non-diagnostic medical
  assistant. The instruction repeats "I am not a doctor" so the model defers
  to clinicians.
* **`safetySettings`** — block harassment, hate, sexual, and dangerous
  content at `BLOCK_MEDIUM_AND_ABOVE`. Medical chat needs guardrails.
* **History injection** — past messages are converted to Gemini's expected
  format `{ role: 'user'|'model', parts: [{ text }] }` and replayed before
  the new prompt. This is what makes the chat *stateful* per image.
* **Context priming on first turn** — if `chatSession` is brand-new, we
  prepend `Regarding the medical image named "<name>" with an initial
  prediction of "<pred>": <user prompt>` so the model has the medical context
  even before any assistant turn.
* **Persistence** — both the user message and Gemini's reply are saved into
  `user.chatHistory[i].messages` after a successful response.

---

## 7. Graceful shutdown

```js
const gracefulShutdown = async (signal) => {
  await mongoose.connection.close(false);
  process.exit(0);
};
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
```

Closing the Mongo connection on Ctrl+C or container stop avoids dangling
sockets and lets Mongo Atlas free the connection slot promptly.

Continue to [`05-react-frontend.md`](05-react-frontend.md) for the React app.
