# 08 · Setup & local development

This page is the **definitive setup guide**. Follow it top-to-bottom.

---

## 1. Prerequisites

| Tool | Version | Why |
| ---- | ------- | --- |
| **Node.js** | ≥ 18 (tested on v25) | Runs `server.js` and the React dev server. |
| **npm** | ≥ 9 | Bundled with Node. |
| **Python** | 3.10 – 3.12 recommended | Runs `app.py`. PyTorch wheels for very new Python versions can lag — pin a known-good version if `pip install torch` fails. |
| **MongoDB** | Atlas free-tier *or* local 6+ | Stores the `users` collection. |
| **Google Gemini API key** | Free tier OK | Optional — only needed for chat. |
| **Disk** | ~500 MB | Mostly `node_modules` + the 74 MB model weights. |

---

## 2. One-time clone & directory walk

```bash
git clone <your-fork-url> Brain-Tumor
cd Brain-Tumor
ls
# backend/   frontend/   Models/   Test_images/   docs/   README.md   ...
```

The model weights file `Models/densenet_201_brain_tumor.pth` (74 MB) must be
present. If it isn't, ask the project owner — it is not committed in
gitignored mode.

---

## 3. Configure environment variables

### Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/brain_tumor
FRONTEND_URL=http://localhost:3000
JWT_SECRET=<generate-a-long-random-string>
JWT_EXPIRES_IN=1h
GEMINI_API_KEY=<your-google-gemini-api-key>     # optional
PORT=5001
```

> **Generate a JWT secret:** `openssl rand -hex 48`

### Frontend

```bash
cd ../frontend
cp .env.example .env
```

The defaults already point at `localhost:5001` (Node) and `localhost:5002`
(Flask), which is what we want for local dev.

---

## 4. Install dependencies

### Backend (Node)

```bash
cd backend
npm install
```

### ML service (Python)

Use a virtualenv so you don't pollute your system Python:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

> If `pip install torch` fails due to wheel availability for your Python
> version, install it directly from the PyTorch site:
> <https://pytorch.org/get-started/locally/>

### Frontend

```bash
cd ../frontend
npm install
```

---

## 5. Run the three services

Open three terminals.

### Terminal 1 — Node API

```bash
cd backend
node server.js
# expected:
# MongoDB connected successfully
# Server running on port 5001
```

### Terminal 2 — Flask ML service

```bash
cd backend
source .venv/bin/activate            # Windows: .venv\Scripts\activate
python app.py
# expected:
# Using device: cpu
# Model loaded successfully from .../Models/densenet_201_brain_tumor.pth
#  * Running on all addresses (0.0.0.0)
#  * Running on http://localhost:5002
```

### Terminal 3 — React dev server

```bash
cd frontend
npm start
# Compiled successfully!
# Local:            http://localhost:3000
```

Open <http://localhost:3000> in a browser.

---

## 6. Smoke-test the full stack

1. Click **Signup** in the navbar.
2. Create an `Organization` user (role: medicalStaff).
3. Log in. You should be redirected to `/Organization`.
4. Click "+ Add patient", fill in details, save.
5. Select that patient → upload one of the JPGs from
   `Test_images/Meningioma T1/`.
6. Click "Predict". The Flask service is invoked; expect a string like
   `Meningioma T1` to appear next to the image.
7. Log out, sign up again as a `Patient` (using the same `patientId`),
   log in, open the image, click "Chat" → ask "What does this prediction
   mean?" Gemini replies.

If any step fails, see [`09-troubleshooting.md`](09-troubleshooting.md).

---

## 7. Production tweaks (when you go beyond `localhost`)

* Replace `app.run()` with **gunicorn** — see [`03-flask-service.md`](03-flask-service.md) §4.
* Run the Node API behind **PM2** or a containerised process supervisor.
* Build the React app with `npm run build` and serve `frontend/build/` from
  Nginx; point Nginx at the Node API at `/api/*` and the Flask service at
  `/predict/*`.
* **Rotate `JWT_SECRET` / `MONGODB_URI` / `GEMINI_API_KEY`** before going
  public — the `.env` files in this repo's history may have contained real
  secrets at some point.
* Add `helmet`, rate limiting (`express-rate-limit`), and CSRF protection in
  `server.js`.

Continue to [`09-troubleshooting.md`](09-troubleshooting.md) for known
pitfalls.
