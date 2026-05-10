"""
Flask micro-service that serves brain-tumor predictions from a fine-tuned
DenseNet201. The Node.js backend (server.js) calls /api/predict with the
relative path of an uploaded MRI image; this service runs the image through
the model and returns the predicted class name.

Run:
    python app.py     # listens on 0.0.0.0:5002
"""

import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Path configuration (cross-platform) ----------------------------------
# BASE_DIR    -> .../Brain-Tumor/backend          (folder this file lives in)
# PROJECT_DIR -> .../Brain-Tumor                  (one level up; sibling of Models/)
# UPLOAD_DIR  -> .../Brain-Tumor/backend/uploads  (where multer stores images)
# MODEL_PATH  -> .../Brain-Tumor/Models/densenet_201_brain_tumor.pth
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(BASE_DIR)
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
MODEL_PATH = os.environ.get(
    "MODEL_PATH",
    os.path.join(PROJECT_DIR, "Models", "densenet_201_brain_tumor.pth"),
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# --- Model definition & loading -------------------------------------------
# Order matters: the index returned by the model maps positionally into this list.
class_names = [
    'Astrocitoma T1', 'Astrocitoma T1C+', 'Carcinoma T1', 'Carcinoma T1C+',
    'Carcinoma T2', 'Ependimoma T1', 'Ependimoma T1C+', 'Ependimoma T2',
    'Ganglioglioma T1', 'Ganglioglioma T1C+', 'Ganglioglioma T2', 'Germinoma T1',
    'Germinoma T1C+', 'Germinoma T2', 'Glioblastoma T1', 'Glioblastoma T1C+',
    'Glioblastoma T2', 'Granuloma T1', 'Granuloma T1C+', 'Meduloblastoma T1',
    'Meduloblastoma T2', 'Meningioma T1', 'Meningioma T1C+', 'Neurocitoma T1',
    'Neurocitoma T1C+', 'Neurocitoma T2', 'Oligodendroglioma T1',
    'Oligodendroglioma T1C+', 'Oligodendroglioma T2', 'Papiloma T1',
    'Papiloma T1C+', 'Papiloma T2', 'Schwannoma T1', 'Schwannoma T1C+',
    'Schwannoma T2', 'Tuberculoma T1', 'Tuberculoma T1C+', 'Tuberculoma T2',
    '_NORMAL T1', '_NORMAL T2'
]

# Build the same architecture used at training time (DenseNet201 with the
# classifier head replaced to output len(class_names) logits), then load the
# saved state_dict on top of it.
model = models.densenet201(weights=None)
num_ftrs = model.classifier.in_features
model.classifier = nn.Linear(num_ftrs, len(class_names))

try:
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    print(f"Model loaded successfully from {MODEL_PATH}")
except FileNotFoundError:
    print(f"ERROR: Model file not found at {MODEL_PATH}.")
    print("Set the MODEL_PATH env var or place the .pth file at the default location.")
    raise
except Exception as e:
    print(f"Error loading model state_dict: {e}")
    raise

model = model.to(device)
model.eval()  # disable dropout/batchnorm-train behaviour for inference

# --- Image preprocessing --------------------------------------------------
# Mean/std are the standard ImageNet statistics; DenseNet201 was pretrained
# on ImageNet so inputs need to be normalised the same way.
_IMAGENET_MEAN = [0.485, 0.456, 0.406]
_IMAGENET_STD = [0.229, 0.224, 0.225]
_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=_IMAGENET_MEAN, std=_IMAGENET_STD),
])


def preprocess_image(image_path):
    try:
        image = Image.open(image_path)
        if image.mode != 'RGB':
            image = image.convert("RGB")
        return _transform(image).unsqueeze(0).to(device)  # add batch dim
    except FileNotFoundError:
        print(f"Error: Image file not found at {image_path}")
        return None
    except Exception as e:
        print(f"Error preprocessing image {image_path}: {e}")
        return None


def predict(image_path, model):
    image_tensor = preprocess_image(image_path)
    if image_tensor is None:
        return None

    with torch.no_grad():  # no gradients needed for inference -> faster, less memory
        outputs = model(image_tensor)
        _, predicted_index = torch.max(outputs, 1)

    idx = predicted_index.item()
    if 0 <= idx < len(class_names):
        return class_names[idx]
    print(f"Error: Predicted index {idx} is out of bounds for class_names.")
    return "Prediction Index Error"


# --- Path resolution ------------------------------------------------------
def resolve_image_path(relative_image_path):
    """
    The Node backend stores `imagePath` like "uploads/<filename>" with forward
    slashes. We search a small set of candidate locations so the service works
    whether it's launched from the repo root, the backend folder, or with a
    custom layout.
    """
    rel = relative_image_path.replace("\\", "/").lstrip("/")
    candidates = [
        os.path.join(BASE_DIR, rel),                       # backend/uploads/...
        os.path.join(PROJECT_DIR, rel),                    # repo-root/uploads/...
        os.path.join(UPLOAD_DIR, os.path.basename(rel)),   # backend/uploads/<basename>
        os.path.abspath(rel),                              # cwd-relative
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return None


# --- Flask app ------------------------------------------------------------
app = Flask(__name__)
# CORS is only needed for browsers; Node-to-Python requests don't need it,
# but we leave it open for the frontend to call /api/predict directly during
# development.
CORS(app, resources={r"/api/*": {"origins": os.environ.get("FRONTEND_URL", "http://localhost:3000")}})


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "device": str(device), "classes": len(class_names)})


@app.route('/api/predict', methods=['POST'])
def handle_prediction():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    relative_image_path = data.get('imagePath')
    if not relative_image_path:
        return jsonify({"error": "Missing 'imagePath' in request body"}), 400

    full_image_path = resolve_image_path(relative_image_path)
    if not full_image_path:
        print(f"Image file not found for: {relative_image_path}")
        return jsonify({"error": f"Image file not found on server at path: {relative_image_path}"}), 404

    print(f"Predicting for image: {full_image_path}")

    try:
        prediction_result = predict(full_image_path, model)
        if prediction_result:
            print(f"Prediction successful: {prediction_result}")
            return jsonify({"prediction": prediction_result})
        return jsonify({"error": "Prediction failed on server"}), 500
    except Exception as e:
        print(f"Exception during prediction for {full_image_path}: {e}")
        return jsonify({"error": f"Server error during prediction: {e}"}), 500


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5002))
    # debug=False so the model isn't reloaded on every code change in production
    app.run(host='0.0.0.0', port=port, debug=False)
