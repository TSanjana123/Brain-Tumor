const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['patient', 'medicalStaff', 'admin'] },
  patientId: { 
    type: String, 
    required: function() { return this.role === 'patient'; },  // Only required if the role is 'patient'
  },
  gender: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  dateOfRegistration: { type: Date, default: Date.now },
  referredDoctor: { type: String, required: false },
  organizationName: { type: String },
  imageData: [
    {
      organizationName: { type: String },
      imageName: { type: String },
      imagePath: { type: String },
      uploadDate: { type: Date },
    },
  ],
  chatHistory: [
    {
      imagePath: { type: String },
      imageName: { type: String },
      uploadDate: { type: Date },
      allChat: [
        {
          prompt: { type: String },
        },
      ],
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
