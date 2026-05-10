# 03 · The Flask ML service (`backend/app.py`)

The Flask service is the thinnest possible HTTP wrapper around the model.
It boots once, loads the weights, and responds to a single useful endpoint.

---

## 1. Endpoints

| Method | Path | Body | Returns |
| ------ | ---- | ---- | ------- |
| `GET`  | `/api/health` | — | `{ status: "ok", device: "cpu"|"cuda", classes: 40 }` |
| `POST` | `/api/predict` | `{ "imagePath": "uploads/<file>" }` | `{ "prediction": "Glioblastoma T1" }` (or `{ "error": "..." }` with HTTP 4xx/5xx) |

**Why JSON and not multipart?** The Node backend has *already* saved the
upload to disk — there's no need to re-send the bytes. We send a relative
path string, the Python service resolves it locally, opens the file from disk,
and predicts. This keeps the inter-service payload tiny.

---

## 2. Path resolution (the cross-platform fix)

Multer (in `server.js`) stores `imagePath` as `uploads/<random>-<original>.jpg`
with **forward slashes**. The Python service must turn that relative path into
an **absolute path that exists on disk**, regardless of which directory you
launched it from.

`resolve_image_path` tries four candidates in order:

```python
candidates = [
    os.path.join(BASE_DIR, rel),                       # backend/uploads/<file>
    os.path.join(PROJECT_DIR, rel),                    # repo-root/uploads/<file>
    os.path.join(UPLOAD_DIR, os.path.basename(rel)),   # backend/uploads/<basename>
    os.path.abspath(rel),                              # cwd-relative
]
```

Where:

* `BASE_DIR = os.path.dirname(os.path.abspath(__file__))` → always
  `.../Brain-Tumor/backend`, no matter what `cwd` you launched from.
* `PROJECT_DIR = os.path.dirname(BASE_DIR)` → `.../Brain-Tumor`.
* `UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")`.

This is the fix for the bug that existed in the original code, which used a
hardcoded Windows-style string `"Brain-Tumor\\Models\\..."` and only worked on
one author's laptop.

---

## 3. Boot sequence (top-to-bottom of `app.py`)

```python
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
```
1. Pick a device. On a Mac without CUDA this is `cpu`. (You could also support
   Apple Silicon GPUs with `mps` — see the troubleshooting doc.)

```python
class_names = [...]              # 40 labels
model = models.densenet201(weights=None)
model.classifier = nn.Linear(model.classifier.in_features, 40)
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model = model.to(device).eval()
```
2. Build the architecture, swap the classifier head, load the checkpoint, move
   it to the chosen device, and put it in eval mode. This happens **once** at
   import-time, so every subsequent request can reuse the loaded model.

```python
_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=_IMAGENET_MEAN, std=_IMAGENET_STD),
])
```
3. Build the preprocessing pipeline once, reuse for every request.

```python
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": os.environ.get("FRONTEND_URL", "http://localhost:3000")}})
```
4. Create the Flask app and enable CORS for the React origin. CORS is
   technically only needed if the *browser* calls `/api/predict` directly; the
   Node backend → Flask call is server-to-server and bypasses CORS. We enable
   it anyway because the React UI does call this service directly during
   development (see `Organization.js` → `PREDICT_API_URL`).

```python
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5002))
    app.run(host='0.0.0.0', port=port, debug=False)
```
5. Bind to `0.0.0.0` so other containers / the LAN can reach it. Disable
   `debug=True` in production — when debug is on, Flask reloads the file on
   change, which would re-run the (slow) model load on every save.

---

## 4. Why we don't use Flask's dev server in production

`app.run(...)` uses Werkzeug's single-threaded dev server. For a *real*
deployment, run behind a WSGI server such as **gunicorn**:

```bash
pip install gunicorn
gunicorn --workers 1 --threads 4 --bind 0.0.0.0:5002 app:app
```

> Use `--workers 1`. PyTorch models are not safe to share across processes,
> and each worker would copy the 74 MB model into its own RAM. Use threads
> for concurrency instead.

---

## 5. Tracing one request

A single `POST /api/predict { imagePath: "uploads/abc.jpg" }` causes:

1. `handle_prediction()` extracts `imagePath` from the JSON body.
2. `resolve_image_path()` locates the file on disk (returns absolute path or
   `None`).
3. `predict()` calls `preprocess_image()` to get a `(1, 3, 224, 224)` tensor.
4. The model is invoked under `torch.no_grad()` → 40-d logits.
5. `argmax` → integer; index into `class_names` → label string.
6. Flask serialises `{"prediction": label}` and returns 200.

Latency on a modern CPU: ~150–400 ms per request after warm-up. On a CUDA
GPU: ~5–20 ms.

---

## 6. Things you can extend safely

* **Return confidence** — softmax the logits before argmax (see
  [`02-ml-model.md`](02-ml-model.md) §5).
* **Return top-3** — replace `torch.max` with `torch.topk(outputs, k=3)`.
* **Add a `GET /api/classes` endpoint** that returns `class_names` so the
  frontend can render dropdowns / legends without hardcoding.
* **Batch predictions** — accept `{ imagePaths: [...] }` and stack them into a
  single forward pass. Faster on GPU.

Continue to [`04-node-backend.md`](04-node-backend.md) for the Node API.
