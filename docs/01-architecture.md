# 01 · Architecture overview

This project is a **three-tier, three-language application**. Each tier has a
narrow responsibility and talks to its neighbours over plain HTTP/JSON. Reading
this page will tell you *what each piece does* and *why it exists separately*.

---

## 1. The three services

| # | Tier | Language / Stack | Default port | Lives in | Responsibility |
| - | ---- | ---------------- | ------------ | -------- | -------------- |
| 1 | **Frontend** | React 19 (Create React App), Bootstrap 5, Chart.js, axios | 3000 | `frontend/` | Renders the UI in the browser. Handles user sessions via `localStorage` (JWT). |
| 2 | **Application API** | Node.js + Express, Mongoose (MongoDB), bcrypt, jsonwebtoken, multer, `@google/generative-ai` | 5001 | `backend/server.js` | Owns **everything except inference**: signup/login, patient records, file uploads, chat with Gemini, persistence. |
| 3 | **ML inference service** | Python 3 + Flask + PyTorch + torchvision + Pillow | 5002 | `backend/app.py` | A **single-purpose** service: given the path of an image, return the predicted class string. |

**Why split inference into its own service?**

* PyTorch and Node.js do not share a runtime — Node cannot load a `.pth`
  checkpoint. Embedding inference behind a tiny Flask wrapper is the cleanest
  Node↔PyTorch bridge.
* The ML service can be restarted, scaled, or replaced (e.g. by a TensorFlow
  Serving / Triton server) without touching the application API.
* Loading a 74 MB DenseNet201 takes a few seconds. Doing it once at process
  start (instead of once per request) is critical for latency.

---

## 2. Data stores

| Store | What lives here |
| ----- | --------------- |
| **MongoDB Atlas** (`MONGODB_URI`) | The `users` collection. Each user document embeds `imageData[]` (one entry per uploaded MRI) and `chatHistory[]` (one entry per per-image chat session). See [`07-database-schema.md`](07-database-schema.md). |
| **Local filesystem** (`backend/uploads/`) | The actual JPG/PNG bytes. Mongo stores only the relative path. Images are served back to the browser by Express's static middleware at `GET /uploads/<filename>`. |
| **DenseNet201 weights** (`Models/densenet_201_brain_tumor.pth`) | A 74 MB PyTorch state-dict loaded once when `app.py` boots. |

---

## 3. The end-to-end request lifecycle

A typical "upload → predict → chat" flow walks through *all* three services:

```
 User clicks "Upload"
        │
        │ multipart/form-data (image file + patientId)
        ▼
┌────────────────────┐     1. Save file to backend/uploads/
│  POST /api/upload  │────►2. Append { imagePath, imageName, ... } to user.imageData[]
│  (server.js)       │     3. Return { filePath, imageId }
└────────────────────┘
        │
        │ filePath = "uploads/<random>.jpg"
        ▼
 User clicks "Predict"
        │
        │ POST /api/predict { imagePath: "uploads/..." }   (sent by the React app)
        ▼
┌────────────────────┐     1. Resolve imagePath against backend/uploads/
│  POST /api/predict │────►2. Load image, resize 224×224, ImageNet-normalise
│  (app.py / Flask)  │     3. Forward through DenseNet201, argmax → class name
│                    │     4. Return { prediction: "Glioblastoma T1" }
└────────────────────┘
        │
        ▼
 React stores the prediction with:
        │ PUT /api/patients/:patientId/images/:imageId/predict { prediction }
        ▼
┌────────────────────┐
│ Mongo: imageData.$ │
│  .prediction = ... │
└────────────────────┘
        │
        ▼
 User opens chat for that image
        │ POST /api/chat/:userId/:imageId/message { prompt }
        ▼
┌────────────────────┐     1. Load chatHistory[imageId] (or create one)
│  Gemini chat       │────►2. Send history + new prompt to gemini-2.0-flash-exp
│  (server.js)       │     3. Save user+model messages to chatHistory[imageId]
│                    │     4. Return { reply, fullHistory }
└────────────────────┘
```

Walked through line-by-line in [`06-data-flow.md`](06-data-flow.md).

---

## 4. Authentication & authorisation

* **bcrypt** hashes passwords on signup (`bcrypt.hash(password, 10)`).
* **JWT** is issued on login, signed with `JWT_SECRET`, and contains
  `{ userId, role, name }`.
* The React app stores the token in `localStorage.token` and attaches it to
  protected requests as `Authorization: Bearer <token>`.
* **Roles**: `patient`, `medicalStaff`, `admin`. Role determines which
  dashboard the user is redirected to after login (see `Login.js`).
* The `authenticateToken` middleware in `server.js` verifies the JWT on every
  chat endpoint. (Other routes are deliberately left open in this codebase —
  flagged with `TODO: Add authentication` comments — and tightening them is a
  good first contribution.)

Detailed in [`04-node-backend.md`](04-node-backend.md).

---

## 5. Why these technology choices?

| Choice | Reason |
| ------ | ------ |
| **React + CRA** | Fastest path to a modern SPA. JSX + hooks suit a form-and-table-heavy clinical dashboard. |
| **Express + Mongoose** | Mature, simple Node stack. Mongoose schemas give us validation + indexes + sub-documents for free. |
| **MongoDB** | Each patient has a variable-size list of images and chat sessions; embedding them as sub-documents keeps reads to a single query. |
| **Flask + PyTorch** | Smallest possible Python web framework; loading a `torchvision.models.densenet201` and serving predictions is ~30 lines. |
| **DenseNet201** | High accuracy with relatively few parameters (~20 M), strong on small medical-imaging datasets thanks to feature reuse via dense connections. See [`02-ml-model.md`](02-ml-model.md). |
| **Google Gemini (`gemini-2.0-flash-exp`)** | Cheap, fast, multimodal-capable Google model. The system prompt frames it as a *medical assistant* that always defers to human doctors. |
| **JWT + localStorage** | Stateless auth: the Node server doesn't need session storage. (Trade-off: no automatic logout on token leak — for production-grade work, see "Hardening" in `09-troubleshooting.md`.) |

Continue to [`02-ml-model.md`](02-ml-model.md) to dig into the model.
