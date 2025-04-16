import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Load the pre-trained model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.densenet201(pretrained=False)
model.classifier = nn.Linear(model.classifier.in_features, 4)  # Assuming 4 classes
model.load_state_dict(torch.load('densenet201_brain_tumor.pth', map_location=device))
model = model.to(device)
model.eval()

# Define image transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def preprocess_image(image_path):
    image = Image.open(image_path).convert("RGB")
    return transform(image).unsqueeze(0).to(device)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    image_path = os.path.join('uploads', image.filename)
    image.save(image_path)

    image_tensor = preprocess_image(image_path)
    with torch.no_grad():
        outputs = model(image_tensor)
        _, predicted = torch.max(outputs, 1)

    class_names = ["Astrocitoma T1", "Glioma", "Meningioma", "No Tumor"]  # Example classes
    predicted_class = class_names[predicted.item()]

    return jsonify({'prediction': predicted_class, 'imagePath': image_path})

if __name__ == '__main__':
    app.run(debug=True, port=5002)
