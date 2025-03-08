import os
import traceback
from flask import Flask, request, jsonify
from PIL import Image
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from flask_cors import CORS

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the brain tumor model
print("Loading Brain Tumor Model...")

def load_model():
    try:
        model_path = "backend/brain_tumor_model.pth"  # Update with your correct model path
        model = torch.load(model_path, map_location=torch.device('cpu'))
        model.eval()
        print("Brain Tumor Model Loaded Successfully.")
        return model
    except Exception as e:
        print("Error loading brain tumor model:", e)
        traceback.print_exc()
        return None

# Load the model
tumor_model = load_model()

# Define image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5])
])

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

        # Map the predicted class to a label (modify based on your model's classes)
        class_labels = {0: "No Tumor", 1: "Tumor Detected"}
        prediction = class_labels.get(predicted_class.item(), "Unknown")

        print(f"Predicted Class: {prediction}")

        return jsonify({'prediction': prediction})

    except Exception as e:
        print("Exception occurred:", e)
        traceback.print_exc()
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000, use_reloader=False)
