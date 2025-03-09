import os
import torch
import traceback
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image
import torchvision.transforms as transforms

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Directory for storing uploaded images
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load the brain tumor model
print("Loading Brain Tumor Model...")
import torch
import torch.nn as nn
import torchvision.models as models
import traceback

def load_model():
    try:
        model_path = "C:\\Users\\Dell\\Desktop\\BRAIN_TUMOR\\Brain-Tumor\\Models\\densenet201_brain_tumor.pth"

        # ✅ Initialize DenseNet201
        model = models.densenet201(weights=None)  # Use weights=None instead of pretrained=False

        # ✅ Modify the classifier to match the saved model (40 classes)
        model.classifier = nn.Linear(in_features=1920, out_features=40)  # Change 1000 → 40

        # ✅ Load the trained weights
        model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))

        # ✅ Set model to evaluation mode
        model.eval()

        print("Brain Tumor Model Loaded Successfully.")
        return model

    except Exception as e:
        print("Error loading brain tumor model:", e)
        traceback.print_exc()
        return None

# Load the model once when the backend starts
brain_tumor_model = load_model()


# Load the model
tumor_model = load_model()

# Define image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5])
])

# API for tumor prediction
@app.route('/api/uploadImage', methods=['POST'])
def predict_tumor():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image_file = request.files['image']

        # Check if the file is an image
        if not image_file.content_type.startswith('image/'):
            return jsonify({'error': 'File is not a valid image'}), 400

        # Open and process the image
        image = Image.open(image_file.stream).convert('L')  # Convert to grayscale if required
        image = transform(image).unsqueeze(0)  # Add batch dimension

        # Perform inference
        with torch.no_grad():
            output = tumor_model(image)
            _, predicted_class = torch.max(output, 1)

        # Map the predicted class to a label
        class_labels = {0: "No Tumor", 1: "Tumor Detected"}
        prediction = class_labels.get(predicted_class.item(), "Unknown")

        print(f"Predicted Class: {prediction}")

        return jsonify({'prediction': prediction})

    except Exception as e:
        print("Exception occurred:", e)
        traceback.print_exc()
        return jsonify({'error': 'Internal Server Error'}), 500

# API for image uploads (organization uploads for patients)
@app.route('/api/uploads', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        image_file = request.files['image']
        patient_id = request.form.get('patientId')

        if not patient_id:
            return jsonify({'error': 'Patient ID is required'}), 400

        filename = f"{patient_id}.jpg"  # Store image as PatientID.jpg
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        image_file.save(filepath)

        return jsonify({'message': 'Image uploaded successfully', 'imageUrl': f"/api/images/{filename}"})

    except Exception as e:
        print("Error uploading image:", e)
        traceback.print_exc()
        return jsonify({'error': 'Internal Server Error'}), 500

# API for serving patient images
@app.route('/api/images/<filename>', methods=['GET'])
def get_image(filename):
    try:
        return send_from_directory(UPLOAD_FOLDER, filename)
    except Exception as e:
        print("Error fetching image:", e)
        return jsonify({'error': 'Image not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=8000, use_reloader=False)
