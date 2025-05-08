# pip install torch torchvision pillow flask flask-cors

import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms
from PIL import Image
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configuration ---
# !!! IMPORTANT: Update this path to the actual location of your model file !!!
MODEL_PATH = 'Models/densenet_201_brain_tumor.pth' 
# MODEL_PATH = 'Brain-Tumor\Models\densenet_201_brain_tumor.pth' 
# !!! IMPORTANT: Update this path to the base directory where images are stored !!!
# This should be the directory containing the 'uploads' folder (or similar)
# referred to by imagePath in your patient data.
IMAGE_BASE_PATH = '.' # Assume images are in a subdir relative to app.py

# Check for CUDA availability
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# --- Model Definition & Loading ---
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

# Load the model structure
model = models.densenet201(pretrained=False) # Set pretrained=False if loading custom weights
num_ftrs = model.classifier.in_features
model.classifier = nn.Linear(num_ftrs, len(class_names))

# Load the trained weights
try:
    # Load state dict, mapping location based on device availability
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    print(f"Model loaded successfully from {MODEL_PATH}")
except FileNotFoundError:
    print(f"ERROR: Model file not found at {MODEL_PATH}. Please check the MODEL_PATH variable.")
    exit() # Exit if model can't be loaded
except Exception as e:
    print(f"Error loading model state_dict: {e}")
    exit()

model = model.to(device)
model.eval() # Set model to evaluation mode

# --- Image Preprocessing ---
def preprocess_image(image_path):
    try:
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        image = Image.open(image_path)
        # Ensure image is RGB - crucial for models trained on ImageNet-style data
        if image.mode != 'RGB':
            image = image.convert("RGB") 
        image = transform(image).unsqueeze(0)  # Add batch dimension
        return image.to(device)
    except FileNotFoundError:
        print(f"Error: Image file not found at {image_path}")
        return None
    except Exception as e:
        print(f"Error preprocessing image {image_path}: {e}")
        return None

# --- Prediction Function ---
def predict(image_path, model):
    image_tensor = preprocess_image(image_path)
    if image_tensor is None:
        return None # Indicate preprocessing failure

    with torch.no_grad(): # Disable gradient calculations for inference
        outputs = model(image_tensor)
        _, predicted_index = torch.max(outputs, 1)
    
    predicted_class_index = predicted_index.item()
    
    if 0 <= predicted_class_index < len(class_names):
        return class_names[predicted_class_index]
    else:
        print(f"Error: Predicted index {predicted_class_index} is out of bounds for class_names.")
        return "Prediction Index Error"


# --- Flask App ---
app = Flask(__name__)
# Allow requests from your React frontend (adjust origin if necessary)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}) 

@app.route('/api/predict', methods=['POST'])
def handle_prediction():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()
    relative_image_path = data.get('imagePath') # e.g., 'uploads/patientX/image.jpg'

    if not relative_image_path:
        return jsonify({"error": "Missing 'imagePath' in request body"}), 400

    # Construct the full path to the image file
    # Assumes IMAGE_BASE_PATH is the directory *containing* the 'uploads' folder
    full_image_path = os.path.join(relative_image_path)
    # full_image_path = os.path.join(IMAGE_BASE_PATH, relative_image_path)
    full_image_path = os.path.normpath(full_image_path) # Normalize path separators

    print(f"Attempting to predict for image: {full_image_path}") # For debugging

    if not os.path.exists(full_image_path):
         print(f"Image file not found at constructed path: {full_image_path}")
         # Try an alternative if uploads is directly inside IMAGE_BASE_PATH
        #  alt_path = os.path.join(IMAGE_BASE_PATH, 'uploads', os.path.basename(relative_image_path))
         alt_path = os.path.join(IMAGE_BASE_PATH, 'backend/uploads', os.path.basename(relative_image_path))
         alt_path = os.path.normpath(alt_path)
         if os.path.exists(alt_path):
             full_image_path = alt_path
             print(f"Found image at alternative path: {full_image_path}")
         else:
             print(f"Also not found at alternative path: {alt_path}")
             return jsonify({"error": f"Image file not found on server at path: {relative_image_path}"}), 404


    try:
        prediction_result = predict(full_image_path, model)
        
        if prediction_result:
            print(f"Prediction successful: {prediction_result}")
            return jsonify({"prediction": prediction_result})
        else:
            # Error occurred during preprocessing or prediction index issue
             print(f"Prediction failed for image: {full_image_path}")
             return jsonify({"error": "Prediction failed on server"}), 500

    except Exception as e:
        print(f"Exception during prediction for {full_image_path}: {e}")
        return jsonify({"error": f"Server error during prediction: {e}"}), 500

# --- Run the App ---
if __name__ == '__main__':
    # Make sure debug=False in production
    app.run(host='0.0.0.0', port=5002, debug=True)




