# 09 · Troubleshooting & known pitfalls

If a service won't start or behaves wrong, check this list first.

---

## Boot-time failures

### ❌ `FATAL ERROR: MONGODB_URI environment variable is not set.`
* **Cause:** `backend/.env` is missing or `dotenv` is reading the wrong file.
* **Fix:** `cp backend/.env.example backend/.env` and fill in your URI.
* **Verify:** `node -e "require('dotenv').config({path:'backend/.env'}); console.log(process.env.MONGODB_URI)"`

### ❌ `FATAL ERROR: JWT_SECRET environment variable is not set.`
* **Cause:** Same as above — a missing or empty `JWT_SECRET`.
* **Fix:** add `JWT_SECRET=<long random string>` to `backend/.env`.

### ❌ Node logs: `GEMINI_API_KEY environment variable is not set. Chat functionality will be disabled.`
* **Cause:** No Gemini key set. The server still starts; only `/api/chat/*`
  returns 503.
* **Fix:** set `GEMINI_API_KEY` in `backend/.env` if you want chat. Otherwise
  ignore.

### ❌ `MongoDB connection error: ... bad auth ...`
* **Cause:** wrong username/password or your IP isn't on the Atlas allowlist.
* **Fix:** in Atlas → Network Access → add your current IP (or `0.0.0.0/0`
  for dev), then reconnect.

### ❌ Flask logs: `ERROR: Model file not found at .../densenet_201_brain_tumor.pth.`
* **Cause:** weights file missing.
* **Fix:** put the `.pth` at `Models/densenet_201_brain_tumor.pth`, or set
  `MODEL_PATH=/abs/path/to/file.pth` in the environment that runs `app.py`.

### ❌ Flask logs `Address already in use` on port 5002 / Node logs same on 5001
* **Cause:** another process is bound to the port.
* **Fix:** `lsof -ti:5002 | xargs kill -9` (or change the port via `PORT=`).

### ❌ `pip install torch` fails with "no matching distribution"
* **Cause:** PyTorch hasn't shipped wheels for your Python version yet
  (common on Python 3.13/3.14 right after release).
* **Fix:** install Python 3.10–3.12, recreate the venv, or follow the
  per-platform install command at <https://pytorch.org/get-started/locally/>.

---

## Runtime errors

### ❌ Browser console: `Network Error` when calling `/api/predict`
* **Cause #1:** Flask service isn't running. Open
  <http://localhost:5002/api/health> directly to verify.
* **Cause #2:** `REACT_APP_PREDICT_API_URL` not set, so the URL is
  `http://undefined`. Check `frontend/.env` includes:
  ```env
  REACT_APP_PREDICT_API_URL=http://localhost:5002
  ```
  After editing, **stop and restart `npm start`** — CRA only reads `.env`
  at boot.
* **Cause #3:** CORS blocked. Make sure
  `FRONTEND_URL=http://localhost:3000` is set when launching `app.py`.

### ❌ `404 Image file not found on server at path: uploads/...` from Flask
* **Cause:** the file truly isn't where the path says. If you re-cloned the
  repo, the `backend/uploads/` directory was emptied by `.gitignore`.
* **Fix:** re-upload the image. Old DB rows referencing missing files cannot
  be predicted; use the Admin UI to delete them.

### ❌ Predictions look random / always the same class
* **Cause #1:** the `class_names` list in `app.py` is out of sync with the
  one used at training time. Order matters.
* **Cause #2:** preprocessing differs (e.g. forgot ImageNet normalisation,
  or fed greyscale without `convert("RGB")`).
* **Cause #3:** the wrong checkpoint was loaded. Compare
  `model.classifier.out_features` (40) with `len(class_names)` (must match).
* **Cause #4:** `model.eval()` was skipped — dropout/BN behave differently.

### ❌ `403 Forbidden: You cannot send messages for this user.` on chat
* **Cause:** the JWT's `userId` doesn't match the URL's `:userId`.
* **Fix:** log out, log in again, ensure `localStorage.userId` equals the
  Mongo `_id` of the patient document.

### ❌ Login succeeds but the dashboard says "no patients"
* **Cause:** the `/api/patients` endpoint returns *all* users with
  `role: 'patient'`. If your Atlas DB is fresh, there literally are none.
* **Fix:** sign up at least one Patient, or add one through the Organization
  dashboard.

### ❌ Image preview broken (`<img>` shows the broken-image icon)
* **Cause:** the path is relative (`uploads/abc.jpg`) but the React app is
  rendering it without prefixing the API base URL.
* **Fix:** ensure the `<img src>` is `${API_BASE_URL}/${image.imagePath}`,
  e.g. `http://localhost:5001/uploads/abc.jpg`. The static route is mounted
  at `/uploads` in `server.js`.

---

## Hardening checklist (prod-readiness)

These are *known gaps* you should close before exposing the app publicly.

* [ ] Apply `authenticateToken` to every `/api/patients/*`, `/api/upload`,
      `/api/predict` proxy, and `/api/admin/*` route — most are currently
      open and marked with `// TODO: Add authentication`.
* [ ] Validate `req.user.role` against the route (e.g. only `medicalStaff`
      / `admin` can read every patient).
* [ ] Replace `localStorage` JWT storage with **HTTP-only cookies** to
      mitigate XSS token theft.
* [ ] Rotate `JWT_SECRET`, `MONGODB_URI`, and `GEMINI_API_KEY` — the
      committed `.env` may have once contained real values.
* [ ] Add `helmet`, `express-rate-limit`, and request-size limits in
      `server.js`.
* [ ] Introduce a janitor job that deletes orphaned files in
      `backend/uploads/` not referenced by any user document.
* [ ] Run Flask under gunicorn (1 worker, multiple threads) instead of
      `app.run()` (see `03-flask-service.md` §4).
* [ ] Set up Atlas IP allow-listing (don't use `0.0.0.0/0` in production).

---

## Debug tips that actually help

* **Curl the Flask service directly** — bypass React + Node:
  ```bash
  curl -X POST http://localhost:5002/api/predict \
       -H "Content-Type: application/json" \
       -d '{"imagePath":"uploads/<your-file>.jpg"}'
  ```
* **Curl the Node API health** — hit any GET endpoint, e.g.:
  ```bash
  curl http://localhost:5001/api/patients
  ```
* **Inspect a JWT** — paste it at <https://jwt.io>. The payload must contain
  `userId`, `role`, `name`, plus `iat` and `exp`.
* **Mongo Atlas data view** — open the cluster's "Browse Collections" tab
  and inspect `users` after each step.
* **React DevTools → Components** — confirm `localStorage` keys are set
  by inspecting the component that reads them.

Continue to [`10-glossary.md`](10-glossary.md).
