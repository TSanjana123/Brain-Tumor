from flask import Flask, request, jsonify
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os
import pymongo
from bson.objectid import ObjectId

app = Flask(__name__)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")  # Change if needed
db = client['brain_tumor_db']  # Database name
patients_collection = db['patients']  # Collection name

# Model and class names
class_names = [
    'Astrocitoma T1', 'Astrocitoma T1C+', 'Carcinoma T1', 'Carcinoma T1C+', 'Carcinoma T2',
    'Ependimoma T1', 'Ependimoma T1C+', 'Ependimoma T2', 'Ganglioglioma T1', 'Ganglioglioma T1C+',
    'Ganglioglioma T2', 'Germinoma T1', 'Germinoma T1C+', 'Germinoma T2', 'Glioblastoma T1',
    'Glioblastoma T1C+', 'Glioblastoma T2', 'Granuloma T1', 'Granuloma T1C+', 'Meduloblastoma T1',
    'Meduloblastoma T2', 'Meningioma T1', 'Meningioma T1C+', 'Neurocitoma T1', 'Neurocitoma T1C+',
    'Neurocitoma T2', 'Oligodendroglioma T1', 'Oligodendroglioma T1C+', 'Oligodendroglioma T2',
    'Papiloma T1', 'Papiloma T1C+', 'Papiloma T2', 'Schwannoma T1', 'Schwannoma T1C+', 'Schwannoma T2',
    'Tuberculoma T1', 'Tuberculoma T1C+', 'Tuberculoma T2', '_NORMAL T1', '_NORMAL T2'
]

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the trained model
model = models.densenet201(pretrained=False)
model.classifier = nn.Linear(model.classifier.in_features, len(class_names))
model.load_state_dict(torch.load('/path/to/your/densenet201_brain_tumor.pth'))
model = model.to(device)
model.eval()

# Image preprocessing function
def preprocess_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    image = Image.open(image_path)
    image = image.convert("RGB")
    image = transform(image).unsqueeze(0)  # Add batch dimension
    return image.to(device)

# Prediction function
def predict(image_path):
    image = preprocess_image(image_path)
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
    return predicted.item()

# API route for prediction
@app.route('/predict', methods=['POST'])
def predict_route():
    file = request.files['image']
    patient_id = request.form['patientId']
    # Save the image temporarily
    image_path = f'./temp_images/{file.filename}'
    file.save(image_path)
    
    # Get prediction
    predicted_class_idx = predict(image_path)
    predicted_class = class_names[predicted_class_idx]
    
    # Save the prediction in MongoDB
    patients_collection.update_one(
        {"_id": ObjectId(patient_id)},
        {"$set": {"prediction": predicted_class}}
    )

    # Clean up: delete the temporary image
    os.remove(image_path)
    
    return jsonify({"predictedClass": predicted_class})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
