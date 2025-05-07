// // // // // // require('dotenv').config();
// // // // // // const express = require('express');
// // // // // // const mongoose = require('mongoose');
// // // // // // const bcrypt = require('bcryptjs');
// // // // // // const jwt = require('jsonwebtoken');
// // // // // // const cors = require('cors'); // Import CORS
// // // // // // const User = require('./models/User');

// // // // // // const app = express();

// // // // // // // Enable CORS for all origins (you can customize this later)
// // // // // // app.use(cors());

// // // // // // // Middleware to parse JSON bodies
// // // // // // app.use(express.json());
// // // // // // // app.use('/uploads', express.static('uploads'));

// // // // // // // Connect to MongoDB
// // // // // // // mongoose.connect(process.env.MONGODB_URI, {
// // // // // // // mongoose.connect("mongodb+srv://sanjanathumpally:rootinc@sanjanaaa.ajf49.mongodb.net/", {
// // // // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // // // //   useNewUrlParser: true,
// // // // // //   useUnifiedTopology: true,
// // // // // // })
// // // // // //   .then(() => console.log('MongoDB connected'))
// // // // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // // // Signup Route
// // // // // // app.post('/api/signup', async (req, res) => {
// // // // // //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// // // // // //   if (password !== confirmPassword) {
// // // // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // // // //   }

// // // // // //   try {
// // // // // //     // Check if the email is already registered
// // // // // //     const existingUser = await User.findOne({ email });
// // // // // //     if (existingUser) {
// // // // // //       return res.status(400).json({ message: 'Email already in use' });
// // // // // //     }

// // // // // //     // Hash the password
// // // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // // //     // Create the new user
// // // // // //     const newUser = new User({
// // // // // //       name,
// // // // // //       email,
// // // // // //       password: hashedPassword,
// // // // // //       role,
// // // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
      
// // // // // //     });

// // // // // //     // Save the user to the database
// // // // // //     await newUser.save();

// // // // // //     // Send success response
// // // // // //     res.status(201).json({ message: 'User registered successfully' });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // //   }
// // // // // // });



// // // // // // // Login Route
// // // // // // app.post('/api/login', async (req, res) => {
// // // // // //   const { email, password } = req.body;

// // // // // //   try {
// // // // // //     console.log('Login request received:', req.body);  // Log the incoming request data

// // // // // //     // Find the user by email
// // // // // //     const user = await User.findOne({ email });
// // // // // //     if (!user) {
// // // // // //       console.log('User not found');  // Log when user is not found
// // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // //     }

// // // // // //     // Check if the password is correct
// // // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // // //     if (!isMatch) {
// // // // // //       console.log('Incorrect password');  // Log when password does not match
// // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // //     }

// // // // // //     // Create a JWT token
// // // // // //     // const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
// // // // // //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
// // // // // //       expiresIn: '1h',
// // // // // //     });

// // // // // //     // Send the token in the response
// // // // // //     res.status(200).json({
// // // // // //       name: user.name,
// // // // // //       email: user.email,
// // // // // //       role: user.role,
// // // // // //       token,
// // // // // //       patientId: user.patientId,
// // // // // //       organizationName: user.organizationName,
// // // // // //     });

// // // // // //   } catch (err) {
// // // // // //     console.error('Error during login:', err);  // Log the error if something goes wrong
// // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // //   }
// // // // // // });


// // // // // // // Start the server on port 5001
// // // // // // const PORT = process.env.PORT || 5001;
// // // // // // app.listen(PORT, () => {
// // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // });




// // // // // // // // // // // require('dotenv').config();
// // // // // // // // // // // const express = require('express');
// // // // // // // // // // // const mongoose = require('mongoose');
// // // // // // // // // // // const cors = require('cors');
// // // // // // // // // // // const multer = require('multer');
// // // // // // // // // // // const fs = require('fs');
// // // // // // // // // // // const path = require('path');
// // // // // // // // // // // const User = require('./models/User');

// // // // // // // // // // // const app = express();

// // // // // // // // // // // // Middleware
// // // // // // // // // // // app.use(cors());
// // // // // // // // // // // app.use(express.json());
// // // // // // // // // // // app.use('/uploads', express.static('uploads'));

// // // // // // // // // // // // MongoDB Connection
// // // // // // // // // // // // mongoose.connect("mongodb+srv://sanjanathumpally:rootinc@sanjanaaa.ajf49.mongodb.net/", {
// // // // // // // // // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // // // // // // // // //   useNewUrlParser: true,
// // // // // // // // // // //   useUnifiedTopology: true,
// // // // // // // // // // // })
// // // // // // // // // // //   .then(() => console.log('MongoDB connected'))
// // // // // // // // // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // // // // // // // // Ensure uploads directory exists
// // // // // // // // // // // const uploadDir = path.join(__dirname, 'uploads');
// // // // // // // // // // // if (!fs.existsSync(uploadDir)) {
// // // // // // // // // // //   fs.mkdirSync(uploadDir);
// // // // // // // // // // // }

// // // // // // // // // // // // Multer configuration for file uploads
// // // // // // // // // // // const storage = multer.diskStorage({
// // // // // // // // // // //   destination: (req, file, cb) => {
// // // // // // // // // // //     cb(null, './uploads');
// // // // // // // // // // //   },
// // // // // // // // // // //   filename: (req, file, cb) => {
// // // // // // // // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // // // // // // // //   },
// // // // // // // // // // // });
// // // // // // // // // // // const upload = multer({ storage });

// // // // // // // // // // // // Upload endpoint
// // // // // // // // // // // app.post('/api/upload', upload.single('image'), async (req, res) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const { patientId, organizationEmail } = req.body;
// // // // // // // // // // //     const imagePath = req.file.path;
// // // // // // // // // // //     const imageId = req.file.filename;
// // // // // // // // // // //     const uploadTime = new Date();

// // // // // // // // // // //     // Find the organization by email
// // // // // // // // // // //     const organization = await User.findOne({ email: organizationEmail, role: 'medicalStaff' });

// // // // // // // // // // //     if (!organization) {
// // // // // // // // // // //       return res.status(404).json({ message: 'Organization not found' });
// // // // // // // // // // //     }

// // // // // // // // // // //     // Find the patient and update their image data
// // // // // // // // // // //     const updatedUser = await User.findOneAndUpdate(
// // // // // // // // // // //       { patientId },
// // // // // // // // // // //       {
// // // // // // // // // // //         $push: {
// // // // // // // // // // //           imageData: { imageId, imagePath, uploadTime },
// // // // // // // // // // //         },
// // // // // // // // // // //       },
// // // // // // // // // // //       { new: true }
// // // // // // // // // // //     );

// // // // // // // // // // //     if (!updatedUser) {
// // // // // // // // // // //       return res.status(404).json({ message: 'Patient not found' });
// // // // // // // // // // //     }

// // // // // // // // // // //     res.status(200).json({ message: 'Image uploaded successfully', updatedUser });
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error(err);
// // // // // // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // // // // // //   }
// // // // // // // // // // // });



// // // // // // // // // // // // API to fetch all patient IDs
// // // // // // // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const patients = await User.find({ role: 'patient' }, 'patientId');
// // // // // // // // // // //     res.status(200).json(patients);
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error(err);
// // // // // // // // // // //     res.status(500).json({ message: 'Failed to fetch patient IDs' });
// // // // // // // // // // //   }
// // // // // // // // // // // });


// // // // // // // // // // // // Start server
// // // // // // // // // // // const PORT = process.env.PORT || 5001;
// // // // // // // // // // // app.listen(PORT, () => {
// // // // // // // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // // // // // // });




// // // // // // // // // // // const express = require('express');
// // // // // // // // // // // const mongoose = require('mongoose');
// // // // // // // // // // // const multer = require('multer');
// // // // // // // // // // // const cors = require('cors');
// // // // // // // // // // // const path = require('path');

// // // // // // // // // // // // Initialize Express app and middleware
// // // // // // // // // // // const app = express();
// // // // // // // // // // // app.use(cors());
// // // // // // // // // // // app.use(express.json());

// // // // // // // // // // // // MongoDB connection
// // // // // // // // // // // const mongoURI = 'mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/';
// // // // // // // // // // // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// // // // // // // // // // // const db = mongoose.connection;
// // // // // // // // // // // db.on('connected', () => console.log('Connected to MongoDB Atlas'));
// // // // // // // // // // // db.on('error', (error) => console.error('MongoDB connection error:', error));

// // // // // // // // // // // // Define User Schema
// // // // // // // // // // // const userSchema = new mongoose.Schema({
// // // // // // // // // // //   name: String,
// // // // // // // // // // //   email: String,
// // // // // // // // // // //   password: String,
// // // // // // // // // // //   role: String,
// // // // // // // // // // //   patientId: String,
// // // // // // // // // // //   organizationName: String,
// // // // // // // // // // //   imageData: [
// // // // // // // // // // //     {
// // // // // // // // // // //       imagePath: String,
// // // // // // // // // // //       imageId: String,
// // // // // // // // // // //       uploadedAt: { type: Date, default: Date.now },
// // // // // // // // // // //     },
// // // // // // // // // // //   ],
// // // // // // // // // // // });
// // // // // // // // // // // const User = mongoose.model('User', userSchema);

// // // // // // // // // // // // Multer setup for file uploads
// // // // // // // // // // // const storage = multer.diskStorage({
// // // // // // // // // // //   destination: (req, file, cb) => {
// // // // // // // // // // //     const uploadPath = path.join(__dirname, 'uploads');
// // // // // // // // // // //     cb(null, uploadPath);
// // // // // // // // // // //   },
// // // // // // // // // // //   filename: (req, file, cb) => {
// // // // // // // // // // //     const uniqueFilename = `${Date.now()}-${file.originalname}`;
// // // // // // // // // // //     cb(null, uniqueFilename);
// // // // // // // // // // //   },
// // // // // // // // // // // });
// // // // // // // // // // // const upload = multer({ storage });

// // // // // // // // // // // // Serve static files from the uploads folder
// // // // // // // // // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // // // // // // // // API to get all patient IDs
// // // // // // // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const patients = await User.find({ role: 'patient' }, { patientId: 1, _id: 0 });
// // // // // // // // // // //     res.json(patients);
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     res.status(500).json({ error: 'Failed to fetch patient IDs' });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // API to upload image details
// // // // // // // // // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // // // // // // // // //   const { patientId } = req.body;

// // // // // // // // // // //   // Validate input
// // // // // // // // // // //   if (!patientId || !req.file) {
// // // // // // // // // // //     return res.status(400).json({ error: 'Patient ID and image are required' });
// // // // // // // // // // //   }

// // // // // // // // // // //   const imagePath = `/uploads/${req.file.filename}`; // File path to save in MongoDB
// // // // // // // // // // //   const imageId = req.file.filename; // Unique image identifier

// // // // // // // // // // //   try {
// // // // // // // // // // //     const patient = await User.findOne({ patientId });

// // // // // // // // // // //     if (!patient) {
// // // // // // // // // // //       return res.status(404).json({ error: 'Patient not found' });
// // // // // // // // // // //     }

// // // // // // // // // // //     // Add image details to the patient's imageData array
// // // // // // // // // // //     const newImageData = { imagePath, imageId };
// // // // // // // // // // //     patient.imageData.push(newImageData);
// // // // // // // // // // //     await patient.save();

// // // // // // // // // // //     res.json({ message: 'Image uploaded successfully', imagePath });
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     res.status(500).json({ error: 'Failed to upload image' });
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // Start the server
// // // // // // // // // // // const PORT = 5001;
// // // // // // // // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// // // // // // // // // // const express = require('express');
// // // // // // // // // // const mongoose = require('mongoose');
// // // // // // // // // // const bcrypt = require('bcrypt');
// // // // // // // // // // const jwt = require('jsonwebtoken');
// // // // // // // // // // const multer = require('multer');
// // // // // // // // // // const cors = require('cors');
// // // // // // // // // // const path = require('path');

// // // // // // // // // // // Initialize Express app
// // // // // // // // // // const app = express();
// // // // // // // // // // app.use(cors());
// // // // // // // // // // app.use(express.json());

// // // // // // // // // // // MongoDB connection
// // // // // // // // // // const mongoURI = 'mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/';
// // // // // // // // // // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// // // // // // // // // // const db = mongoose.connection;
// // // // // // // // // // db.on('connected', () => console.log('Connected to MongoDB Atlas'));
// // // // // // // // // // db.on('error', (error) => console.error('MongoDB connection error:', error));

// // // // // // // // // // // JWT secret
// // // // // // // // // // const JWT_SECRET = '4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s';

// // // // // // // // // // // Define User Schema
// // // // // // // // // // const userSchema = new mongoose.Schema({
// // // // // // // // // //   name: String,
// // // // // // // // // //   email: { type: String, unique: true },
// // // // // // // // // //   password: String,
// // // // // // // // // //   role: String,
// // // // // // // // // //   patientId: String,
// // // // // // // // // //   organizationName: String,
// // // // // // // // // //   imageData: [
// // // // // // // // // //     {
// // // // // // // // // //       imagePath: String,
// // // // // // // // // //       imageId: String,
// // // // // // // // // //       uploadedAt: { type: Date, default: Date.now },
// // // // // // // // // //     },
// // // // // // // // // //   ],
// // // // // // // // // // });
// // // // // // // // // // const User = mongoose.model('User', userSchema);

// // // // // // // // // // // Multer setup for file uploads
// // // // // // // // // // const storage = multer.diskStorage({
// // // // // // // // // //   destination: (req, file, cb) => {
// // // // // // // // // //     const uploadPath = path.join(__dirname, 'uploads');
// // // // // // // // // //     cb(null, uploadPath);
// // // // // // // // // //   },
// // // // // // // // // //   filename: (req, file, cb) => {
// // // // // // // // // //     const uniqueFilename = `${Date.now()}-${file.originalname}`;
// // // // // // // // // //     cb(null, uniqueFilename);
// // // // // // // // // //   },
// // // // // // // // // // });
// // // // // // // // // // const upload = multer({ storage });

// // // // // // // // // // // Serve static files from the uploads folder
// // // // // // // // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // // // // // // // Signup route
// // // // // // // // // // app.post('/api/signup', async (req, res) => {
// // // // // // // // // //   const { name, email, password, role, patientId, organizationName } = req.body;

// // // // // // // // // //   try {
// // // // // // // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // // // // // // //     const newUser = new User({
// // // // // // // // // //       name,
// // // // // // // // // //       email,
// // // // // // // // // //       password: hashedPassword,
// // // // // // // // // //       role,
// // // // // // // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // // // // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // // // // // // //     });

// // // // // // // // // //     await newUser.save();
// // // // // // // // // //     res.json({ message: 'User registered successfully' });
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error(err);
// // // // // // // // // //     res.status(500).json({ error: 'Failed to register user' });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // Login route
// // // // // // // // // // app.post('/api/login', async (req, res) => {
// // // // // // // // // //   const { email, password } = req.body;

// // // // // // // // // //   try {
// // // // // // // // // //     const user = await User.findOne({ email });
// // // // // // // // // //     if (!user) {
// // // // // // // // // //       return res.status(404).json({ error: 'User not found' });
// // // // // // // // // //     }

// // // // // // // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // // // // // // //     if (!isMatch) {
// // // // // // // // // //       return res.status(401).json({ error: 'Invalid credentials' });
// // // // // // // // // //     }

// // // // // // // // // //     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
// // // // // // // // // //     res.json({ message: 'Login successful', token });
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error(err);
// // // // // // // // // //     res.status(500).json({ error: 'Failed to login' });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // API to fetch all patient IDs
// // // // // // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const patients = await User.find({ role: 'patient' }, { patientId: 1, _id: 0 });
// // // // // // // // // //     res.json(patients);
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     res.status(500).json({ error: 'Failed to fetch patient IDs' });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // API to upload image details
// // // // // // // // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // // // // // // // //   const { patientId } = req.body;

// // // // // // // // // //   // Validate input
// // // // // // // // // //   if (!patientId || !req.file) {
// // // // // // // // // //     return res.status(400).json({ error: 'Patient ID and image are required' });
// // // // // // // // // //   }

// // // // // // // // // //   const imagePath = `/uploads/${req.file.filename}`; // File path to save in MongoDB
// // // // // // // // // //   const imageId = req.file.filename; // Unique image identifier

// // // // // // // // // //   try {
// // // // // // // // // //     const patient = await User.findOne({ patientId });

// // // // // // // // // //     if (!patient) {
// // // // // // // // // //       return res.status(404).json({ error: 'Patient not found' });
// // // // // // // // // //     }

// // // // // // // // // //     // Add image details to the patient's imageData array
// // // // // // // // // //     const newImageData = { imagePath, imageId };
// // // // // // // // // //     patient.imageData.push(newImageData);
// // // // // // // // // //     await patient.save();

// // // // // // // // // //     res.json({ message: 'Image uploaded successfully', imagePath });
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     res.status(500).json({ error: 'Failed to upload image' });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // Start the server
// // // // // // // // // // const PORT = 5001;
// // // // // // // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


















// // // // // // // // // // const express = require('express');
// // // // // // // // // // const mongoose = require('mongoose');
// // // // // // // // // // const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt
// // // // // // // // // // const jwt = require('jsonwebtoken');
// // // // // // // // // // const multer = require('multer');
// // // // // // // // // // const cors = require('cors');
// // // // // // // // // // const path = require('path');

// // // // // // // // // // const app = express();
// // // // // // // // // // app.use(cors());
// // // // // // // // // // app.use(express.json());

// // // // // // // // // // // MongoDB connection
// // // // // // // // // // const mongoURI = 'mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/';
// // // // // // // // // // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// // // // // // // // // // const db = mongoose.connection;
// // // // // // // // // // db.on('connected', () => console.log('Connected to MongoDB Atlas'));
// // // // // // // // // // db.on('error', (error) => console.error('MongoDB connection error:', error));

// // // // // // // // // // // JWT secret
// // // // // // // // // // const JWT_SECRET = 'your_jwt_secret_key';

// // // // // // // // // // // Define User Schema
// // // // // // // // // // const userSchema = new mongoose.Schema({
// // // // // // // // // //   name: String,
// // // // // // // // // //   email: { type: String, unique: true },
// // // // // // // // // //   password: String,
// // // // // // // // // //   role: String,
// // // // // // // // // //   patientId: String,
// // // // // // // // // //   organizationName: String,
// // // // // // // // // //   imageData: [
// // // // // // // // // //     {
// // // // // // // // // //       imagePath: String,
// // // // // // // // // //       imageId: String,
// // // // // // // // // //       uploadedAt: { type: Date, default: Date.now },
// // // // // // // // // //     },
// // // // // // // // // //   ],
// // // // // // // // // // });
// // // // // // // // // // const User = mongoose.model('User', userSchema);

// // // // // // // // // // // Multer setup for file uploads
// // // // // // // // // // const storage = multer.diskStorage({
// // // // // // // // // //   destination: (req, file, cb) => {
// // // // // // // // // //     const uploadPath = path.join(__dirname, 'uploads');
// // // // // // // // // //     cb(null, uploadPath);
// // // // // // // // // //   },
// // // // // // // // // //   filename: (req, file, cb) => {
// // // // // // // // // //     const uniqueFilename = `${Date.now()}-${file.originalname}`;
// // // // // // // // // //     cb(null, uniqueFilename);
// // // // // // // // // //   },
// // // // // // // // // // });
// // // // // // // // // // const upload = multer({ storage });

// // // // // // // // // // // Serve static files from the uploads folder
// // // // // // // // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // // // // // // // Signup route
// // // // // // // // // // app.post('/api/signup', async (req, res) => {
// // // // // // // // // //   const { name, email, password, role, patientId, organizationName } = req.body;

// // // // // // // // // //   try {
// // // // // // // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // // // // // // //     const newUser = new User({
// // // // // // // // // //       name,
// // // // // // // // // //       email,
// // // // // // // // // //       password: hashedPassword,
// // // // // // // // // //       role,
// // // // // // // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // // // // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // // // // // // //     });

// // // // // // // // // //     await newUser.save();
// // // // // // // // // //     res.json({ message: 'User registered successfully' });
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error(err);
// // // // // // // // // //     res.status(500).json({ error: 'Failed to register user' });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // Login route
// // // // // // // // // // app.post('/api/login', async (req, res) => {
// // // // // // // // // //   const { email, password } = req.body;

// // // // // // // // // //   try {
// // // // // // // // // //     const user = await User.findOne({ email });
// // // // // // // // // //     if (!user) {
// // // // // // // // // //       return res.status(404).json({ error: 'User not found' });
// // // // // // // // // //     }

// // // // // // // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // // // // // // //     if (!isMatch) {
// // // // // // // // // //       return res.status(401).json({ error: 'Invalid credentials' });
// // // // // // // // // //     }

// // // // // // // // // //     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
// // // // // // // // // //     res.json({ message: 'Login successful', token });
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error(err);
// // // // // // // // // //     res.status(500).json({ error: 'Failed to login' });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // API to fetch all patient IDs
// // // // // // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const patients = await User.find({ role: 'patient' }, { patientId: 1, _id: 0 });
// // // // // // // // // //     res.json(patients);
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     res.status(500).json({ error: 'Failed to fetch patient IDs' });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // API to upload image details
// // // // // // // // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // // // // // // // //   const { patientId } = req.body;

// // // // // // // // // //   if (!patientId || !req.file) {
// // // // // // // // // //     return res.status(400).json({ error: 'Patient ID and image are required' });
// // // // // // // // // //   }

// // // // // // // // // //   const imagePath = `/uploads/${req.file.filename}`;
// // // // // // // // // //   const imageId = req.file.filename;

// // // // // // // // // //   try {
// // // // // // // // // //     const patient = await User.findOne({ patientId });

// // // // // // // // // //     if (!patient) {
// // // // // // // // // //       return res.status(404).json({ error: 'Patient not found' });
// // // // // // // // // //     }

// // // // // // // // // //     const newImageData = { imagePath, imageId };
// // // // // // // // // //     patient.imageData.push(newImageData);
// // // // // // // // // //     await patient.save();

// // // // // // // // // //     res.json({ message: 'Image uploaded successfully', imagePath });
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     res.status(500).json({ error: 'Failed to upload image' });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // Start the server
// // // // // // // // // // const PORT = 5001;
// // // // // // // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// // // // // // // // // require('dotenv').config();
// // // // // // // // // const express = require('express');
// // // // // // // // // const mongoose = require('mongoose');
// // // // // // // // // const bcrypt = require('bcryptjs');
// // // // // // // // // const jwt = require('jsonwebtoken');
// // // // // // // // // const multer = require('multer');
// // // // // // // // // const cors = require('cors');
// // // // // // // // // const fs = require('fs');
// // // // // // // // // const path = require('path');
// // // // // // // // // const User = require('./models/User');
// // // // // // // // // const Image = require('./models/Image');

// // // // // // // // // const app = express();

// // // // // // // // // // Enable CORS
// // // // // // // // // app.use(cors());

// // // // // // // // // // Middleware
// // // // // // // // // app.use(express.json());
// // // // // // // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // // // // // // MongoDB connection
// // // // // // // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // // // // // // //   useNewUrlParser: true,
// // // // // // // // //   useUnifiedTopology: true,
// // // // // // // // // })
// // // // // // // // //   .then(() => console.log('MongoDB connected'))
// // // // // // // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // // // // // // Multer configuration for local storage
// // // // // // // // // const storage = multer.diskStorage({
// // // // // // // // //   destination: (req, file, cb) => {
// // // // // // // // //     const uploadDir = path.join(__dirname, 'uploads');
// // // // // // // // //     if (!fs.existsSync(uploadDir)) {
// // // // // // // // //       fs.mkdirSync(uploadDir); // Ensure the upload directory exists
// // // // // // // // //     }
// // // // // // // // //     cb(null, uploadDir);
// // // // // // // // //   },
// // // // // // // // //   filename: (req, file, cb) => {
// // // // // // // // //     const uniqueName = `${Date.now()}-${file.originalname}`;
// // // // // // // // //     cb(null, uniqueName);
// // // // // // // // //   },
// // // // // // // // // });

// // // // // // // // // const upload = multer({ storage });

// // // // // // // // // // Routes

// // // // // // // // // // Signup Route
// // // // // // // // // app.post('/api/signup', async (req, res) => {
// // // // // // // // //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// // // // // // // // //   if (password !== confirmPassword) {
// // // // // // // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // // // // // // //   }

// // // // // // // // //   try {
// // // // // // // // //     const existingUser = await User.findOne({ email });
// // // // // // // // //     if (existingUser) {
// // // // // // // // //       return res.status(400).json({ message: 'Email already in use' });
// // // // // // // // //     }

// // // // // // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // // // // // //     const newUser = new User({
// // // // // // // // //       name,
// // // // // // // // //       email,
// // // // // // // // //       password: hashedPassword,
// // // // // // // // //       role,
// // // // // // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // // // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // // // // // //     });

// // // // // // // // //     await newUser.save();
// // // // // // // // //     res.status(201).json({ message: 'User registered successfully' });
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error(err);
// // // // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Login Route
// // // // // // // // // app.post('/api/login', async (req, res) => {
// // // // // // // // //   const { email, password } = req.body;

// // // // // // // // //   try {
// // // // // // // // //     const user = await User.findOne({ email });
// // // // // // // // //     if (!user) {
// // // // // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // // // // //     }

// // // // // // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // // // // // //     if (!isMatch) {
// // // // // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // // // // //     }

// // // // // // // // //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
// // // // // // // // //       expiresIn: '1h',
// // // // // // // // //     });

// // // // // // // // //     res.status(200).json({
// // // // // // // // //       name: user.name,
// // // // // // // // //       email: user.email,
// // // // // // // // //       role: user.role,
// // // // // // // // //       token,
// // // // // // // // //       patientId: user.patientId,
// // // // // // // // //       organizationName: user.organizationName,
// // // // // // // // //     });
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error('Error during login:', err);
// // // // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Fetch Patient IDs
// // // // // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const patients = await User.find({ role: 'patient' }, 'patientId');
// // // // // // // // //     res.status(200).json(patients);
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error('Error fetching patient IDs:', err);
// // // // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Upload Patient Image
// // // // // // // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // // // // // // //   const { patientId } = req.body;

// // // // // // // // //   if (!req.file) {
// // // // // // // // //     return res.status(400).json({ message: 'No file uploaded' });
// // // // // // // // //   }

// // // // // // // // //   try {
// // // // // // // // //     const imagePath = req.file.path;

// // // // // // // // //     // Verify if the patient exists
// // // // // // // // //     const patient = await User.findOne({ patientId, role: 'patient' });
// // // // // // // // //     if (!patient) {
// // // // // // // // //       fs.unlinkSync(imagePath); // Remove uploaded file if patient doesn't exist
// // // // // // // // //       return res.status(404).json({ message: 'Patient not found' });
// // // // // // // // //     }

// // // // // // // // //     const newImage = new Image({
// // // // // // // // //       patientId,
// // // // // // // // //       imageName: req.file.filename,
// // // // // // // // //       imagePath,
// // // // // // // // //       uploadedAt: new Date(),
// // // // // // // // //     });

// // // // // // // // //     await newImage.save();
// // // // // // // // //     res.status(201).json({ message: 'Image uploaded and details saved successfully' });
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error('Error uploading details:', err);
// // // // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Server
// // // // // // // // // const PORT = process.env.PORT || 5001;
// // // // // // // // // app.listen(PORT, () => {
// // // // // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // // // // });



// // // // // // // // // require('dotenv').config();
// // // // // // // // // const express = require('express');
// // // // // // // // // const mongoose = require('mongoose');
// // // // // // // // // const bcrypt = require('bcryptjs');
// // // // // // // // // const jwt = require('jsonwebtoken');
// // // // // // // // // const multer = require('multer');
// // // // // // // // // const cors = require('cors');
// // // // // // // // // const fs = require('fs');
// // // // // // // // // const path = require('path');
// // // // // // // // // const User = require('./models/User');
// // // // // // // // // const Image = require('./models/Image');

// // // // // // // // // const app = express();

// // // // // // // // // // Enable CORS
// // // // // // // // // app.use(cors());

// // // // // // // // // // Middleware
// // // // // // // // // app.use(express.json());
// // // // // // // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // // // // // // MongoDB connection
// // // // // // // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // // // // // // //   useNewUrlParser: true,
// // // // // // // // //   useUnifiedTopology: true,
// // // // // // // // // })
// // // // // // // // //   .then(() => console.log('MongoDB connected'))
// // // // // // // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // // // // // // Multer configuration for local storage
// // // // // // // // // const storage = multer.diskStorage({
// // // // // // // // //   destination: (req, file, cb) => {
// // // // // // // // //     const uploadDir = path.join(__dirname, 'uploads');
// // // // // // // // //     if (!fs.existsSync(uploadDir)) {
// // // // // // // // //       fs.mkdirSync(uploadDir); // Ensure the upload directory exists
// // // // // // // // //     }
// // // // // // // // //     cb(null, uploadDir);
// // // // // // // // //   },
// // // // // // // // //   filename: (req, file, cb) => {
// // // // // // // // //     const uniqueName = `${Date.now()}-${file.originalname}`;
// // // // // // // // //     cb(null, uniqueName);
// // // // // // // // //   },
// // // // // // // // // });

// // // // // // // // // const upload = multer({ storage });

// // // // // // // // // // Routes

// // // // // // // // // // Signup Route
// // // // // // // // // app.post('/api/signup', async (req, res) => {
// // // // // // // // //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// // // // // // // // //   if (password !== confirmPassword) {
// // // // // // // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // // // // // // //   }

// // // // // // // // //   try {
// // // // // // // // //     const existingUser = await User.findOne({ email });
// // // // // // // // //     if (existingUser) {
// // // // // // // // //       return res.status(400).json({ message: 'Email already in use' });
// // // // // // // // //     }

// // // // // // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // // // // // //     const newUser = new User({
// // // // // // // // //       name,
// // // // // // // // //       email,
// // // // // // // // //       password: hashedPassword,
// // // // // // // // //       role,
// // // // // // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // // // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // // // // // //     });

// // // // // // // // //     await newUser.save();
// // // // // // // // //     res.status(201).json({ message: 'User registered successfully' });
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error(err);
// // // // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Login Route
// // // // // // // // // app.post('/api/login', async (req, res) => {
// // // // // // // // //   const { email, password } = req.body;

// // // // // // // // //   try {
// // // // // // // // //     const user = await User.findOne({ email });
// // // // // // // // //     if (!user) {
// // // // // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // // // // //     }

// // // // // // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // // // // // //     if (!isMatch) {
// // // // // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // // // // //     }

// // // // // // // // //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
// // // // // // // // //       expiresIn: '1h',
// // // // // // // // //     });

// // // // // // // // //     res.status(200).json({
// // // // // // // // //       name: user.name,
// // // // // // // // //       email: user.email,
// // // // // // // // //       role: user.role,
// // // // // // // // //       token,
// // // // // // // // //       patientId: user.patientId,
// // // // // // // // //       organizationName: user.organizationName,
// // // // // // // // //     });
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error('Error during login:', err);
// // // // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Fetch Patient IDs
// // // // // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const patients = await User.find({ role: 'patient' }, 'patientId');
// // // // // // // // //     res.status(200).json(patients);
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error('Error fetching patient IDs:', err);
// // // // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Upload Patient Image
// // // // // // // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // // // // // // //   const { patientId } = req.body;

// // // // // // // // //   if (!req.file) {
// // // // // // // // //     return res.status(400).json({ message: 'No file uploaded' });
// // // // // // // // //   }

// // // // // // // // //   try {
// // // // // // // // //     const imagePath = req.file.path;

// // // // // // // // //     // Verify if the patient exists
// // // // // // // // //     const patient = await User.findOne({ patientId, role: 'patient' });
// // // // // // // // //     if (!patient) {
// // // // // // // // //       fs.unlinkSync(imagePath); // Remove uploaded file if patient doesn't exist
// // // // // // // // //       return res.status(404).json({ message: 'Patient not found' });
// // // // // // // // //     }

// // // // // // // // //     const newImage = new Image({
// // // // // // // // //       patientId,
// // // // // // // // //       imageName: req.file.filename,
// // // // // // // // //       imagePath,
// // // // // // // // //       uploadedAt: new Date(),
// // // // // // // // //     });

// // // // // // // // //     await newImage.save(); // Save image details to MongoDB
// // // // // // // // //     res.status(201).json({ message: 'Image uploaded and details saved successfully' });
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error('Error uploading details:', err);
// // // // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // // // //   }
// // // // // // // // // });

// // // // // // // // // // Server
// // // // // // // // // const PORT = process.env.PORT || 5001;
// // // // // // // // // app.listen(PORT, () => {
// // // // // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // // // // });
























// // // // // // // require('dotenv').config();
// // // // // // // const express = require('express');
// // // // // // // const mongoose = require('mongoose');
// // // // // // // const cors = require('cors');
// // // // // // // const bcrypt = require('bcryptjs');
// // // // // // // const jwt = require('jsonwebtoken');
// // // // // // // const multer = require('multer');
// // // // // // // const path = require('path');
// // // // // // // const User = require('./models/User');

// // // // // // // // Initialize express app
// // // // // // // const app = express();

// // // // // // // // Middleware
// // // // // // // app.use(cors());
// // // // // // // app.use(express.json());
// // // // // // // app.use('/uploads', express.static('uploads'));

// // // // // // // // MongoDB connection
// // // // // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // // // // //   useNewUrlParser: true,
// // // // // // //   useUnifiedTopology: true,
// // // // // // // })
// // // // // // //   .then(() => console.log('MongoDB connected'))
// // // // // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // // // // Patient schema for storing images
// // // // // // // const PatientSchema = new mongoose.Schema({
// // // // // // //   patientId: { type: String, required: true, unique: true },
// // // // // // //   images: [
// // // // // // //     {
// // // // // // //       imageName: { type: String, required: true },
// // // // // // //       imagePath: { type: String, required: true },
// // // // // // //       uploadDate: { type: Date, default: Date.now },
// // // // // // //     },
// // // // // // //   ],
// // // // // // // });

// // // // // // // const Patient = mongoose.model('Patient', PatientSchema);

// // // // // // // // Configure multer for file uploads
// // // // // // // const storage = multer.diskStorage({
// // // // // // //   destination: (req, file, cb) => {
// // // // // // //     cb(null, 'uploads'); // Directory to save uploaded files
// // // // // // //   },
// // // // // // //   filename: (req, file, cb) => {
// // // // // // //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// // // // // // //     cb(null, `${uniqueSuffix}-${file.originalname}`);
// // // // // // //   },
// // // // // // // });

// // // // // // // const upload = multer({ storage });

// // // // // // // // Signup Route
// // // // // // // app.post('/api/signup', async (req, res) => {
// // // // // // //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// // // // // // //   if (password !== confirmPassword) {
// // // // // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // // // // //   }

// // // // // // //   try {
// // // // // // //     // Check if the email is already registered
// // // // // // //     const existingUser = await User.findOne({ email });
// // // // // // //     if (existingUser) {
// // // // // // //       return res.status(400).json({ message: 'Email already in use' });
// // // // // // //     }

// // // // // // //     // Hash the password
// // // // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // // // //     // Create the new user
// // // // // // //     const newUser = new User({
// // // // // // //       name,
// // // // // // //       email,
// // // // // // //       password: hashedPassword,
// // // // // // //       role,
// // // // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // // // //     });

// // // // // // //     // Save the user to the database
// // // // // // //     await newUser.save();

// // // // // // //     // Send success response
// // // // // // //     res.status(201).json({ message: 'User registered successfully' });
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // //   }
// // // // // // // });

// // // // // // // // Login Route
// // // // // // // app.post('/api/login', async (req, res) => {
// // // // // // //   const { email, password } = req.body;

// // // // // // //   try {
// // // // // // //     // Find the user by email
// // // // // // //     const user = await User.findOne({ email });
// // // // // // //     if (!user) {
// // // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // // //     }

// // // // // // //     // Check if the password is correct
// // // // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // // // //     if (!isMatch) {
// // // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // // //     }

// // // // // // //     // Create a JWT token
// // // // // // //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
// // // // // // //       expiresIn: '1h',
// // // // // // //     });

// // // // // // //     // Send the token in the response
// // // // // // //     res.status(200).json({
// // // // // // //       name: user.name,
// // // // // // //       email: user.email,
// // // // // // //       role: user.role,
// // // // // // //       token,
// // // // // // //       patientId: user.patientId,
// // // // // // //       organizationName: user.organizationName,
// // // // // // //     });

// // // // // // //   } catch (err) {
// // // // // // //     console.error('Error during login:', err);
// // // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // // //   }
// // // // // // // });

// // // // // // // // Route to get all patient IDs
// // // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const patients = await Patient.find({}, 'patientId');
// // // // // // //     res.json(patients);
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).json({ message: 'Failed to fetch patient IDs' });
// // // // // // //   }
// // // // // // // });

// // // // // // // // Route to upload details (image)
// // // // // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // // // // //   const { patientId } = req.body;
// // // // // // //   const { filename, path: filePath } = req.file;

// // // // // // //   try {
// // // // // // //     // Check if patient exists
// // // // // // //     let patient = await Patient.findOne({ patientId });

// // // // // // //     if (!patient) {
// // // // // // //       // Create new patient entry if not exists
// // // // // // //       patient = new Patient({ patientId, images: [] });
// // // // // // //     }

// // // // // // //     // Add image details to the patient's record
// // // // // // //     patient.images.push({
// // // // // // //       imageName: filename,
// // // // // // //       imagePath: filePath,
// // // // // // //       uploadDate: new Date(),
// // // // // // //     });

// // // // // // //     // Save the updated patient document
// // // // // // //     await patient.save();

// // // // // // //     res.status(201).json({ message: 'Details uploaded successfully' });
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).json({ message: 'Failed to upload details' });
// // // // // // //   }
// // // // // // // });

// // // // // // // // Route to get all images for a specific patient
// // // // // // // app.get('/api/patient-images/:patientId', async (req, res) => {
// // // // // // //   const { patientId } = req.params;

// // // // // // //   try {
// // // // // // //     const patient = await Patient.findOne({ patientId });

// // // // // // //     if (!patient) {
// // // // // // //       return res.status(404).json({ message: 'Patient not found' });
// // // // // // //     }

// // // // // // //     res.json(patient.images);
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).json({ message: 'Failed to fetch patient images' });
// // // // // // //   }
// // // // // // // });

// // // // // // // // Route to fetch all patient IDs from the database
// // // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // // //   try {
// // // // // // //     // Fetch all distinct patient IDs
// // // // // // //     const patientIds = await Patient.find({}, 'patientId');
// // // // // // //     res.json(patientIds);
// // // // // // //   } catch (err) {
// // // // // // //     console.error(err);
// // // // // // //     res.status(500).json({ message: 'Failed to fetch patient IDs' });
// // // // // // //   }
// // // // // // // });


// // // // // // // const Patient = require('./models/Patient.js'); // Ensure the correct path to your model

// // // // // // // // Route to fetch all patient IDs
// // // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // // //   try {
// // // // // // //     const patients = await Patient.find({}, 'patientId'); // Fetch only `patientId` field
// // // // // // //     res.json(patients);
// // // // // // //   } catch (err) {
// // // // // // //     console.error('Error fetching patient IDs:', err);
// // // // // // //     res.status(500).json({ message: 'Failed to fetch patient IDs' });
// // // // // // //   }
// // // // // // // });



// // // // // // // // Start the server on port 5001
// // // // // // // const PORT = process.env.PORT || 5001;
// // // // // // // app.listen(PORT, () => {
// // // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // // });








// // // // // // require('dotenv').config();
// // // // // // const express = require('express');
// // // // // // const mongoose = require('mongoose');
// // // // // // const bcrypt = require('bcryptjs');
// // // // // // const jwt = require('jsonwebtoken');
// // // // // // const cors = require('cors'); // Import CORS
// // // // // // const User = require('./models/User');

// // // // // // const app = express();

// // // // // // // Enable CORS for all origins (you can customize this later)
// // // // // // app.use(cors());

// // // // // // // Middleware to parse JSON bodies
// // // // // // app.use(express.json());
// // // // // // // app.use('/uploads', express.static('uploads'));

// // // // // // // Connect to MongoDB
// // // // // // // mongoose.connect(process.env.MONGODB_URI, {
// // // // // // // mongoose.connect("mongodb+srv://sanjanathumpally:rootinc@sanjanaaa.ajf49.mongodb.net/", {
// // // // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // // // //   useNewUrlParser: true,
// // // // // //   useUnifiedTopology: true,
// // // // // // })
// // // // // //   .then(() => console.log('MongoDB connected'))
// // // // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // // // Signup Route
// // // // // // app.post('/api/signup', async (req, res) => {
// // // // // //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// // // // // //   if (password !== confirmPassword) {
// // // // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // // // //   }

// // // // // //   try {
// // // // // //     // Check if the email is already registered
// // // // // //     const existingUser = await User.findOne({ email });
// // // // // //     if (existingUser) {
// // // // // //       return res.status(400).json({ message: 'Email already in use' });
// // // // // //     }

// // // // // //     // Hash the password
// // // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // // //     // Create the new user
// // // // // //     const newUser = new User({
// // // // // //       name,
// // // // // //       email,
// // // // // //       password: hashedPassword,
// // // // // //       role,
// // // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
      
// // // // // //     });

// // // // // //     // Save the user to the database
// // // // // //     await newUser.save();

// // // // // //     // Send success response
// // // // // //     res.status(201).json({ message: 'User registered successfully' });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // //   }
// // // // // // });

// // // // // // // Login Route
// // // // // // app.post('/api/login', async (req, res) => {
// // // // // //   const { email, password } = req.body;

// // // // // //   try {
// // // // // //     console.log('Login request received:', req.body);  // Log the incoming request data

// // // // // //     // Find the user by email
// // // // // //     const user = await User.findOne({ email });
// // // // // //     if (!user) {
// // // // // //       console.log('User not found');  // Log when user is not found
// // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // //     }

// // // // // //     // Check if the password is correct
// // // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // // //     if (!isMatch) {
// // // // // //       console.log('Incorrect password');  // Log when password does not match
// // // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // // //     }

// // // // // //     // Create a JWT token
// // // // // //     // const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
// // // // // //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
// // // // // //       expiresIn: '1h',
// // // // // //     });

// // // // // //     // Send the token in the response
// // // // // //     res.status(200).json({
// // // // // //       name: user.name,
// // // // // //       email: user.email,
// // // // // //       role: user.role,
// // // // // //       token,
// // // // // //       patientId: user.patientId,
// // // // // //       organizationName: user.organizationName,
// // // // // //     });

// // // // // //   } catch (err) {
// // // // // //     console.error('Error during login:', err);  // Log the error if something goes wrong
// // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // //   }
// // // // // // });
// // // // // // app.get('/api/patientIds', async (req, res) => {
// // // // // //   try {
// // // // // //     const patients = await User.find({ role: 'patient' }).select('patientId -_id');
// // // // // //     if (!patients || patients.length === 0) {
// // // // // //       return res.status(404).json({ message: 'No patients found' });
// // // // // //     }
// // // // // //     const patientIds = patients.map(patient => patient.patientId);
// // // // // //     res.status(200).json(patientIds);
// // // // // //   } catch (err) {
// // // // // //     console.error('Error fetching patient IDs:', err);
// // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // //   }
// // // // // // });

// // // // // // const multer = require('multer');
// // // // // // const path = require('path');

// // // // // // // Configure Multer for file uploads
// // // // // // const storage = multer.diskStorage({
// // // // // //   destination: (req, file, cb) => {
// // // // // //     cb(null, './uploads');
// // // // // //   },
// // // // // //   filename: (req, file, cb) => {
// // // // // //     const uniqueName = `${Date.now()}-${file.originalname}`;
// // // // // //     cb(null, uniqueName);
// // // // // //   },
// // // // // // });
// // // // // // const upload = multer({ storage });

// // // // // // app.post('/api/uploadImage', upload.single('image'), async (req, res) => {
// // // // // //   const { patientId } = req.body;
// // // // // //   const { filename } = req.file;

// // // // // //   try {
// // // // // //     const user = await User.findOne({ patientId });
// // // // // //     if (!user) {
// // // // // //       return res.status(404).json({ message: 'Patient not found' });
// // // // // //     }

// // // // // //     const imagePath = path.join('uploads', filename);
// // // // // //     const newImage = {
// // // // // //       imageName: filename,
// // // // // //       imageId: filename,
// // // // // //       imagePath,
// // // // // //       uploadDate: new Date(),
// // // // // //     };

// // // // // //     user.imageData.push(newImage);
// // // // // //     await user.save();

// // // // // //     res.status(200).json({ message: 'Image uploaded successfully' });
// // // // // //   } catch (err) {
// // // // // //     console.error('Error uploading image:', err);
// // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // //   }
// // // // // // });


// // // // // // // Start the server on port 5001
// // // // // // const PORT = process.env.PORT || 5001;
// // // // // // app.listen(PORT, () => {
// // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // });











// // // // // const express = require('express');
// // // // // const mongoose = require('mongoose');
// // // // // const bcrypt = require('bcryptjs');
// // // // // const jwt = require('jsonwebtoken');
// // // // // const cors = require('cors');
// // // // // const multer = require('multer');
// // // // // const path = require('path');
// // // // // const User = require('./models/User');

// // // // // const app = express();
// // // // // app.use(cors());
// // // // // // const cors = require('cors');
// // // // // app.use(cors({
// // // // //   origin: process.env.FRONTENDURL,
// // // // // }));

// // // // // app.use(express.json());
// // // // // app.use('/uploads', express.static('uploads'));

// // // // // require('dotenv').config();
// // // // // console.log("Shashi")
// // // // // console.log("env : ",process.env.MONGODB_URI)
// // // // // // MongoDB Connection
// // // // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // // // mongoose.connect(process.env.MONGODB_URI, {
// // // // //   useNewUrlParser: true,
// // // // //   useUnifiedTopology: true,
// // // // // })
// // // // //   .then(() => console.log('MongoDB connected'))
// // // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // // Multer setup for file uploads
// // // // // const storage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     cb(null, 'uploads/');
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     cb(null, `${Date.now()}-${file.originalname}`);
// // // // //   },
// // // // // });
// // // // // const upload = multer({ storage });

// // // // // // Signup Route
// // // // // // app.post('/api/signup', async (req, res) => {
// // // // // //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// // // // // //   if (password !== confirmPassword) {
// // // // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // // // //   }

// // // // // //   try {
// // // // // //     const existingUser = await User.findOne({ email });
// // // // // //     if (existingUser) {
// // // // // //       return res.status(400).json({ message: 'Email already in use' });
// // // // // //     }

// // // // // //     const hashedPassword = await bcrypt.hash(password, 10);
// // // // // //     const newUser = new User({
// // // // // //       name,
// // // // // //       email,
// // // // // //       password: hashedPassword,
// // // // // //       role,
// // // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // // //     });

// // // // // //     await newUser.save();
// // // // // //     res.status(201).json({ message: 'User registered successfully' });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // //   }
// // // // // // });


// // // // // // Signup Route
// // // // // app.post('/api/signup', async (req, res) => {
// // // // //   const { name, email, role, patientId, organizationName, gender, dateOfBirth, referredDoctor } = req.body;

// // // // //   try {
// // // // //     const existingUser = await User.findOne({ email });
// // // // //     if (existingUser) {
// // // // //       return res.status(400).json({ message: 'Email already in use' });
// // // // //     }

// // // // //     const password = name;  // Default password is name
// // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // //     const newUser = new User({
// // // // //       name,
// // // // //       email,
// // // // //       password: hashedPassword,
// // // // //       role,
// // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // //       gender,
// // // // //       dateOfBirth,
// // // // //       referredDoctor,
// // // // //       role: role === 'patient' ? 'patient' : role,
// // // // //     });

// // // // //     await newUser.save();
// // // // //     res.status(201).json({ message: 'User registered successfully' });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // });


// // // // // // Login Route
// // // // // app.post('/api/login', async (req, res) => {
// // // // //   const { email, password } = req.body;

// // // // //   try {
// // // // //     const user = await User.findOne({ email });
// // // // //     if (!user) {
// // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // //     }

// // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // //     if (!isMatch) {
// // // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // // //     }

// // // // //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", { expiresIn: '1h' });

// // // // //     res.status(200).json({
// // // // //       name: user.name,
// // // // //       email: user.email,
// // // // //       role: user.role,
// // // // //       token,
// // // // //       patientId: user.patientId,
// // // // //       organizationName: user.organizationName,
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error('Error during login:', err);
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // Route to fetch all patient IDs
// // // // // app.get('/api/patients', async (req, res) => {
// // // // //   try {
// // // // //     const patients = await User.find({ role: 'patient' }); // Fetch all fields
// // // // //     if (!patients.length) {
// // // // //       return res.status(404).json({ message: 'No patients found' });
// // // // //     }
// // // // //     res.status(200).json(patients); // Return the full patient objects
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // });


// // // // // app.get('/api/images', async (req, res) => {
// // // // //   try {
// // // // //     const usersWithImages = await User.find({ 'imageData.0': { $exists: true } }, 'patientId imageData');
// // // // //     const images = usersWithImages.flatMap((user) =>
// // // // //       user.imageData.map((img) => ({
// // // // //         patientId: user.patientId,
// // // // //         imageName: img.imageName,
// // // // //         imagePath: img.imagePath,
// // // // //         uploadDate: img.uploadDate,
// // // // //       }))
// // // // //     );
// // // // //     res.status(200).json(images);
// // // // //   } catch (err) {
// // // // //     console.error('Error fetching images:', err);
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // });


// // // // // app.post('/api/upload', upload.single('image'), async (req, res) => {
// // // // //   const { patientId, organizationName } = req.body; // Destructure organizationName from the request body
// // // // //   const imagePath = req.file.path;

// // // // //   try {
// // // // //     await User.updateOne(
// // // // //       { patientId },
// // // // //       {
// // // // //         $push: {
// // // // //           imageData: {
// // // // //             organizationName, // Save organization name
// // // // //             imageName: req.file.originalname,
// // // // //             imagePath,
// // // // //             uploadDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
// // // // //           },
// // // // //         },
// // // // //       }
// // // // //     );

// // // // //     res.status(200).json({ message: 'Image uploaded successfully' });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // });


// // // // // // Add New Patient Route
// // // // // app.post('/api/addPatient', async (req, res) => {
// // // // //   const { name, email, password, confirmPassword, role, patientId, organizationName, age, gender, dateOfBirth, referredDoctor } = req.body;

// // // // //   if (password !== confirmPassword) {
// // // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // // //   }

// // // // //   try {
// // // // //     const existingUser = await User.findOne({ email });
// // // // //     if (existingUser) {
// // // // //       return res.status(400).json({ message: 'Email already in use' });
// // // // //     }

// // // // //     const hashedPassword = await bcrypt.hash(password, 10);
// // // // //     const newUser = new User({
// // // // //       name,
// // // // //       email,
// // // // //       password: hashedPassword,
// // // // //       role,
// // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // //       age,
// // // // //       gender,
// // // // //       dateOfBirth,
// // // // //       referredDoctor,
// // // // //     });

// // // // //     await newUser.save();
// // // // //     res.status(201).json({ message: 'Patient added successfully' });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // });

// // // // // // Existing Patient Update Route for Image Upload
// // // // // app.post('/api/uploadExistingPatientImage', upload.single('image'), async (req, res) => {
// // // // //   const { patientId } = req.body; // Destructure patientId from the request body
// // // // //   const imagePath = req.file.path;

// // // // //   try {
// // // // //     const patient = await User.findOne({ patientId });
// // // // //     if (!patient) {
// // // // //       return res.status(404).json({ message: 'Patient not found' });
// // // // //     }

// // // // //     // Add the new image to the patient's imageData array
// // // // //     patient.imageData.push({
// // // // //       organizationName: req.body.organizationName,
// // // // //       imageName: req.file.originalname,
// // // // //       imagePath,
// // // // //       uploadDate: new Date(),
// // // // //     });

// // // // //     await patient.save();

// // // // //     res.status(200).json({ message: 'Image uploaded successfully' });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // });


// // // // // // Route to update image path in imageData array
// // // // // app.put('/api/users/:id', async (req, res) => {
// // // // //   const { imageData } = req.body; // Only the imageData field will be updated

// // // // //   try {
// // // // //     // Find the user and update the imageData
// // // // //     const updatedUser = await User.findByIdAndUpdate(
// // // // //       req.params.id,
// // // // //       {
// // // // //         $set: {
// // // // //           "imageData": imageData, // Update the image data with new path
// // // // //         },
// // // // //       },
// // // // //       { new: true }
// // // // //     );

// // // // //     if (!updatedUser) {
// // // // //       return res.status(404).json({ message: 'User not found' });
// // // // //     }

// // // // //     res.status(200).json(updatedUser);
// // // // //   } catch (err) {
// // // // //     console.error('Error updating image path:', err);
// // // // //     res.status(500).json({ message: 'Server error' });
// // // // //   }
// // // // // });



// // // // // // Start the server
// // // // // const PORT = process.env.PORT || 5001;
// // // // // app.listen(PORT, () => {
// // // // //   console.log(`Server running on port ${PORT}`);
// // // // // });







// // // // const express = require('express');
// // // // const mongoose = require('mongoose');
// // // // const bcrypt = require('bcryptjs');
// // // // const jwt = require('jsonwebtoken');
// // // // const cors = require('cors');
// // // // const multer = require('multer');
// // // // const path = require('path');
// // // // const User = require('./models/User');

// // // // const app = express();
// // // // app.use(cors());

// // // // // Use environment variable for frontend URL
// // // // app.use(cors({
// // // //   origin: process.env.FRONTENDURL,
// // // // }));

// // // // app.use(express.json());
// // // // app.use('/uploads', express.static('backend/uploads'));
// // // // const dotenv = require('dotenv')
// // // // dotenv.config({path:"backend/.env"});

// // // // // require('dotenv').config();
// // // // console.log("Shashi")
// // // // console.log("env : ", process.env.MONGODB_URI);
// // // // mongoose.connect(process.env.MONGODB_URI);
// // // // // MongoDB Connection
// // // // mongoose.connect(process.env.MONGODB_URI, {
// // // //   useCreateIndex: true,
// // // //   useNewUrlParser: true,
// // // //   useUnifiedTopology: true,
// // // // })
// // // //   .then(() => console.log('MongoDB connected'))
// // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // Multer setup for file uploads
// // // // const storage = multer.diskStorage({
// // // //   destination: (req, file, cb) => {
// // // //     cb(null, 'uploads/');
// // // //   },
// // // //   filename: (req, file, cb) => {
// // // //     cb(null, `${Date.now()}-${file.originalname}`);
// // // //   },
// // // // });
// // // // const upload = multer({ storage });

// // // // // Signup Route
// // // // app.post('/api/signup', async (req, res) => {
// // // //   const { name, email, role, patientId, organizationName, gender, dateOfBirth, referredDoctor } = req.body;

// // // //   try {
// // // //     // Check if the user already exists
// // // //     const existingUser = await User.findOne({ email });
// // // //     if (existingUser) {
// // // //       return res.status(400).json({ message: 'Email already in use' });
// // // //     }

// // // //     // Default password is the user's name for now
// // // //     const password = name;  
// // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // //     // Create the new user
// // // //     const newUser = new User({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //       role,
// // // //       patientId: role === 'patient' ? patientId : undefined,  // Patient-specific field
// // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,  // Medical staff-specific field
// // // //       gender: role === 'patient' ? gender : undefined,  // Only for patients
// // // //       dateOfBirth: role === 'patient' ? dateOfBirth : undefined,  // Only for patients
// // // //       referredDoctor: role === 'patient' ? referredDoctor : undefined,  // Only for patients
// // // //     });

// // // //     // Save the new user to the database
// // // //     await newUser.save();
// // // //     res.status(201).json({ message: 'User registered successfully' });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Login Route
// // // // app.post('/api/login', async (req, res) => {
// // // //   const { email, password } = req.body;

// // // //   try {
// // // //     const user = await User.findOne({ email });
// // // //     if (!user) {
// // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // //     }

// // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // //     if (!isMatch) {
// // // //       return res.status(400).json({ message: 'Invalid email or password' });
// // // //     }

// // // //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", { expiresIn: '1h' });

// // // //     res.status(200).json({
// // // //       name: user.name,
// // // //       email: user.email,
// // // //       role: user.role,
// // // //       token,
// // // //       patientId: user.patientId,
// // // //       organizationName: user.organizationName,
// // // //     });
// // // //   } catch (err) {
// // // //     console.error('Error during login:', err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Route to fetch all patient IDs
// // // // app.get('/api/patients', async (req, res) => {
// // // //   try {
// // // //     const patients = await User.find({ role: 'patient' }); // Fetch all fields for patients
// // // //     if (!patients.length) {
// // // //       return res.status(404).json({ message: 'No patients found' });
// // // //     }
// // // //     res.status(200).json(patients);  // Return the full patient objects
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Route to upload images for patients
// // // // app.post('/api/upload', upload.single('image'), async (req, res) => {
// // // //   const { patientId, organizationName } = req.body;  // Destructure organizationName from the request body
// // // //   const imagePath = req.file.path;

// // // //   try {
// // // //     // Update the user's image data
// // // //     await User.updateOne(
// // // //       { patientId },
// // // //       {
// // // //         $push: {
// // // //           imageData: {
// // // //             organizationName,  // Save organization name
// // // //             imageName: req.file.originalname,
// // // //             imagePath,
// // // //             uploadDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
// // // //           },
// // // //         },
// // // //       }
// // // //     );

// // // //     res.status(200).json({ message: 'Image uploaded successfully' });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Add New Patient Route
// // // // app.post('/api/addPatient', async (req, res) => {
// // // //   const { name, email, password, confirmPassword, role, patientId, organizationName, age, gender, dateOfBirth, referredDoctor } = req.body;

// // // //   // Ensure passwords match
// // // //   if (password !== confirmPassword) {
// // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // //   }

// // // //   try {
// // // //     // Check if the email already exists
// // // //     const existingUser = await User.findOne({ email });
// // // //     if (existingUser) {
// // // //       return res.status(400).json({ message: 'Email already in use' });
// // // //     }

// // // //     const hashedPassword = await bcrypt.hash(password, 10);
// // // //     const newUser = new User({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //       role,
// // // //       patientId: role === 'patient' ? patientId : undefined,
// // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // //       age,
// // // //       gender: role === 'patient' ? gender : undefined,  // Only for patients
// // // //       dateOfBirth: role === 'patient' ? dateOfBirth : undefined,  // Only for patients
// // // //       referredDoctor: role === 'patient' ? referredDoctor : undefined,  // Only for patients
// // // //     });

// // // //     // Save the new user to the database
// // // //     await newUser.save();
// // // //     res.status(201).json({ message: 'Patient added successfully' });
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Route to update image path in imageData array
// // // // app.put('/api/users/:id', async (req, res) => {
// // // //   const { imageData } = req.body; // Only the imageData field will be updated

// // // //   try {
// // // //     // Find the user and update the imageData
// // // //     const updatedUser = await User.findByIdAndUpdate(
// // // //       req.params.id,
// // // //       {
// // // //         $set: {
// // // //           "imageData": imageData, // Update the image data with new path
// // // //         },
// // // //       },
// // // //       { new: true }
// // // //     );

// // // //     if (!updatedUser) {
// // // //       return res.status(404).json({ message: 'User not found' });
// // // //     }

// // // //     res.status(200).json(updatedUser);
// // // //   } catch (err) {
// // // //     console.error('Error updating image path:', err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Start the server
// // // // const PORT = process.env.PORT || 5001;
// // // // app.listen(PORT, () => {
// // // //   console.log(`Server running on port ${PORT}`);
// // // // });



// // // // server.js
// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const bcrypt = require('bcryptjs');
// // // const jwt = require('jsonwebtoken');
// // // const cors = require('cors');
// // // const multer = require('multer');
// // // const path = require('path');
// // // const User = require('./models/User'); // Make sure path is correct

// // // const app = express();

// // // // --- Environment Variables ---
// // // const dotenv = require('dotenv');
// // // // Ensure the path to your .env file is correct relative to where you run node
// // // dotenv.config({ path: path.resolve(__dirname, '.env') }); // Use absolute path for reliability

// // // // --- Middleware ---
// // // // Allow requests from specific origin
// // // app.use(cors({
// // //     origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use env var or default
// // //     credentials: true // If you need cookies/authorization headers
// // // }));

// // // app.use(express.json()); // For parsing application/json
// // // // Serve static files from the 'uploads' directory
// // // // The path should be relative to where server.js is located, or use an absolute path.
// // // // Assuming 'uploads' is directly inside the 'backend' folder, and server.js is in 'backend'.
// // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // --- MongoDB Connection ---
// // // const mongoUri = process.env.MONGODB_URI;
// // // if (!mongoUri) {
// // //     console.error("FATAL ERROR: MONGODB_URI environment variable is not set.");
// // //     process.exit(1); // Exit if DB connection string is missing
// // // }
// // // mongoose.connect(mongoUri, {
// // //     // Remove deprecated options: useCreateIndex, useNewUrlParser, useUnifiedTopology
// // //     // Mongoose 6+ handles these automatically
// // // })
// // //     .then(() => console.log('MongoDB connected successfully'))
// // //     .catch(err => {
// // //         console.error('MongoDB connection error:', err);
// // //         process.exit(1); // Exit if DB connection fails
// // //     });

// // // // --- Multer Setup (File Uploads) ---
// // // const storage = multer.diskStorage({
// // //     destination: (req, file, cb) => {
// // //         const uploadPath = path.join(__dirname, 'uploads'); // Ensure this path exists
// // //         // You might want to create the directory if it doesn't exist:
// // //         // const fs = require('fs');
// // //         // if (!fs.existsSync(uploadPath)) {
// // //         //   fs.mkdirSync(uploadPath, { recursive: true });
// // //         // }
// // //         cb(null, uploadPath);
// // //     },
// // //     filename: (req, file, cb) => {
// // //         // Sanitize filename or use a unique ID
// // //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// // //         cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_')); // Replace spaces
// // //     },
// // // });
// // // const upload = multer({
// // //     storage: storage,
// // //     limits: { fileSize: 10 * 1024 * 1024 } // Example: Limit file size to 10MB
// // // });

// // // // --- JWT Secret ---
// // // const jwtSecret = process.env.JWT_SECRET;
// // // if (!jwtSecret) {
// // //     console.error("FATAL ERROR: JWT_SECRET environment variable is not set.");
// // //     process.exit(1);
// // // }

// // // // --- API Routes ---

// // // // Signup Route (Consider separating routes into different files for larger apps)
// // // app.post('/api/signup', async (req, res) => {
// // //     const { name, email, role, password, /* remove confirmPassword if not needed here */ patientId, organizationName, gender, dateOfBirth, referredDoctor } = req.body;

// // //     // Basic Validation
// // //     if (!name || !email || !password || !role) {
// // //         return res.status(400).json({ message: 'Missing required fields' });
// // //     }
// // //     if (role === 'patient' && !patientId) {
// // //         return res.status(400).json({ message: 'Patient ID is required for patient role' });
// // //     }
// // //     // Add more validation as needed (email format, password strength)

// // //     try {
// // //         const existingUser = await User.findOne({ email });
// // //         if (existingUser) {
// // //             return res.status(400).json({ message: 'Email already in use' });
// // //         }
// // //         if (role === 'patient') {
// // //             const existingPatient = await User.findOne({ patientId });
// // //             if (existingPatient) {
// // //                 return res.status(400).json({ message: 'Patient ID already exists' });
// // //             }
// // //         }

// // //         const hashedPassword = await bcrypt.hash(password, 10);

// // //         const newUser = new User({
// // //             name,
// // //             email,
// // //             password: hashedPassword,
// // //             role,
// // //             // Conditionally add fields based on role
// // //             patientId: role === 'patient' ? patientId : undefined,
// // //             organizationName: organizationName, // Store org name for all roles? Or only specific ones?
// // //             gender: role === 'patient' ? gender : undefined,
// // //             dateOfBirth: role === 'patient' ? dateOfBirth : undefined,
// // //             referredDoctor: role === 'patient' ? referredDoctor : undefined,
// // //             imageData: [], // Initialize as empty array
// // //             chatHistory: [], // Initialize as empty array
// // //         });

// // //         await newUser.save();
// // //         res.status(201).json({ message: 'User registered successfully' });

// // //     } catch (err) {
// // //         console.error("Signup Error:", err);
// // //         res.status(500).json({ message: 'Server error during registration' });
// // //     }
// // // });

// // // // Login Route
// // // app.post('/api/login', async (req, res) => {
// // //     const { email, password } = req.body;

// // //     if (!email || !password) {
// // //         return res.status(400).json({ message: 'Email and password are required' });
// // //     }

// // //     try {
// // //         const user = await User.findOne({ email });
// // //         if (!user) {
// // //             return res.status(401).json({ message: 'Invalid credentials' }); // More generic error
// // //         }

// // //         const isMatch = await bcrypt.compare(password, user.password);
// // //         if (!isMatch) {
// // //             return res.status(401).json({ message: 'Invalid credentials' });
// // //         }

// // //         // Generate JWT Token
// // //         const payload = {
// // //             userId: user._id,
// // //             role: user.role,
// // //             name: user.name,
// // //             // Add other non-sensitive info if needed in token, but keep it minimal
// // //         };
// // //         const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Use environment variable for secret

// // //         // Send back user info (excluding password) and token
// // //         res.status(200).json({
// // //             token,
// // //             user: { // Nest user info
// // //                 _id: user._id,
// // //                 name: user.name,
// // //                 email: user.email,
// // //                 role: user.role,
// // //                 patientId: user.patientId,
// // //                 organizationName: user.organizationName,
// // //                 // Add other fields needed by frontend, excluding sensitive ones
// // //             }
// // //         });

// // //     } catch (err) {
// // //         console.error('Login Error:', err);
// // //         res.status(500).json({ message: 'Server error during login' });
// // //     }
// // // });

// // // // Get All Patients Route
// // // app.get('/api/patients', async (req, res) => {
// // //     // Add authentication middleware here later to protect this route
// // //     try {
// // //         // Fetch patients, potentially excluding password field
// // //         const patients = await User.find({ role: 'patient' }).select('-password'); // Exclude password

// // //         if (!patients || patients.length === 0) {
// // //             // Return empty array instead of 404 if no patients is a valid state
// // //             return res.status(200).json([]);
// // //         }
// // //         res.status(200).json(patients); // Return the patient objects (now including imageData with predictions)

// // //     } catch (err) {
// // //         console.error("Error fetching patients:", err);
// // //         res.status(500).json({ message: 'Server error fetching patients' });
// // //     }
// // // });

// // // // Upload Image Route
// // // app.post('/api/upload', upload.single('image'), async (req, res) => {
// // //     // Add authentication/authorization middleware
// // //     const { patientId, organizationName } = req.body;

// // //     if (!req.file) {
// // //         return res.status(400).json({ message: 'No image file provided' });
// // //     }
// // //     if (!patientId) {
// // //         return res.status(400).json({ message: 'Patient ID is required' });
// // //     }

// // //     // Construct the path as it will be served (relative to the '/uploads' static route)
// // //     const servedImagePath = `uploads/${req.file.filename}`;

// // //     try {
// // //         const updateResult = await User.updateOne(
// // //             { patientId: patientId, role: 'patient' }, // Ensure we only update patients
// // //             {
// // //                 $push: {
// // //                     imageData: {
// // //                         organizationName: organizationName || 'Unknown Org', // Handle missing org name
// // //                         imageName: req.file.originalname,
// // //                         imagePath: servedImagePath, // Store the path as served
// // //                         uploadDate: new Date(),
// // //                         // prediction field is not set here, will be updated later
// // //                     },
// // //                 },
// // //             }
// // //         );

// // //         if (updateResult.matchedCount === 0) {
// // //             // If no patient found with that ID, clean up the uploaded file
// // //             const fs = require('fs').promises;
// // //             try {
// // //                 await fs.unlink(req.file.path); // Delete the orphaned file
// // //                 console.log(`Cleaned up orphaned upload: ${req.file.path}`);
// // //             } catch (unlinkErr) {
// // //                 console.error(`Error cleaning up orphaned file ${req.file.path}:`, unlinkErr);
// // //             }
// // //             return res.status(404).json({ message: 'Patient not found' });
// // //         }

// // //         if (updateResult.modifiedCount === 0) {
// // //             // This might happen in rare cases, treat as potential issue or success
// // //              console.warn(`Image upload processed for patient ${patientId}, but modifiedCount was 0.`);
// // //         }

// // //         res.status(200).json({ message: 'Image uploaded successfully', filePath: servedImagePath });

// // //     } catch (err) {
// // //         console.error("Image Upload Error:", err);
// // //         // Clean up uploaded file on error if it exists
// // //          if (req.file && req.file.path) {
// // //             const fs = require('fs').promises;
// // //             try {
// // //                 await fs.unlink(req.file.path);
// // //             } catch (unlinkErr) {
// // //                  console.error(`Error cleaning up file ${req.file.path} after upload error:`, unlinkErr);
// // //             }
// // //         }
// // //         res.status(500).json({ message: 'Server error during image upload' });
// // //     }
// // // });

// // // // --- NEW ROUTE: Update Prediction for a Specific Image ---
// // // app.put('/api/patients/:patientId/images/:imageId/predict', async (req, res) => {
// // //     // Add authentication/authorization middleware
// // //     const { patientId, imageId } = req.params;
// // //     const { prediction } = req.body;

// // //     if (!prediction) {
// // //         return res.status(400).json({ message: 'Prediction result is required' });
// // //     }
// // //     if (!mongoose.Types.ObjectId.isValid(imageId)) {
// // //          return res.status(400).json({ message: 'Invalid image ID format' });
// // //     }

// // //     try {
// // //         const updateResult = await User.updateOne(
// // //             // Match the patient and the specific image element within the imageData array
// // //             { patientId: patientId, "imageData._id": new mongoose.Types.ObjectId(imageId) },
// // //             // Set the prediction field for the matched array element ($)
// // //             { $set: { "imageData.$.prediction": prediction } }
// // //         );

// // //         if (updateResult.matchedCount === 0) {
// // //             // Either patient not found or image with that _id not found for that patient
// // //             return res.status(404).json({ message: 'Patient or specific image not found' });
// // //         }

// // //         if (updateResult.modifiedCount === 0) {
// // //             // The prediction was likely already set to this value
// // //             console.log(`Prediction for patient ${patientId}, image ${imageId} was already set to "${prediction}".`);
// // //             // Still return success as the state is consistent
// // //             return res.status(200).json({ message: 'Prediction is already set to this value' });
// // //         }

// // //         console.log(`Prediction updated for patient ${patientId}, image ${imageId}`);
// // //         res.status(200).json({ message: 'Prediction updated successfully' });

// // //     } catch (err) {
// // //         console.error(`Error updating prediction for patient ${patientId}, image ${imageId}:`, err);
// // //         res.status(500).json({ message: 'Server error updating prediction' });
// // //     }
// // // });


// // // // --- Deprecated/Redundant Routes (Review if needed) ---
// // // // This route seems redundant if /api/signup handles patient creation
// // // /*
// // // app.post('/api/addPatient', async (req, res) => {
// // //   // ... implementation ... (Likely covered by /api/signup)
// // // });
// // // */

// // // // This route updates the *entire* imageData array, which is usually not what you want.
// // // // Prefer adding images via /api/upload and updating predictions via the new PUT route.
// // // /*
// // // app.put('/api/users/:id', async (req, res) => {
// // //   // ... implementation ... (Potentially dangerous route)
// // // });
// // // */

// // // // --- Server Start ---
// // // const PORT = process.env.PORT || 5001;
// // // app.listen(PORT, '0.0.0.0', () => { // Listen on all available network interfaces
// // //     console.log(`Server running on port ${PORT}`);
// // //     console.log(`Accessible at: http://localhost:${PORT} and potentially http://<your-ip-address>:${PORT}`);
// // //     console.log(`Expecting frontend requests from: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
// // //     console.log(`Serving static files from: ${path.join(__dirname, 'uploads')}`);
// // // });

// // // // --- Graceful Shutdown (Optional but Recommended) ---
// // // process.on('SIGINT', async () => {
// // //     console.log('SIGINT signal received: closing MongoDB connection...');
// // //     await mongoose.connection.close(false); // false = don't force close immediately
// // //     console.log('MongoDB connection closed. Exiting.');
// // //     process.exit(0);
// // // });

// // // process.on('SIGTERM', async () => {
// // //     console.log('SIGTERM signal received: closing MongoDB connection...');
// // //     await mongoose.connection.close(false);
// // //     console.log('MongoDB connection closed. Exiting.');
// // //     process.exit(0);
// // // });





// // // server.js
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const cors = require('cors');
// // const multer = require('multer');
// // const path = require('path');
// // const fs = require('fs'); // Import fs for directory check
// // const User = require('./models/User'); // Make sure path is correct

// // const app = express();

// // // --- Environment Variables ---
// // const dotenv = require('dotenv');
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// // // --- Middleware ---
// // app.use(cors({
// //     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
// //     credentials: true
// // }));
// // app.use(express.json());

// // // --- Static Files ---
// // const uploadsDir = path.join(__dirname, 'uploads');
// // // Ensure uploads directory exists
// // if (!fs.existsSync(uploadsDir)) {
// //     console.log(`Creating uploads directory at: ${uploadsDir}`);
// //     fs.mkdirSync(uploadsDir, { recursive: true });
// // }
// // app.use('/uploads', express.static(uploadsDir));
// // console.log(`Serving static files from: ${uploadsDir}`);


// // // --- MongoDB Connection ---
// // const mongoUri = process.env.MONGODB_URI;
// // if (!mongoUri) {
// //     console.error("FATAL ERROR: MONGODB_URI environment variable is not set.");
// //     process.exit(1);
// // }
// // mongoose.connect(mongoUri)
// //     .then(() => console.log('MongoDB connected successfully'))
// //     .catch(err => {
// //         console.error('MongoDB connection error:', err);
// //         process.exit(1);
// //     });

// // // --- Multer Setup (File Uploads) ---
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, uploadsDir); // Use the validated uploads directory path
// //     },
// //     filename: (req, file, cb) => {
// //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //         cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
// //     },
// // });
// // const upload = multer({
// //     storage: storage,
// //     limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
// // });

// // // --- JWT Secret ---
// // const jwtSecret = process.env.JWT_SECRET;
// // if (!jwtSecret) {
// //     console.error("FATAL ERROR: JWT_SECRET environment variable is not set.");
// //     process.exit(1);
// // }

// // // --- Authentication Middleware (Example - Apply where needed) ---
// // const authenticateToken = (req, res, next) => {
// //     const authHeader = req.headers['authorization'];
// //     const token = authHeader && authHeader.split(' ')[1];

// //     if (token == null) return res.sendStatus(401); // if there isn't any token

// //     jwt.verify(token, jwtSecret, (err, user) => {
// //         if (err) {
// //             console.error("JWT Verification Error:", err.message);
// //             return res.sendStatus(403); // Forbidden (invalid token)
// //         }
// //         req.user = user; // Add decoded user payload to request object
// //         next();
// //     });
// // };

// // // --- API Routes ---

// // // Signup Route
// // app.post('/api/signup', async (req, res) => {
// //     const { name, email, role, password, patientId, organizationName, gender, dateOfBirth, referredDoctor } = req.body;

// //     // Basic Validation
// //     if (!name || !email || !password || !role) {
// //         return res.status(400).json({ message: 'Missing required fields (name, email, password, role)' });
// //     }
// //     if (role === 'patient' && !patientId) {
// //         return res.status(400).json({ message: 'Patient ID is required for patient role' });
// //     }
// //     // Add stricter validation (email format, password strength, date format etc.)

// //     try {
// //         const existingUser = await User.findOne({ email });
// //         if (existingUser) {
// //             return res.status(400).json({ message: 'Email already in use' });
// //         }
// //         if (role === 'patient') {
// //             const existingPatient = await User.findOne({ patientId });
// //             if (existingPatient) {
// //                 return res.status(400).json({ message: 'Patient ID already exists' });
// //             }
// //         }

// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         const newUser = new User({
// //             name,
// //             email,
// //             password: hashedPassword,
// //             role,
// //             patientId: role === 'patient' ? patientId : undefined,
// //             organizationName, // Store for all? Adjust if needed.
// //             gender: role === 'patient' ? gender : undefined,
// //             dateOfBirth: role === 'patient' ? dateOfBirth : undefined,
// //             referredDoctor: role === 'patient' ? referredDoctor : undefined,
// //             imageData: [],
// //             chatHistory: [],
// //         });

// //         await newUser.save();
// //         res.status(201).json({ message: 'User registered successfully' });

// //     } catch (err) {
// //         console.error("Signup Error:", err);
// //         if (err.name === 'ValidationError') {
// //             return res.status(400).json({ message: "Validation Error", errors: err.errors });
// //         }
// //         res.status(500).json({ message: 'Server error during registration' });
// //     }
// // });

// // // Login Route
// // app.post('/api/login', async (req, res) => {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //         return res.status(400).json({ message: 'Email and password are required' });
// //     }

// //     try {
// //         const user = await User.findOne({ email });
// //         if (!user) {
// //             return res.status(401).json({ message: 'Invalid credentials' });
// //         }

// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) {
// //             return res.status(401).json({ message: 'Invalid credentials' });
// //         }

// //         const payload = {
// //             userId: user._id,
// //             role: user.role,
// //             name: user.name,
// //         };
// //         const token = jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

// //         res.status(200).json({
// //             token,
// //             user: { // Send necessary user info, exclude password
// //                 _id: user._id,
// //                 name: user.name,
// //                 email: user.email,
// //                 role: user.role,
// //                 patientId: user.patientId,
// //                 organizationName: user.organizationName,
// //             }
// //         });

// //     } catch (err) {
// //         console.error('Login Error:', err);
// //         res.status(500).json({ message: 'Server error during login' });
// //     }
// // });

// // // Get All Patients Route
// // // TODO: Add authentication (e.g., ensure only admin/staff can access)
// // // app.get('/api/patients', authenticateToken, async (req, res) => { // Example with auth
// // app.get('/api/patients', async (req, res) => {
// //     // Optional: Check req.user.role if using authentication
// //     // if (req.user.role !== 'admin' && req.user.role !== 'staff') {
// //     //     return res.status(403).json({ message: 'Access forbidden: Insufficient privileges.' });
// //     // }
// //     try {
// //         const patients = await User.find({ role: 'patient' }).select('-password'); // Exclude password

// //         res.status(200).json(patients); // Return patients (empty array if none found)

// //     } catch (err) {
// //         console.error("Error fetching patients:", err);
// //         res.status(500).json({ message: 'Server error fetching patients' });
// //     }
// // });

// // // Upload Image Route
// // // TODO: Add authentication (e.g., ensure logged-in user can upload, maybe check role)
// // app.post('/api/upload', upload.single('image'), async (req, res) => {
// //     const { patientId, organizationName } = req.body;
// //     // Add validation: Ensure patientId exists and corresponds to a patient role user

// //     if (!req.file) {
// //         return res.status(400).json({ message: 'No image file provided' });
// //     }
// //     if (!patientId) {
// //         // Clean up uploaded file if patientId is missing
// //         fs.unlink(req.file.path, (err) => {
// //             if (err) console.error(`Error deleting orphaned file ${req.file.path}:`, err);
// //         });
// //         return res.status(400).json({ message: 'Patient ID is required' });
// //     }

// //     // Path relative to the '/uploads' static route
// //     // Ensure forward slashes for consistency, especially for URLs
// //     const servedImagePath = `uploads/${req.file.filename}`.replace(/\\/g, '/');

// //     try {
// //         const patient = await User.findOne({ patientId: patientId, role: 'patient' });

// //         if (!patient) {
// //             // If no patient found, clean up the uploaded file
// //             fs.unlink(req.file.path, (err) => {
// //                 if (err) console.error(`Error deleting orphaned file ${req.file.path}:`, err);
// //             });
// //             return res.status(404).json({ message: 'Patient not found' });
// //         }

// //         const newImageData = {
// //             // Mongoose will add _id automatically here
// //             organizationName: organizationName || 'Unknown Org',
// //             imageName: req.file.originalname,
// //             imagePath: servedImagePath, // Store the relative path
// //             uploadDate: new Date(),
// //             // prediction: undefined // Initialize prediction if needed
// //         };

// //         patient.imageData.push(newImageData);
// //         await patient.save();

// //         // Find the newly added image data to include its _id in the response if needed
// //         const addedImage = patient.imageData[patient.imageData.length - 1];

// //         res.status(200).json({
// //             message: 'Image uploaded successfully',
// //             filePath: servedImagePath,
// //             imageId: addedImage._id // Send back the ID of the created image subdocument
// //         });

// //     } catch (err) {
// //         console.error("Image Upload Error:", err);
// //         // Clean up uploaded file on error
// //         fs.unlink(req.file.path, (unlinkErr) => {
// //             if (unlinkErr) console.error(`Error deleting file ${req.file.path} after upload error:`, unlinkErr);
// //         });
// //         res.status(500).json({ message: 'Server error during image upload' });
// //     }
// // });

// // // Update Prediction for a Specific Image
// // // TODO: Add authentication
// // app.put('/api/patients/:patientId/images/:imageId/predict', async (req, res) => {
// //     const { patientId, imageId } = req.params;
// //     const { prediction } = req.body;

// //     if (!prediction) {
// //         return res.status(400).json({ message: 'Prediction result is required' });
// //     }
// //     if (!mongoose.Types.ObjectId.isValid(imageId)) {
// //         return res.status(400).json({ message: 'Invalid image ID format' });
// //     }

// //     try {
// //         const updateResult = await User.updateOne(
// //             // Use patientId for matching user, and imageId for matching subdocument
// //             { patientId: patientId, role: 'patient', "imageData._id": new mongoose.Types.ObjectId(imageId) },
// //             { $set: { "imageData.$.prediction": prediction } } // Update only the prediction of the matched image
// //         );

// //         if (updateResult.matchedCount === 0) {
// //             return res.status(404).json({ message: 'Patient or specific image not found' });
// //         }

// //         if (updateResult.modifiedCount === 0 && updateResult.matchedCount === 1) {
// //             // Found but not modified, maybe prediction was the same
// //              return res.status(200).json({ message: 'Prediction unchanged (already set to this value or no change needed)' });
// //         }

// //         console.log(`Prediction updated for patient ${patientId}, image ${imageId}`);
// //         // Optionally: Fetch and return the updated user document
// //          const updatedUser = await User.findOne({ patientId: patientId, role: 'patient' }).select('-password');
// //          res.status(200).json(updatedUser || { message: 'Prediction updated successfully' });


// //     } catch (err) {
// //         console.error(`Error updating prediction for patient ${patientId}, image ${imageId}:`, err);
// //         res.status(500).json({ message: 'Server error updating prediction' });
// //     }
// // });

// // // --- NEW ROUTE: Update Image Path for a Specific Image ---
// // // TODO: Add authentication (ensure user has permission to update)
// // app.put('/api/patients/:userId/images/:imageId/path', async (req, res) => {
// //     const { userId, imageId } = req.params;
// //     const { newImagePath } = req.body; // Expecting { "newImagePath": "new/path/to/image.jpg" }

// //     // Validation
// //     if (!newImagePath || typeof newImagePath !== 'string' || newImagePath.trim() === '') {
// //         return res.status(400).json({ message: 'New image path is required and must be a non-empty string' });
// //     }
// //     if (!mongoose.Types.ObjectId.isValid(userId)) {
// //          return res.status(400).json({ message: 'Invalid user ID format' });
// //     }
// //     if (!mongoose.Types.ObjectId.isValid(imageId)) {
// //         return res.status(400).json({ message: 'Invalid image ID format' });
// //     }

// //     // Consider adding validation for the path format if necessary (e.g., ensure it starts with 'uploads/')

// //     try {
// //         // Find the user and the specific image, then update the path
// //         const updateResult = await User.updateOne(
// //             {
// //                 _id: new mongoose.Types.ObjectId(userId),       // Match user by _id
// //                 role: 'patient',                               // Ensure it's a patient
// //                 "imageData._id": new mongoose.Types.ObjectId(imageId) // Match specific image in the array
// //             },
// //             {
// //                 $set: { "imageData.$.imagePath": newImagePath.trim() } // Update only the imagePath of the matched element ($)
// //             }
// //         );

// //         // Check if the update was successful
// //         if (updateResult.matchedCount === 0) {
// //             // No document matched the criteria (user not found, or image not found within that user)
// //             return res.status(404).json({ message: 'Patient or specific image not found' });
// //         }

// //         if (updateResult.modifiedCount === 0 && updateResult.matchedCount === 1) {
// //             // Document was found, but the path was not modified (it might be the same as the existing path)
// //             console.log(`Image path update requested for user ${userId}, image ${imageId}, but value was likely unchanged.`);
// //             // Still fetch and return the user data as the state is consistent
// //         } else {
// //             console.log(`Image path updated successfully for user ${userId}, image ${imageId}`);
// //         }

// //         // Fetch the updated user document to send back to the client
// //         const updatedUser = await User.findById(userId).select('-password'); // Exclude password
// //         if (!updatedUser) {
// //             // Should not happen if update succeeded, but handle defensively
// //              return res.status(404).json({ message: 'Updated user not found after update operation.' });
// //         }

// //         res.status(200).json(updatedUser); // Send the full updated user document back

// //     } catch (err) {
// //         console.error(`Error updating image path for user ${userId}, image ${imageId}:`, err);
// //         res.status(500).json({ message: 'Server error updating image path' });
// //     }
// // });
// // // --- END OF NEW ROUTE ---


// // // --- Deprecated/Redundant Routes Review ---
// // // Commented out PUT /api/users/:id as it's generally unsafe for partial updates like this.
// // /*
// // app.put('/api/users/:id', async (req, res) => {
// //   // This route is problematic for updating nested array elements specifically.
// //   // It's better to have dedicated routes like the one added above.
// //   console.warn("WARNING: The generic PUT /api/users/:id route was called. Consider using more specific endpoints.");
// //   // ... potentially dangerous implementation ...
// //   res.status(501).json({ message: "Route not implemented safely." });
// // });
// // */

// // // --- Server Start ---
// // const PORT = process.env.PORT || 5001;
// // app.listen(PORT, '0.0.0.0', () => {
// //     console.log(`------------------------------------------------------`);
// //     console.log(`Server running on port ${PORT}`);
// //     console.log(`Local access:   http://localhost:${PORT}`);
// //     // Find local IP for network access (optional)
// //     try {
// //         const { networkInterfaces } = require('os');
// //         const nets = networkInterfaces();
// //         for (const name of Object.keys(nets)) {
// //             for (const net of nets[name]) {
// //                 // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
// //                 if (net.family === 'IPv4' && !net.internal) {
// //                     console.log(`Network access: http://${net.address}:${PORT}`);
// //                     break; // Show first non-internal IPv4
// //                 }
// //             }
// //         }
// //     } catch(e) { console.log("Could not determine network IP.")}

// //     console.log(`Frontend URL:   ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
// //     console.log(`Static files:   ${uploadsDir}`);
// //     console.log(`------------------------------------------------------`);
// // });

// // // --- Graceful Shutdown ---
// // const gracefulShutdown = async (signal) => {
// //     console.log(`\n${signal} signal received: closing MongoDB connection...`);
// //     try {
// //         await mongoose.connection.close(false);
// //         console.log('MongoDB connection closed successfully.');
// //         process.exit(0);
// //     } catch (err) {
// //         console.error('Error closing MongoDB connection:', err);
// //         process.exit(1);
// //     }
// // };

// // process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// // process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));




// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs'); // Used for directory check and file deletion
// const User = require('./models/User'); // Make sure path is correct

// const app = express();

// // --- Environment Variables ---
// const dotenv = require('dotenv');
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// // --- Middleware ---
// app.use(cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//     credentials: true
// }));
// app.use(express.json());

// // --- Static Files ---
// const uploadsDir = path.join(__dirname, 'uploads');
// // Ensure uploads directory exists
// if (!fs.existsSync(uploadsDir)) {
//     console.log(`Creating uploads directory at: ${uploadsDir}`);
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }
// app.use('/uploads', express.static(uploadsDir));
// console.log(`Serving static files from: ${uploadsDir}`);


// // --- MongoDB Connection ---
// const mongoUri = process.env.MONGODB_URI;
// if (!mongoUri) {
//     console.error("FATAL ERROR: MONGODB_URI environment variable is not set.");
//     process.exit(1);
// }
// mongoose.connect(mongoUri)
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//         process.exit(1);
//     });

// // --- Multer Setup (File Uploads) ---
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsDir); // Use the validated uploads directory path
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
//     },
// });
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
// });

// // --- JWT Secret ---
// const jwtSecret = process.env.JWT_SECRET;
// if (!jwtSecret) {
//     console.error("FATAL ERROR: JWT_SECRET environment variable is not set.");
//     process.exit(1);
// }

// // --- Authentication Middleware (Example - Apply where needed) ---
// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) return res.sendStatus(401); // if there isn't any token

//     jwt.verify(token, jwtSecret, (err, user) => {
//         if (err) {
//             console.error("JWT Verification Error:", err.message);
//             return res.sendStatus(403); // Forbidden (invalid token)
//         }
//         req.user = user; // Add decoded user payload to request object
//         next();
//     });
// };

// // --- API Routes ---

// // Signup Route
// app.post('/api/signup', async (req, res) => {
//     const { name, email, role, password, patientId, organizationName, gender, dateOfBirth, referredDoctor } = req.body;

//     // Basic Validation
//     if (!name || !email || !password || !role) {
//         return res.status(400).json({ message: 'Missing required fields (name, email, password, role)' });
//     }
//     if (role === 'patient' && !patientId) {
//         return res.status(400).json({ message: 'Patient ID is required for patient role' });
//     }
//     // Add stricter validation (email format, password strength, date format etc.)

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already in use' });
//         }
//         if (role === 'patient') {
//             const existingPatient = await User.findOne({ patientId });
//             if (existingPatient) {
//                 return res.status(400).json({ message: 'Patient ID already exists' });
//             }
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role,
//             patientId: role === 'patient' ? patientId : undefined,
//             organizationName, // Store for all? Adjust if needed.
//             gender: role === 'patient' ? gender : undefined,
//             dateOfBirth: role === 'patient' ? dateOfBirth : undefined,
//             referredDoctor: role === 'patient' ? referredDoctor : undefined,
//             imageData: [],
//             chatHistory: [],
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });

//     } catch (err) {
//         console.error("Signup Error:", err);
//         if (err.name === 'ValidationError') {
//             return res.status(400).json({ message: "Validation Error", errors: err.errors });
//         }
//         res.status(500).json({ message: 'Server error during registration' });
//     }
// });

// // Login Route
// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const payload = {
//             userId: user._id,
//             role: user.role,
//             name: user.name,
//         };
//         const token = jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

//         res.status(200).json({
//             token,
//             user: { // Send necessary user info, exclude password
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 patientId: user.patientId,
//                 organizationName: user.organizationName,
//             }
//         });

//     } catch (err) {
//         console.error('Login Error:', err);
//         res.status(500).json({ message: 'Server error during login' });
//     }
// });

// // Get All Patients Route
// // TODO: Add authentication (e.g., ensure only admin/staff can access)
// // app.get('/api/patients', authenticateToken, async (req, res) => { // Example with auth
// app.get('/api/patients', async (req, res) => {
//     // Optional: Check req.user.role if using authentication
//     // if (req.user.role !== 'admin' && req.user.role !== 'staff') {
//     //     return res.status(403).json({ message: 'Access forbidden: Insufficient privileges.' });
//     // }
//     try {
//         const patients = await User.find({ role: 'patient' }).select('-password'); // Exclude password

//         res.status(200).json(patients); // Return patients (empty array if none found)

//     } catch (err) {
//         console.error("Error fetching patients:", err);
//         res.status(500).json({ message: 'Server error fetching patients' });
//     }
// });

// // Upload Image Route
// // TODO: Add authentication (e.g., ensure logged-in user can upload, maybe check role)
// app.post('/api/upload', upload.single('image'), async (req, res) => {
//     const { patientId, organizationName } = req.body;
//     // Add validation: Ensure patientId exists and corresponds to a patient role user

//     if (!req.file) {
//         return res.status(400).json({ message: 'No image file provided' });
//     }
//     if (!patientId) {
//         // Clean up uploaded file if patientId is missing
//         fs.unlink(req.file.path, (err) => {
//             if (err) console.error(`Error deleting orphaned file ${req.file.path}:`, err);
//         });
//         return res.status(400).json({ message: 'Patient ID is required' });
//     }

//     // Path relative to the '/uploads' static route
//     // Ensure forward slashes for consistency, especially for URLs
//     const servedImagePath = `uploads/${req.file.filename}`.replace(/\\/g, '/');

//     try {
//         const patient = await User.findOne({ patientId: patientId, role: 'patient' });

//         if (!patient) {
//             // If no patient found, clean up the uploaded file
//             fs.unlink(req.file.path, (err) => {
//                 if (err) console.error(`Error deleting orphaned file ${req.file.path}:`, err);
//             });
//             return res.status(404).json({ message: 'Patient not found' });
//         }

//         const newImageData = {
//             // Mongoose will add _id automatically here
//             organizationName: organizationName || 'Unknown Org',
//             imageName: req.file.originalname,
//             imagePath: servedImagePath, // Store the relative path
//             uploadDate: new Date(),
//             // prediction: undefined // Initialize prediction if needed
//         };

//         patient.imageData.push(newImageData);
//         await patient.save();

//         // Find the newly added image data to include its _id in the response if needed
//         const addedImage = patient.imageData[patient.imageData.length - 1];

//         res.status(200).json({
//             message: 'Image uploaded successfully',
//             filePath: servedImagePath,
//             imageId: addedImage._id // Send back the ID of the created image subdocument
//         });

//     } catch (err) {
//         console.error("Image Upload Error:", err);
//         // Clean up uploaded file on error
//         fs.unlink(req.file.path, (unlinkErr) => {
//             if (unlinkErr) console.error(`Error deleting file ${req.file.path} after upload error:`, unlinkErr);
//         });
//         res.status(500).json({ message: 'Server error during image upload' });
//     }
// });

// // Update Prediction for a Specific Image
// // TODO: Add authentication
// app.put('/api/patients/:patientId/images/:imageId/predict', async (req, res) => {
//     const { patientId, imageId } = req.params;
//     const { prediction } = req.body;

//     if (!prediction) {
//         return res.status(400).json({ message: 'Prediction result is required' });
//     }
//     if (!mongoose.Types.ObjectId.isValid(imageId)) {
//         return res.status(400).json({ message: 'Invalid image ID format' });
//     }

//     try {
//         const updateResult = await User.updateOne(
//             // Use patientId for matching user, and imageId for matching subdocument
//             { patientId: patientId, role: 'patient', "imageData._id": new mongoose.Types.ObjectId(imageId) },
//             { $set: { "imageData.$.prediction": prediction } } // Update only the prediction of the matched image
//         );

//         if (updateResult.matchedCount === 0) {
//             return res.status(404).json({ message: 'Patient or specific image not found' });
//         }

//         if (updateResult.modifiedCount === 0 && updateResult.matchedCount === 1) {
//             // Found but not modified, maybe prediction was the same
//              return res.status(200).json({ message: 'Prediction unchanged (already set to this value or no change needed)' });
//         }

//         console.log(`Prediction updated for patient ${patientId}, image ${imageId}`);
//         // Optionally: Fetch and return the updated user document
//          const updatedUser = await User.findOne({ patientId: patientId, role: 'patient' }).select('-password');
//          res.status(200).json(updatedUser || { message: 'Prediction updated successfully' });


//     } catch (err) {
//         console.error(`Error updating prediction for patient ${patientId}, image ${imageId}:`, err);
//         res.status(500).json({ message: 'Server error updating prediction' });
//     }
// });

// // Update Image Path for a Specific Image
// // TODO: Add authentication (ensure user has permission to update)
// app.put('/api/patients/:userId/images/:imageId/path', async (req, res) => {
//     const { userId, imageId } = req.params;
//     const { newImagePath } = req.body; // Expecting { "newImagePath": "new/path/to/image.jpg" }

//     // Validation
//     if (!newImagePath || typeof newImagePath !== 'string' || newImagePath.trim() === '') {
//         return res.status(400).json({ message: 'New image path is required and must be a non-empty string' });
//     }
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//          return res.status(400).json({ message: 'Invalid user ID format' });
//     }
//     if (!mongoose.Types.ObjectId.isValid(imageId)) {
//         return res.status(400).json({ message: 'Invalid image ID format' });
//     }

//     // Consider adding validation for the path format if necessary (e.g., ensure it starts with 'uploads/')

//     try {
//         // Find the user and the specific image, then update the path
//         const updateResult = await User.updateOne(
//             {
//                 _id: new mongoose.Types.ObjectId(userId),       // Match user by _id
//                 role: 'patient',                               // Ensure it's a patient
//                 "imageData._id": new mongoose.Types.ObjectId(imageId) // Match specific image in the array
//             },
//             {
//                 $set: { "imageData.$.imagePath": newImagePath.trim() } // Update only the imagePath of the matched element ($)
//             }
//         );

//         // Check if the update was successful
//         if (updateResult.matchedCount === 0) {
//             // No document matched the criteria (user not found, or image not found within that user)
//             return res.status(404).json({ message: 'Patient or specific image not found' });
//         }

//         if (updateResult.modifiedCount === 0 && updateResult.matchedCount === 1) {
//             // Document was found, but the path was not modified (it might be the same as the existing path)
//             console.log(`Image path update requested for user ${userId}, image ${imageId}, but value was likely unchanged.`);
//             // Still fetch and return the user data as the state is consistent
//         } else {
//             console.log(`Image path updated successfully for user ${userId}, image ${imageId}`);
//         }

//         // Fetch the updated user document to send back to the client
//         const updatedUser = await User.findById(userId).select('-password'); // Exclude password
//         if (!updatedUser) {
//             // Should not happen if update succeeded, but handle defensively
//              return res.status(404).json({ message: 'Updated user not found after update operation.' });
//         }

//         res.status(200).json(updatedUser); // Send the full updated user document back

//     } catch (err) {
//         console.error(`Error updating image path for user ${userId}, image ${imageId}:`, err);
//         res.status(500).json({ message: 'Server error updating image path' });
//     }
// });

// // --- NEW ROUTE: Delete Specific Image ---
// // TODO: Add authentication (ensure user has permission to delete)
// app.delete('/api/patients/:userId/images/:imageId', async (req, res) => {
//     const { userId, imageId } = req.params;

//     // Validate IDs
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//          return res.status(400).json({ message: 'Invalid user ID format' });
//     }
//     if (!mongoose.Types.ObjectId.isValid(imageId)) {
//         return res.status(400).json({ message: 'Invalid image ID format' });
//     }

//     try {
//         // 1. Find the user and the image to get the path *before* deleting the record
//         const user = await User.findOne(
//             { _id: userId, role: 'patient', "imageData._id": imageId },
//             { 'imageData.$': 1 } // Project only the matching imageData element
//         );

//         if (!user || !user.imageData || user.imageData.length === 0) {
//             return res.status(404).json({ message: 'Patient or specific image not found' });
//         }

//         const imageToDelete = user.imageData[0]; // The matched image subdocument
//         const imagePathToDelete = imageToDelete.imagePath; // e.g., "uploads/unique-name.jpg"

//         // 2. Remove the image subdocument from the user's imageData array
//         const updateResult = await User.updateOne(
//             { _id: userId },
//             { $pull: { imageData: { _id: imageId } } } // Use $pull to remove the item from the array
//         );

//         if (updateResult.modifiedCount === 0) {
//             // This might happen if the image was already deleted between step 1 and 2 (race condition)
//             // or if the findOne found it but updateOne somehow didn't. Treat as not found.
//             console.warn(`Image ${imageId} for user ${userId} was found but DB record update failed (modifiedCount=0).`);
//             // You could re-query here to be sure, but often $pull handles this gracefully.
//             // Proceed to attempt file deletion anyway, as the goal is deletion.
//             // return res.status(404).json({ message: 'Image record could not be removed from database.' });
//         }

//         // 3. Delete the actual image file from the filesystem
//         if (imagePathToDelete) {
//             const fullPath = path.join(__dirname, imagePathToDelete); // Get the absolute path
//             console.log(`Attempting to delete file: ${fullPath}`);

//             fs.unlink(fullPath, (err) => {
//                 if (err && err.code === 'ENOENT') {
//                     // File not found - might have been deleted manually or already processed
//                     console.log(`File not found (already deleted?): ${fullPath}`);
//                 } else if (err) {
//                     // Other error deleting file (e.g., permissions)
//                     console.error(`Error deleting file ${fullPath}:`, err);
//                     // Note: The database record is already deleted. We might log this failure
//                     // but still return success for the DB operation. Or return a specific error.
//                     // For simplicity here, we log the error but still report overall success.
//                 } else {
//                     console.log(`Successfully deleted file: ${fullPath}`);
//                 }
//             });
//         } else {
//             console.warn(`No imagePath found for image ${imageId} of user ${userId}. Cannot delete file.`);
//         }

//         console.log(`Image record ${imageId} deleted successfully for user ${userId}`);
//         // Send success response - you could also send back the updated user doc if needed
//         res.status(200).json({ message: 'Image deleted successfully' });

//     } catch (err) {
//         console.error(`Error deleting image ${imageId} for user ${userId}:`, err);
//         res.status(500).json({ message: 'Server error deleting image' });
//     }
// });
// // --- END OF NEW DELETE ROUTE ---


// // --- Server Start ---
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`------------------------------------------------------`);
//     console.log(`Server running on port ${PORT}`);
//     console.log(`Local access:   http://localhost:${PORT}`);
//     // Find local IP for network access (optional)
//     try {
//         const { networkInterfaces } = require('os');
//         const nets = networkInterfaces();
//         for (const name of Object.keys(nets)) {
//             for (const net of nets[name]) {
//                 // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//                 if (net.family === 'IPv4' && !net.internal) {
//                     console.log(`Network access: http://${net.address}:${PORT}`);
//                     break; // Show first non-internal IPv4
//                 }
//             }
//         }
//     } catch(e) { console.log("Could not determine network IP.")}

//     console.log(`Frontend URL:   ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
//     console.log(`Static files:   ${uploadsDir}`);
//     console.log(`------------------------------------------------------`);
// });

// // --- Graceful Shutdown ---
// const gracefulShutdown = async (signal) => {
//     console.log(`\n${signal} signal received: closing MongoDB connection...`);
//     try {
//         await mongoose.connection.close(false);
//         console.log('MongoDB connection closed successfully.');
//         process.exit(0);
//     } catch (err) {
//         console.error('Error closing MongoDB connection:', err);
//         process.exit(1);
//     }
// };

// process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));




// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Used for directory check and file deletion
const User = require('./models/User'); // Make sure path is correct

// --- Environment Variables ---
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

// --- Google Generative AI Setup ---
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
let genAI;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!geminiApiKey) {
    console.warn("GEMINI_API_KEY environment variable is not set. Chat functionality will be disabled.");
} else {
    genAI = new GoogleGenerativeAI(geminiApiKey);
}

const app = express();

// --- Middleware ---
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// --- Static Files ---
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    console.log(`Creating uploads directory at: ${uploadsDir}`);
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));
console.log(`Serving static files from: ${uploadsDir}`);


// --- MongoDB Connection ---
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error("FATAL ERROR: MONGODB_URI environment variable is not set.");
    process.exit(1);
}
mongoose.connect(mongoUri)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// --- Multer Setup (File Uploads) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// --- JWT Secret ---
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error("FATAL ERROR: JWT_SECRET environment variable is not set.");
    process.exit(1);
}

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            console.error("JWT Verification Error:", err.message);
            return res.sendStatus(403);
        }
        req.user = user; // Contains { userId, role, name }
        next();
    });
};


// --- API Routes ---

// Signup Route
app.post('/api/signup', async (req, res) => {
    const { name, email, role, password, patientId, organizationName, gender, dateOfBirth, referredDoctor } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields (name, email, password, role)' });
    }
    if (role === 'patient' && !patientId) {
        return res.status(400).json({ message: 'Patient ID is required for patient role' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        if (role === 'patient') {
            const existingPatient = await User.findOne({ patientId });
            if (existingPatient) {
                return res.status(400).json({ message: 'Patient ID already exists' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, email, password: hashedPassword, role,
            patientId: role === 'patient' ? patientId : undefined,
            organizationName,
            gender: role === 'patient' ? gender : undefined,
            dateOfBirth: role === 'patient' ? dateOfBirth : undefined,
            referredDoctor: role === 'patient' ? referredDoctor : undefined,
            imageData: [], chatHistory: [],
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error("Signup Error:", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation Error", errors: err.errors });
        }
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const payload = { userId: user._id, role: user.role, name: user.name, patientId: user.patientId };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

        res.status(200).json({
            token,
            user: {
                _id: user._id, name: user.name, email: user.email, role: user.role,
                patientId: user.patientId, organizationName: user.organizationName,
            }
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Get All Patients Route (Example - adjust auth as needed)
app.get('/api/patients', async (req, res) => { // Consider adding authenticateToken
    try {
        const patients = await User.find({ role: 'patient' }).select('-password');
        res.status(200).json(patients);
    } catch (err) {
        console.error("Error fetching patients:", err);
        res.status(500).json({ message: 'Server error fetching patients' });
    }
});


// Upload Image Route
app.post('/api/upload', authenticateToken, upload.single('image'), async (req, res) => {
    const { organizationName } = req.body; // patientId will come from authenticated user
    const patientId = req.user.patientId; // Assuming patientId is part of JWT payload for patients

    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
    }
    if (!patientId && req.user.role === 'patient') { // Ensure patientId for patient role
        fs.unlink(req.file.path, (err) => {
            if (err) console.error(`Error deleting orphaned file ${req.file.path}:`, err);
        });
        return res.status(400).json({ message: 'Patient ID context is missing for upload' });
    }
    
    const servedImagePath = `uploads/${req.file.filename}`.replace(/\\/g, '/');

    try {
        // For patients, find by their own _id. For staff uploading for a patient, patientId might be in body.
        // Here, assuming patient uploads for themselves, so req.user.userId is their User._id.
        const patient = await User.findById(req.user.userId);

        if (!patient || patient.role !== 'patient') {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error(`Error deleting orphaned file ${req.file.path}:`, err);
            });
            return res.status(404).json({ message: 'Patient not found or user is not a patient' });
        }

        const newImageData = {
            organizationName: organizationName || patient.organizationName || 'Unknown Org',
            imageName: req.file.originalname,
            imagePath: servedImagePath,
            uploadDate: new Date(),
        };

        patient.imageData.push(newImageData);
        await patient.save();
        const addedImage = patient.imageData[patient.imageData.length - 1];

        res.status(200).json({
            message: 'Image uploaded successfully',
            filePath: servedImagePath,
            imageId: addedImage._id,
            image: addedImage // Send the full image object back
        });

    } catch (err) {
        console.error("Image Upload Error:", err);
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) console.error(`Error deleting file ${req.file.path} after upload error:`, unlinkErr);
        });
        res.status(500).json({ message: 'Server error during image upload' });
    }
});

// Update Prediction for a Specific Image
app.put('/api/patients/:userId/images/:imageId/predict', authenticateToken, async (req, res) => {
    const { userId, imageId } = req.params;
    const { prediction } = req.body;

    if (req.user.userId !== userId && req.user.role !== 'admin' && req.user.role !== 'medicalStaff') {
        return res.status(403).json({ message: "Forbidden: You cannot update this user's data." });
    }
    if (!prediction) {
        return res.status(400).json({ message: 'Prediction result is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(imageId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const updateResult = await User.updateOne(
            { _id: userId, "imageData._id": imageId },
            { $set: { "imageData.$.prediction": prediction } }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'Patient or specific image not found' });
        }
        // Fetch the updated image data to return
        const updatedUser = await User.findById(userId).select('-password');
        const updatedImage = updatedUser.imageData.id(imageId);

        res.status(200).json({ message: 'Prediction updated successfully', image: updatedImage });

    } catch (err) {
        console.error(`Error updating prediction for user ${userId}, image ${imageId}:`, err);
        res.status(500).json({ message: 'Server error updating prediction' });
    }
});


// --- CHAT API ENDPOINTS ---

// GET Chat History for a specific image
app.get('/api/chat/:userId/:imageId/history', authenticateToken, async (req, res) => {
    const { userId, imageId } = req.params;

    if (req.user.userId !== userId && req.user.role !== 'admin') { // Allow admin to view history too
        return res.status(403).json({ message: "Forbidden: You cannot access this chat history." });
    }
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(imageId)) {
        return res.status(400).json({ message: "Invalid User or Image ID format." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const chatSession = user.chatHistory.find(ch => ch.imageId.equals(imageId));
        if (!chatSession) {
            // No history yet, return empty or a specific message based on frontend needs
            const imageForContext = user.imageData.id(imageId);
            if (imageForContext) {
                 return res.status(200).json({ 
                    messages: [], 
                    imageName: imageForContext.imageName, 
                    initialPrediction: imageForContext.prediction 
                });
            }
            return res.status(404).json({ message: "Chat history not found for this image, and image data missing."})
        }
        res.status(200).json(chatSession); // Send the whole chat session object

    } catch (error) {
        console.error(`Error fetching chat history for user ${userId}, image ${imageId}:`, error);
        res.status(500).json({ message: "Server error fetching chat history." });
    }
});

// POST a new message to chat and get AI response
app.post('/api/chat/:userId/:imageId/message', authenticateToken, async (req, res) => {
    if (!genAI) {
        return res.status(503).json({ message: "Chat service is currently unavailable (API key missing)." });
    }

    const { userId, imageId } = req.params;
    const { prompt } = req.body;

    if (req.user.userId !== userId) {
        return res.status(403).json({ message: "Forbidden: You cannot send messages for this user." });
    }
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(imageId)) {
        return res.status(400).json({ message: "Invalid User or Image ID format." });
    }
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
        return res.status(400).json({ message: "Prompt is required and must be a non-empty string." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const image = user.imageData.id(imageId);
        if (!image) {
            return res.status(404).json({ message: "Image not found for this chat." });
        }

        let chatSession = user.chatHistory.find(ch => ch.imageId.equals(imageId));
        
        // Prepare history for Gemini
        let geminiChatHistory = [];
        if (chatSession && chatSession.messages.length > 0) {
            geminiChatHistory = chatSession.messages.map(msg => ({
                role: msg.role, // Gemini expects 'user' or 'model'
                parts: [{ text: msg.content }]
            }));
        }

        const model = genAI.getGenerativeModel({
             model: "gemini-2.0-flash-exp", // Or your preferred model
            //  systemInstruction: "You are a helpful medical assistant AI. You are discussing a medical image (e.g., a brain scan) with a patient. The image has a preliminary prediction. Be informative, empathetic, and clarify that you are not a doctor and your information is not a diagnosis. Always advise the user to consult with their doctor for any medical decisions or serious concerns.",
             systemInstruction: "You are a helpful medical assistant AI. You are discussing a medical image (e.g., a brain scan) with a patient. The image has a preliminary prediction. Be informative, empathetic.",
        });
        
        const generationConfig = {
            temperature: 0.7,
            topK: 1, // Default is 1
            topP: 1, // Default is 1
            maxOutputTokens: 2048,
        };
        const safetySettings = [ // Example safety settings
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];

        const geminiChat = model.startChat({
            history: geminiChatHistory,
            generationConfig,
            safetySettings
        });
        
        let promptForGemini = prompt;
        // If this is the first user message in a new session for this image, prepend context.
        // (The systemInstruction should also cover context, but this makes it explicit in the first turn)
        if (!chatSession || chatSession.messages.filter(m => m.role === 'user').length === 0) {
            promptForGemini = `Regarding the medical image named "${image.imageName}" with an initial prediction of "${image.prediction || 'Pending'}": ${prompt}`;
        }
        
        const result = await geminiChat.sendMessage(promptForGemini);
        const response = result.response;
        const modelReply = response.text();

        // Save to DB
        const userMessage = { role: 'user', content: prompt, timestamp: new Date() };
        const aiMessage = { role: 'model', content: modelReply, timestamp: new Date() };

        if (!chatSession) {
            chatSession = {
                imageId: imageId,
                imagePath: image.imagePath,
                imageName: image.imageName,
                initialPrediction: image.prediction,
                messages: [userMessage, aiMessage],
                lastUpdated: new Date()
            };
            user.chatHistory.push(chatSession);
        } else {
            chatSession.messages.push(userMessage, aiMessage);
            chatSession.lastUpdated = new Date();
        }
        
        await user.save();
        res.status(200).json({ reply: modelReply, userMessage, fullHistory: chatSession.messages });

    } catch (error) {
        console.error(`Error processing chat message for user ${userId}, image ${imageId}:`, error);
        if (error.message.includes("SAFETY")) {
             return res.status(400).json({ message: "Response blocked due to safety settings. Please rephrase your message." });
        }
        res.status(500).json({ message: "Server error processing chat message." });
    }
});

// Delete Specific Image
app.delete('/api/patients/:userId/images/:imageId', authenticateToken, async (req, res) => {
    const { userId, imageId } = req.params;

    if (req.user.userId !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: You cannot delete this user's data." });
    }
     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(imageId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const image = user.imageData.id(imageId);
        if (!image) return res.status(404).json({ message: 'Image not found in user data' });
        
        const imagePathToDelete = image.imagePath;

        // Remove image from imageData
        user.imageData.pull({ _id: imageId });
        
        // Optional: Remove associated chat history
        user.chatHistory = user.chatHistory.filter(ch => !ch.imageId.equals(imageId));
        
        await user.save();

        if (imagePathToDelete) {
            const fullPath = path.join(__dirname, imagePathToDelete);
            fs.unlink(fullPath, (err) => {
                if (err && err.code === 'ENOENT') console.log(`File not found (already deleted?): ${fullPath}`);
                else if (err) console.error(`Error deleting file ${fullPath}:`, err);
                else console.log(`Successfully deleted file: ${fullPath}`);
            });
        }
        res.status(200).json({ message: 'Image and associated chat history (if any) deleted successfully' });
    } catch (err) {
        console.error(`Error deleting image ${imageId} for user ${userId}:`, err);
        res.status(500).json({ message: 'Server error deleting image' });
    }
});


// --- Server Start ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`------------------------------------------------------`);
    console.log(`Server running on port ${PORT}`);
    // ... (rest of your server start logs)
    console.log(`------------------------------------------------------`);
});

// ... (Graceful Shutdown)
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} signal received: closing MongoDB connection...`);
    try {
        await mongoose.connection.close(false);
        console.log('MongoDB connection closed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));