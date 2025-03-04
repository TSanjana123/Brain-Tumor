const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  patientId: { type: String },
  organizationName: { type: String },

  imageData: [
    {
      organizationName: { type: String }, // Ensure this is defined
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