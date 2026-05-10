# 05 · React frontend (`frontend/src/`)

The frontend is a **Create React App (CRA)** project using **React 19**. It
is split into one folder per page/feature, each containing a `<Page>.js`
component and a co-located `<Page>.css` file.

---

## 1. Routing map (`src/App.js`)

```jsx
<Router>
  <Navbar />
  <Routes>
    <Route path="/"             element={<Home />} />
    <Route path="/Signup"       element={<Signup />} />
    <Route path="/Login"        element={<Login />} />
    <Route path="/Predict"      element={<Predict />} />
    <Route path="/Patient"      element={<Patient />} />
    <Route path="/Organization" element={<Organization />} />
    <Route path="/About"        element={<About />} />
    <Route path="/Test"         element={<Test />} />
    <Route path="/Admin"        element={<Admin />} />
  </Routes>
</Router>
```

After a successful login, `Login.js` redirects on role:

| Role           | Lands on            |
| -------------- | ------------------- |
| `patient`      | `/Patient`          |
| `medicalStaff` | `/Organization`     |
| `admin`        | `/admin-dashboard` (note: not the same as `/Admin`; tracked as a known mismatch) |
| anything else  | `/`                 |

---

## 2. Pages — what each one does

### `Navbar/Navbar.js`
Top bar rendered on every page. Shown links: Admin, About, Signup, Login.
Built with Bootstrap's `navbar-expand-lg` so it collapses to a hamburger on
mobile.

### `Home/Home.js`
Landing page. Auto-rotating hero image carousel (`useEffect` + `setInterval`,
3 s) and three info cards explaining the model, what brain tumors are, and
why early detection matters.

### `About/About.js`
Static marketing-style page. Four feature boxes (Accurate Detection, Instant
Results, Secure & Private, AI Chatbot Support).

### `Login/Login.js`
* Left half: a Chart.js bar chart of "Year vs Accuracy" (placeholder data).
* Right half: email + password form.
* On submit: `axios.post(`${REACT_APP_LOGIN_RESPONSE_URL}/api/login`, ...)`.
* On success: stores `token`, `role`, `name`, `email`, `userId`, optionally
  `patientId` or `organizationName` in `localStorage`, then navigates by
  role.

### `Signup/Signup.js`
Two-pane layout: a Chart.js pie chart on the left (sample class
distribution), the registration form on the right. Role selector toggles
between **Patient** (asks for `patientId`) and **Organization**
(`medicalStaff`, asks for `organizationName`). Submits to `/api/signup`.
*Most of the file is commented-out earlier iterations* — only the final
`const Signup = ...` near the bottom is live code.

### `Predict/Patient.js`
**Patient dashboard.** Loads the logged-in patient's record (by `userId`),
lists their uploaded MRIs and predictions, and renders the chat trigger for
each image. The `<ChatModal>` overlay (`Predict/ChatModal.js`) handles the
back-and-forth with `/api/chat/:userId/:imageId/...`.

### `Predict/Organization.js`
**Clinic / staff dashboard.** Most-used page in the app:
* Lists every patient (`GET /api/patients`).
* Lets staff search/filter patients.
* Lets staff add a new patient (`POST /api/signup` with `role: 'patient'`).
* Lets staff upload an MRI (`POST /api/upload`), trigger inference
  (`POST /api/predict` against the **Python** service), and persist the
  result (`PUT /api/patients/:patientId/images/:imageId/predict`).
* Renders MRI thumbnails directly from the static `/uploads/...` route.

The file is enormous (~5k lines) because it contains many earlier iterations
commented out. **The active component is the *last* `const Organization = ...`
declaration**; everything before it is preserved history.

### `Predict/UploadDetails.js`
Standalone helper component for uploading a `(patientId, image)` pair. Calls
`/api/patient-ids` and `/api/upload-details` (legacy endpoints; superseded by
the inline forms in `Organization.js`).

### `Predict/ChatModal.js`
Floating overlay shown when the user clicks "Chat" on an image. Pulls history
on open, posts a new message on submit, auto-scrolls to the bottom.

### `Admin/Admin.js`
Tabular admin tools — currently lists all patients and lets the admin update
or delete an image's path (`PUT /api/patients/:userId/images/:imageId/path`,
`DELETE /api/patients/:userId/images/:imageId`).

### `Test_random/Test.js`
Sandbox / scratchpad page used during development. Safe to ignore.

---

## 3. State strategy

* **No global store** (no Redux / Zustand / Context). Each page fetches what
  it needs in `useEffect`.
* **Session lives in `localStorage`** — `token`, `role`, `name`, `email`,
  `userId`, `patientId`, `organizationName`. Logging out clears all of it
  with `localStorage.clear()`.
* **Per-component state** uses `useState`. Lists of patients, loading
  flags, modals: all local.
* **Memoization** appears in `Organization.js` and `ChatModal.js` via
  `useCallback` so child components / `useEffect`s don't refetch on every
  render.

---

## 4. Environment variables

CRA injects any `REACT_APP_*` variable into `process.env` at build time. We
use a small zoo of aliases (one per legacy component) — they all currently
point at the same Node API. The two **important** ones are:

```env
REACT_APP_API_BASE_URL=http://localhost:5001     # Node backend (auth, patients, chat)
REACT_APP_PREDICT_API_URL=http://localhost:5002  # Flask ML service (inference)
```

The legacy aliases in `frontend/.env.example` keep older components compiling
without a refactor.

---

## 5. Why so many commented-out blocks?

`Signup.js`, `Organization.js`, `Patient.js`, and `Home.js` keep earlier
iterations as comments. This is the team's *git-history-in-the-file* style.
The single live component in each file is the **last** uncommented one. A
worthwhile follow-up cleanup would be `git rm`-ing the dead code now that
git history serves the same purpose.

---

## 6. Build & run

```bash
cd frontend
npm install
npm start         # dev server, http://localhost:3000, hot reload
npm run build     # production bundle in frontend/build/
npm test          # Jest + React Testing Library
```

Continue to [`06-data-flow.md`](06-data-flow.md) to see how all three
services collaborate on real flows.
