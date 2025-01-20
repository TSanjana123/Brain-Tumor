require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import CORS
const User = require('./models/User');

const app = express();

// Enable CORS for all origins (you can customize this later)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
mongoose.connect("mongodb+srv://sanjanathumpally:rootinc@sanjanaaa.ajf49.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      patientId: role === 'patient' ? patientId : undefined,
      organizationName: role === 'medicalStaff' ? organizationName : undefined,
    });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login request received:', req.body);  // Log the incoming request data

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');  // Log when user is not found
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Incorrect password');  // Log when password does not match
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    // const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
      expiresIn: '1h',
    });

    // Send the token in the response
    res.status(200).json({
      token,
      role: user.role,
      patientId: user.patientId,
      organizationName: user.organizationName,
    });

  } catch (err) {
    console.error('Error during login:', err);  // Log the error if something goes wrong
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server on port 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
