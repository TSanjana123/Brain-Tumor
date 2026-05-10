# 10 · Glossary — every concept in the project

Plain-English definitions for everything that shows up in this repo.

---

## ML / deep learning

* **CNN (Convolutional Neural Network)** — neural network whose layers
  perform local convolutions over an image. Excellent at picking up
  translation-invariant patterns (edges, textures, shapes).
* **DenseNet201** — a CNN architecture where every layer in a "dense block"
  receives the concatenation of all earlier layers' outputs. 201 refers to
  the depth (~201 layers). Pretrained on ImageNet, ~20 M parameters,
  `torchvision.models.densenet201`. See [`02-ml-model.md`](02-ml-model.md).
* **Transfer learning** — instead of training a model from scratch on your
  small dataset, start from weights learned on a giant general-purpose
  dataset (ImageNet) and *fine-tune* on yours. Drastically reduces the
  amount of data and compute needed.
* **Fine-tuning** — continuing to train a pretrained model with a low
  learning rate so it adapts to your task without "forgetting" the general
  features.
* **State-dict (`.pth`)** — a Python dictionary mapping layer names →
  tensors. PyTorch's standard way of saving/loading model weights, separate
  from the architecture definition.
* **Logits** — the raw, unnormalised scores a classifier outputs (one per
  class). `argmax` over logits = predicted class.
* **Softmax** — normalises logits into probabilities that sum to 1 and are
  in `[0, 1]`. Used when you want a confidence score, not just a label.
* **Argmax** — index of the largest value in a vector.
* **`torch.no_grad()`** — context manager that disables PyTorch's
  autograd graph tracking. Used during inference to save memory and time.
* **`model.eval()` vs `model.train()`** — toggles dropout / BatchNorm
  behaviour. `eval()` turns dropout off and freezes BN running stats; you
  must call it before inference.
* **ImageNet normalisation** — subtracting `mean=[0.485,0.456,0.406]` and
  dividing by `std=[0.229,0.224,0.225]` per channel. Required for any
  ImageNet-pretrained backbone (DenseNet201 included).
* **Resize 224×224** — DenseNet201's expected input shape. Different sizes
  break the global average pool and final classifier shape.
* **Class** — one of the 40 labels the model can output, e.g. `"Glioblastoma T1"`.

## MRI

* **MRI (Magnetic Resonance Imaging)** — non-ionising imaging modality
  using strong magnetic fields and radio-frequency pulses. Each *sequence*
  highlights different tissue contrasts.
* **T1 / T1C+ / T2** — three MRI weighting sequences:
  * **T1** — fat is bright, fluid is dark. Good anatomical detail.
  * **T1C+** — T1 *with contrast agent* (gadolinium); enhancing lesions
    light up. The `+` denotes contrast.
  * **T2** — fluid is bright; useful for spotting edema and many tumor
    types.
* **Tumor types in this dataset** — Astrocitoma, Carcinoma, Ependimoma,
  Ganglioglioma, Germinoma, Glioblastoma, Granuloma, Meduloblastoma,
  Meningioma, Neurocitoma, Oligodendroglioma, Papiloma, Schwannoma,
  Tuberculoma, plus `_NORMAL` (no tumor).

## Backend / web

* **Express** — minimal Node.js web framework. We use it for routing and
  middleware composition.
* **Mongoose** — ODM (object-document mapper) for MongoDB. Schemas, types,
  validation, indexes, virtuals, sub-documents — all the niceties.
* **Sub-document** — an embedded document inside an array on a parent
  document. `imageData[]` and `chatHistory[]` are arrays of sub-documents
  on the `User` document.
* **Positional `$` operator** — MongoDB syntax for "the first element that
  matched the query in this array". Used by
  `{ "imageData.$.prediction": ... }` to update one element by `_id`.
* **Partial index** — an index that only includes documents matching a
  filter expression. We use one to make `patientId` unique *only among
  patient-role users*.
* **JWT (JSON Web Token)** — a compact signed token of the form
  `header.payload.signature`. Server signs it; client returns it on every
  request to prove identity. We store ours in `localStorage` for
  simplicity (cookies would be safer).
* **bcrypt** — adaptive password-hashing function. Cost-tunable so you can
  make it slower as hardware speeds up. Cost factor 10 ≈ 80 ms / hash.
* **CORS (Cross-Origin Resource Sharing)** — browser security mechanism
  that prevents a page on origin A from calling an API on origin B unless
  B explicitly opts in. The `cors` middleware (Node) and `flask-cors` set
  the right `Access-Control-Allow-Origin` headers.
* **Multer** — Express middleware that parses `multipart/form-data` and
  saves uploaded files. Our config writes them to `backend/uploads/`.
* **dotenv** — loads `KEY=VALUE` lines from `.env` into `process.env`.
* **MongoDB Atlas** — MongoDB's hosted cloud offering. Free tier supports
  ~512 MB storage and is enough for development.

## Frontend

* **CRA (Create React App)** — the bootstrapper used to scaffold this
  frontend. `react-scripts` provides `npm start` (Webpack dev server) and
  `npm run build`.
* **React Router** — declarative routing for React. We use the v7
  `BrowserRouter` + `Routes` + `Route` API.
* **localStorage** — synchronous, origin-scoped key/value store in the
  browser. Persists across reloads and tabs.
* **`useEffect` / `useState` / `useCallback` / `useRef`** — React hooks for
  side-effects, local state, memoised callbacks, and DOM references
  respectively.
* **axios** — HTTP client. We use it everywhere instead of `fetch` for its
  better defaults (auto-JSON, response error normalisation).
* **Bootstrap 5** — CSS framework. Provides the `.navbar`, `.card`, grid
  classes (`.d-flex`, `.w-50`, `.mb-3`, …) used across the UI.
* **Chart.js / react-chartjs-2** — chart library; we render a Bar chart on
  the Login page and a Pie chart on the Signup page.

## Google Gemini

* **Gemini** — Google's family of large language models, available via the
  Google Generative AI SDK.
* **`gemini-2.0-flash-exp`** — the fast/cheap variant we use for the chat
  assistant. Suitable for short conversational replies.
* **System instruction** — a per-conversation prompt that frames the
  assistant's role. Ours instructs Gemini to act as a non-diagnostic
  medical assistant that defers to doctors.
* **`safetySettings`** — per-conversation thresholds that block model
  output when harassment / hate / sexual / dangerous content is detected.
  We block at `BLOCK_MEDIUM_AND_ABOVE`.
* **`history` parameter** — Gemini SDK's way to replay prior turns so the
  model has context across requests without us hosting any chat state on
  Gemini's side.

## Project-specific names

* **`Models/`** — folder holding the DenseNet201 weights file.
* **`backend/uploads/`** — runtime folder where multer writes images.
  Gitignored.
* **`Test_images/`** — sample MRI images grouped by class, useful as
  fixtures.
* **`test.ipynb`** — Jupyter notebook used during model development;
  inspects/installs deps and the like.
