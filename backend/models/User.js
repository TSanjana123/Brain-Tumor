// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true, enum: ['patient', 'medicalStaff', 'admin'] },
//   patientId: {
//     type: String,
//     required: function() { return this.role === 'patient'; },
//   },
//   gender: { type: String, required: false },
//   dateOfBirth: { type: Date, required: false },
//   dateOfRegistration: { type: Date, default: Date.now },
//   referredDoctor: { type: String, required: false },
//   organizationName: { type: String },
//   imageData: [
//     {
//       // _id is added automatically by Mongoose/MongoDB for subdocuments
//       organizationName: { type: String },
//       imageName: { type: String },
//       imagePath: { type: String },
//       uploadDate: { type: Date },
//       prediction: { type: String, required: false },
//     },
//   ],
//   chatHistory: [
//     {
//       imageId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Refers to _id in imageData
//       imagePath: { type: String, required: true }, // For easier reference if needed
//       imageName: { type: String },
//       initialPrediction: { type: String }, // Prediction at the time chat started
//       messages: [
//         {
//           role: { type: String, enum: ['user', 'model'], required: true },
//           content: { type: String, required: true },
//           timestamp: { type: Date, default: Date.now },
//         }
//       ],
//       lastUpdated: { type: Date, default: Date.now }
//     }
//   ],
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;


// models/User.js
const mongoose = require('mongoose');

// Define the schema for the image data subdocument
const imageSubSchema = new mongoose.Schema({
  // _id is added automatically by Mongoose/MongoDB for subdocuments
  organizationName: {
    type: String,
    trim: true,
  },
  imageName: {
    type: String,
    trim: true,
  },
  imagePath: {
    type: String,
    required: [true, 'Image path is required.'], // Path to the stored image
    trim: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now, // Set upload date by default
  },
  prediction: {
    type: String,
    required: false, // Prediction is optional
    trim: true,
  },
});

// Define the schema for chat messages subdocument
const chatMessageSubSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'model'],
    required: [true, 'Message role is required.'],
  },
  content: {
    type: String,
    required: [true, 'Message content is required.'],
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  sentBy: { // To identify which user (patient or staff) sent a 'user' role message
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User collection
    required: false, // Could be required if role is 'user' depending on logic
  }
});

// Define the schema for chat history subdocument
const chatHistorySubSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId, // Refers to _id of an image in the parent User's imageData array
    required: [true, 'Image ID for chat history is required.'],
  },
  imagePath: { // Denormalized for convenience, consider implications if image paths can change
    type: String,
    required: [true, 'Image path for chat history is required.'],
    trim: true,
  },
  imageName: { // Denormalized for convenience
    type: String,
    trim: true,
  },
  initialPrediction: { // Prediction at the time chat session for this image started
    type: String,
    trim: true,
  },
  messages: [chatMessageSubSchema], // Array of chat messages
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

// Define the main user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true, // Ensures email addresses are unique across all users
    lowercase: true, // Store emails in lowercase for consistency
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Basic email format validation
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  role: {
    type: String,
    required: [true, 'User role is required.'],
    enum: ['patient', 'medicalStaff', 'admin'], // Defines allowed roles
  },
  patientId: { // Custom patient identifier (e.g., "P001")
    type: String,
    required: function() { return this.role === 'patient'; }, // Required only if the user is a patient
    trim: true,
    // Uniqueness for patientId (if role is patient) is handled by a partial index (see below)
  },
  gender: {
    type: String,
    required: false,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  dateOfRegistration: {
    type: Date,
    default: Date.now, // Sets the registration date automatically
  },
  referredDoctor: {
    type: String,
    required: false,
    trim: true,
  },
  organizationName: { // Name of the organization the user belongs to (if any)
    type: String,
    trim: true,
  },
  imageData: [imageSubSchema], // Array of image data subdocuments
  chatHistory: [chatHistorySubSchema], // Array of chat history subdocuments
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps to the main document
});

// Create a partial unique index for patientId.
// This ensures patientId is unique ONLY for documents where role is 'patient' and patientId exists.
userSchema.index(
  { patientId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      role: 'patient',
      patientId: { $exists: true, $ne: null } // Ensure patientId is not null or undefined
    }
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;