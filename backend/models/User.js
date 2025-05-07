// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['patient', 'medicalStaff', 'admin'] },
  patientId: {
    type: String,
    required: function() { return this.role === 'patient'; },
  },
  gender: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  dateOfRegistration: { type: Date, default: Date.now },
  referredDoctor: { type: String, required: false },
  organizationName: { type: String },
  imageData: [
    {
      // _id is added automatically by Mongoose/MongoDB for subdocuments
      organizationName: { type: String },
      imageName: { type: String },
      imagePath: { type: String },
      uploadDate: { type: Date },
      prediction: { type: String, required: false },
    },
  ],
  chatHistory: [
    {
      imageId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Refers to _id in imageData
      imagePath: { type: String, required: true }, // For easier reference if needed
      imageName: { type: String },
      initialPrediction: { type: String }, // Prediction at the time chat started
      messages: [
        {
          role: { type: String, enum: ['user', 'model'], required: true },
          content: { type: String, required: true },
          timestamp: { type: Date, default: Date.now },
        }
      ],
      lastUpdated: { type: Date, default: Date.now }
    }
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;