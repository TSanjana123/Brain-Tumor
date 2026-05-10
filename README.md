# Brain-Tumor — AI-Assisted MRI Triage Platform

A full-stack web application that lets clinical staff upload MRI brain scans,
runs them through a fine-tuned **DenseNet201** classifier (40 tumor sub-types
across T1 / T1C+ / T2 sequences plus _Normal_), stores the results per
patient in MongoDB, and exposes a **Gemini-powered chat assistant** that lets
the patient or doctor discuss the scan in natural language.

```
┌──────────────────────┐    HTTP/JSON     ┌────────────────────────┐    HTTP/JSON     ┌──────────────────────┐
│  React 19 frontend   │ ───────────────► │  Node.js / Express API │ ───────────────► │  Flask ML service    │
│  (CRA, port 3000)    │ ◄─────────────── │  (port 5001)           │ ◄─────────────── │  PyTorch DenseNet201 │
└──────────────────────┘                  │  • Auth (JWT, bcrypt)  │                  │  (port 5002)         │
                                          │  • File uploads        │                  └──────────────────────┘
                                          │  • Mongo (Mongoose)    │
                                          │  • Gemini chat         │
                                          └────────────────────────┘
                                                      │
                                                      ▼
                                          ┌────────────────────────┐
                                          │   MongoDB Atlas        │
                                          │   users + imageData    │
                                          │   + chatHistory        │
                                          └────────────────────────┘
```

---

## Quick start (macOS / Linux)

```bash
# 1. Backend (Node) — auth, uploads, chat
cd backend
cp .env.example .env          # then fill in MONGODB_URI, JWT_SECRET, GEMINI_API_KEY
npm install
node server.js                # http://localhost:5001

# 2. ML service (Python / Flask) — DenseNet201 inference
cd backend
pip install -r requirements.txt
python3 app.py                # http://localhost:5002

# 3. Frontend
cd frontend
cp .env.example .env
npm install
npm start                     # http://localhost:3000
```

> The **DenseNet201 weights** must exist at `Models/densenet_201_brain_tumor.pth`
> (~74 MB). You can override the path with the `MODEL_PATH` env var.

---

## Documentation

Every concept used in this repo is explained in detail under [`docs/`](docs/):

| Doc | What's inside |
| --- | --- |
| [`docs/01-architecture.md`](docs/01-architecture.md) | High-level system diagram, request lifecycle, why three services |
| [`docs/02-ml-model.md`](docs/02-ml-model.md) | DenseNet201, transfer learning, the 40 classes, preprocessing math |
| [`docs/03-flask-service.md`](docs/03-flask-service.md) | Line-by-line walkthrough of `backend/app.py` |
| [`docs/04-node-backend.md`](docs/04-node-backend.md) | Express routes, Mongoose schema, JWT, multer, Gemini integration |
| [`docs/05-react-frontend.md`](docs/05-react-frontend.md) | Component map, routing, state, role-based dashboards |
| [`docs/06-data-flow.md`](docs/06-data-flow.md) | End-to-end request walkthroughs (signup, upload, predict, chat) |
| [`docs/07-database-schema.md`](docs/07-database-schema.md) | User collection, embedded sub-documents, indexes |
| [`docs/08-setup-and-run.md`](docs/08-setup-and-run.md) | Installation on macOS / Linux / Windows + dev workflow |
| [`docs/09-troubleshooting.md`](docs/09-troubleshooting.md) | Common errors and how to fix them |
| [`docs/10-glossary.md`](docs/10-glossary.md) | Plain-English glossary of every acronym and concept |

If you only have time to read one file, start with
[`docs/01-architecture.md`](docs/01-architecture.md).

---

## Repository layout

```
Brain-Tumor/
├── backend/                  Node API (server.js) + Flask ML service (app.py)
│   ├── server.js             Express server: auth, patients, uploads, chat
│   ├── app.py                Flask micro-service: DenseNet201 inference
│   ├── models/User.js        Mongoose schema (User + imageData + chatHistory)
│   ├── uploads/              Stored MRI images (gitignored)
│   ├── package.json          Node deps
│   ├── requirements.txt      Python deps
│   └── .env.example          Template for backend env vars
├── frontend/                 React 19 app (Create React App)
│   ├── src/
│   │   ├── App.js            Router + page registration
│   │   ├── Navbar/           Top navigation
│   │   ├── Home/             Landing page (carousel + info cards)
│   │   ├── About/            Static info page
│   │   ├── Login/            JWT login + bar chart
│   │   ├── Signup/           Role-based registration
│   │   ├── Patient/          (in Predict/Patient.js) Patient dashboard
│   │   ├── Organization/     (in Predict/Organization.js) Clinic dashboard
│   │   ├── Admin/            Admin tools
│   │   └── Predict/ChatModal Gemini chat overlay
│   └── .env.example          Template for frontend env vars
├── Models/
│   └── densenet_201_brain_tumor.pth   DenseNet201 weights (74 MB)
├── Test_images/              Sample MRI images grouped by class
├── docs/                     Full project documentation (see table above)
└── test.ipynb                Notebook used during model development
```

---

## License & attribution

Educational / research use. The model is trained on a publicly distributed
brain-tumor MRI dataset; not for clinical use.
