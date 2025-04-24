// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['patient', 'medicalStaff', 'admin'] },
  patientId: {
    type: String,
    required: function() { return this.role === 'patient'; },  // Only required if the role is 'patient'
    // unique: true, // Consider adding unique index if patientId should be unique
  },
  gender: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  dateOfRegistration: { type: Date, default: Date.now },
  referredDoctor: { type: String, required: false },
  organizationName: { type: String }, // Applicable to medicalStaff or patient's org? Clarify if needed
  imageData: [
    {
      // _id is added automatically by Mongoose/MongoDB for subdocuments
      organizationName: { type: String },
      imageName: { type: String },
      imagePath: { type: String },
      uploadDate: { type: Date },
      prediction: { type: String, required: false }, // <-- Added prediction field
    },
  ],
  chatHistory: [ // Unrelated to this change, kept as is
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

// Add index on patientId if you frequently query by it and it should be unique
// userSchema.index({ patientId: 1 }, { unique: true, partialFilterExpression: { patientId: { $type: "string" } } });

const User = mongoose.model('User', userSchema);

module.exports = User;