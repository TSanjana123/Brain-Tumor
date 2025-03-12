// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors'); // Import CORS
// const User = require('./models/User');

// const app = express();

// // Enable CORS for all origins (you can customize this later)
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(express.json());
// // app.use('/uploads', express.static('uploads'));

// // Connect to MongoDB
// // mongoose.connect(process.env.MONGODB_URI, {
// // mongoose.connect("mongodb+srv://sanjanathumpally:rootinc@sanjanaaa.ajf49.mongodb.net/", {
// mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Signup Route
// app.post('/api/signup', async (req, res) => {
//   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   try {
//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       patientId: role === 'patient' ? patientId : undefined,
//       organizationName: role === 'medicalStaff' ? organizationName : undefined,
      
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Send success response
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log('Login request received:', req.body);  // Log the incoming request data

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found');  // Log when user is not found
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Check if the password is correct
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log('Incorrect password');  // Log when password does not match
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Create a JWT token
//     // const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
//     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
//       expiresIn: '1h',
//     });

//     // Send the token in the response
//     res.status(200).json({
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token,
//       patientId: user.patientId,
//       organizationName: user.organizationName,
//     });

//   } catch (err) {
//     console.error('Error during login:', err);  // Log the error if something goes wrong
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // Start the server on port 5001
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// // // // // // require('dotenv').config();
// // // // // // const express = require('express');
// // // // // // const mongoose = require('mongoose');
// // // // // // const cors = require('cors');
// // // // // // const multer = require('multer');
// // // // // // const fs = require('fs');
// // // // // // const path = require('path');
// // // // // // const User = require('./models/User');

// // // // // // const app = express();

// // // // // // // Middleware
// // // // // // app.use(cors());
// // // // // // app.use(express.json());
// // // // // // app.use('/uploads', express.static('uploads'));

// // // // // // // MongoDB Connection
// // // // // // // mongoose.connect("mongodb+srv://sanjanathumpally:rootinc@sanjanaaa.ajf49.mongodb.net/", {
// // // // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // // // //   useNewUrlParser: true,
// // // // // //   useUnifiedTopology: true,
// // // // // // })
// // // // // //   .then(() => console.log('MongoDB connected'))
// // // // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // // // Ensure uploads directory exists
// // // // // // const uploadDir = path.join(__dirname, 'uploads');
// // // // // // if (!fs.existsSync(uploadDir)) {
// // // // // //   fs.mkdirSync(uploadDir);
// // // // // // }

// // // // // // // Multer configuration for file uploads
// // // // // // const storage = multer.diskStorage({
// // // // // //   destination: (req, file, cb) => {
// // // // // //     cb(null, './uploads');
// // // // // //   },
// // // // // //   filename: (req, file, cb) => {
// // // // // //     cb(null, Date.now() + path.extname(file.originalname));
// // // // // //   },
// // // // // // });
// // // // // // const upload = multer({ storage });

// // // // // // // Upload endpoint
// // // // // // app.post('/api/upload', upload.single('image'), async (req, res) => {
// // // // // //   try {
// // // // // //     const { patientId, organizationEmail } = req.body;
// // // // // //     const imagePath = req.file.path;
// // // // // //     const imageId = req.file.filename;
// // // // // //     const uploadTime = new Date();

// // // // // //     // Find the organization by email
// // // // // //     const organization = await User.findOne({ email: organizationEmail, role: 'medicalStaff' });

// // // // // //     if (!organization) {
// // // // // //       return res.status(404).json({ message: 'Organization not found' });
// // // // // //     }

// // // // // //     // Find the patient and update their image data
// // // // // //     const updatedUser = await User.findOneAndUpdate(
// // // // // //       { patientId },
// // // // // //       {
// // // // // //         $push: {
// // // // // //           imageData: { imageId, imagePath, uploadTime },
// // // // // //         },
// // // // // //       },
// // // // // //       { new: true }
// // // // // //     );

// // // // // //     if (!updatedUser) {
// // // // // //       return res.status(404).json({ message: 'Patient not found' });
// // // // // //     }

// // // // // //     res.status(200).json({ message: 'Image uploaded successfully', updatedUser });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ message: 'Server error' });
// // // // // //   }
// // // // // // });



// // // // // // // API to fetch all patient IDs
// // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // //   try {
// // // // // //     const patients = await User.find({ role: 'patient' }, 'patientId');
// // // // // //     res.status(200).json(patients);
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ message: 'Failed to fetch patient IDs' });
// // // // // //   }
// // // // // // });


// // // // // // // Start server
// // // // // // const PORT = process.env.PORT || 5001;
// // // // // // app.listen(PORT, () => {
// // // // // //   console.log(`Server running on port ${PORT}`);
// // // // // // });




// // // // // // const express = require('express');
// // // // // // const mongoose = require('mongoose');
// // // // // // const multer = require('multer');
// // // // // // const cors = require('cors');
// // // // // // const path = require('path');

// // // // // // // Initialize Express app and middleware
// // // // // // const app = express();
// // // // // // app.use(cors());
// // // // // // app.use(express.json());

// // // // // // // MongoDB connection
// // // // // // const mongoURI = 'mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/';
// // // // // // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// // // // // // const db = mongoose.connection;
// // // // // // db.on('connected', () => console.log('Connected to MongoDB Atlas'));
// // // // // // db.on('error', (error) => console.error('MongoDB connection error:', error));

// // // // // // // Define User Schema
// // // // // // const userSchema = new mongoose.Schema({
// // // // // //   name: String,
// // // // // //   email: String,
// // // // // //   password: String,
// // // // // //   role: String,
// // // // // //   patientId: String,
// // // // // //   organizationName: String,
// // // // // //   imageData: [
// // // // // //     {
// // // // // //       imagePath: String,
// // // // // //       imageId: String,
// // // // // //       uploadedAt: { type: Date, default: Date.now },
// // // // // //     },
// // // // // //   ],
// // // // // // });
// // // // // // const User = mongoose.model('User', userSchema);

// // // // // // // Multer setup for file uploads
// // // // // // const storage = multer.diskStorage({
// // // // // //   destination: (req, file, cb) => {
// // // // // //     const uploadPath = path.join(__dirname, 'uploads');
// // // // // //     cb(null, uploadPath);
// // // // // //   },
// // // // // //   filename: (req, file, cb) => {
// // // // // //     const uniqueFilename = `${Date.now()}-${file.originalname}`;
// // // // // //     cb(null, uniqueFilename);
// // // // // //   },
// // // // // // });
// // // // // // const upload = multer({ storage });

// // // // // // // Serve static files from the uploads folder
// // // // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // // // API to get all patient IDs
// // // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // // //   try {
// // // // // //     const patients = await User.find({ role: 'patient' }, { patientId: 1, _id: 0 });
// // // // // //     res.json(patients);
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ error: 'Failed to fetch patient IDs' });
// // // // // //   }
// // // // // // });

// // // // // // // API to upload image details
// // // // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // // // //   const { patientId } = req.body;

// // // // // //   // Validate input
// // // // // //   if (!patientId || !req.file) {
// // // // // //     return res.status(400).json({ error: 'Patient ID and image are required' });
// // // // // //   }

// // // // // //   const imagePath = `/uploads/${req.file.filename}`; // File path to save in MongoDB
// // // // // //   const imageId = req.file.filename; // Unique image identifier

// // // // // //   try {
// // // // // //     const patient = await User.findOne({ patientId });

// // // // // //     if (!patient) {
// // // // // //       return res.status(404).json({ error: 'Patient not found' });
// // // // // //     }

// // // // // //     // Add image details to the patient's imageData array
// // // // // //     const newImageData = { imagePath, imageId };
// // // // // //     patient.imageData.push(newImageData);
// // // // // //     await patient.save();

// // // // // //     res.json({ message: 'Image uploaded successfully', imagePath });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ error: 'Failed to upload image' });
// // // // // //   }
// // // // // // });

// // // // // // // Start the server
// // // // // // const PORT = 5001;
// // // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// // // // // const express = require('express');
// // // // // const mongoose = require('mongoose');
// // // // // const bcrypt = require('bcrypt');
// // // // // const jwt = require('jsonwebtoken');
// // // // // const multer = require('multer');
// // // // // const cors = require('cors');
// // // // // const path = require('path');

// // // // // // Initialize Express app
// // // // // const app = express();
// // // // // app.use(cors());
// // // // // app.use(express.json());

// // // // // // MongoDB connection
// // // // // const mongoURI = 'mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/';
// // // // // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// // // // // const db = mongoose.connection;
// // // // // db.on('connected', () => console.log('Connected to MongoDB Atlas'));
// // // // // db.on('error', (error) => console.error('MongoDB connection error:', error));

// // // // // // JWT secret
// // // // // const JWT_SECRET = '4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s';

// // // // // // Define User Schema
// // // // // const userSchema = new mongoose.Schema({
// // // // //   name: String,
// // // // //   email: { type: String, unique: true },
// // // // //   password: String,
// // // // //   role: String,
// // // // //   patientId: String,
// // // // //   organizationName: String,
// // // // //   imageData: [
// // // // //     {
// // // // //       imagePath: String,
// // // // //       imageId: String,
// // // // //       uploadedAt: { type: Date, default: Date.now },
// // // // //     },
// // // // //   ],
// // // // // });
// // // // // const User = mongoose.model('User', userSchema);

// // // // // // Multer setup for file uploads
// // // // // const storage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     const uploadPath = path.join(__dirname, 'uploads');
// // // // //     cb(null, uploadPath);
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     const uniqueFilename = `${Date.now()}-${file.originalname}`;
// // // // //     cb(null, uniqueFilename);
// // // // //   },
// // // // // });
// // // // // const upload = multer({ storage });

// // // // // // Serve static files from the uploads folder
// // // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // // Signup route
// // // // // app.post('/api/signup', async (req, res) => {
// // // // //   const { name, email, password, role, patientId, organizationName } = req.body;

// // // // //   try {
// // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // //     const newUser = new User({
// // // // //       name,
// // // // //       email,
// // // // //       password: hashedPassword,
// // // // //       role,
// // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // //     });

// // // // //     await newUser.save();
// // // // //     res.json({ message: 'User registered successfully' });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ error: 'Failed to register user' });
// // // // //   }
// // // // // });

// // // // // // Login route
// // // // // app.post('/api/login', async (req, res) => {
// // // // //   const { email, password } = req.body;

// // // // //   try {
// // // // //     const user = await User.findOne({ email });
// // // // //     if (!user) {
// // // // //       return res.status(404).json({ error: 'User not found' });
// // // // //     }

// // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // //     if (!isMatch) {
// // // // //       return res.status(401).json({ error: 'Invalid credentials' });
// // // // //     }

// // // // //     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
// // // // //     res.json({ message: 'Login successful', token });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ error: 'Failed to login' });
// // // // //   }
// // // // // });

// // // // // // API to fetch all patient IDs
// // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // //   try {
// // // // //     const patients = await User.find({ role: 'patient' }, { patientId: 1, _id: 0 });
// // // // //     res.json(patients);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: 'Failed to fetch patient IDs' });
// // // // //   }
// // // // // });

// // // // // // API to upload image details
// // // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // // //   const { patientId } = req.body;

// // // // //   // Validate input
// // // // //   if (!patientId || !req.file) {
// // // // //     return res.status(400).json({ error: 'Patient ID and image are required' });
// // // // //   }

// // // // //   const imagePath = `/uploads/${req.file.filename}`; // File path to save in MongoDB
// // // // //   const imageId = req.file.filename; // Unique image identifier

// // // // //   try {
// // // // //     const patient = await User.findOne({ patientId });

// // // // //     if (!patient) {
// // // // //       return res.status(404).json({ error: 'Patient not found' });
// // // // //     }

// // // // //     // Add image details to the patient's imageData array
// // // // //     const newImageData = { imagePath, imageId };
// // // // //     patient.imageData.push(newImageData);
// // // // //     await patient.save();

// // // // //     res.json({ message: 'Image uploaded successfully', imagePath });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: 'Failed to upload image' });
// // // // //   }
// // // // // });

// // // // // // Start the server
// // // // // const PORT = 5001;
// // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


















// // // // // const express = require('express');
// // // // // const mongoose = require('mongoose');
// // // // // const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt
// // // // // const jwt = require('jsonwebtoken');
// // // // // const multer = require('multer');
// // // // // const cors = require('cors');
// // // // // const path = require('path');

// // // // // const app = express();
// // // // // app.use(cors());
// // // // // app.use(express.json());

// // // // // // MongoDB connection
// // // // // const mongoURI = 'mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/';
// // // // // mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// // // // // const db = mongoose.connection;
// // // // // db.on('connected', () => console.log('Connected to MongoDB Atlas'));
// // // // // db.on('error', (error) => console.error('MongoDB connection error:', error));

// // // // // // JWT secret
// // // // // const JWT_SECRET = 'your_jwt_secret_key';

// // // // // // Define User Schema
// // // // // const userSchema = new mongoose.Schema({
// // // // //   name: String,
// // // // //   email: { type: String, unique: true },
// // // // //   password: String,
// // // // //   role: String,
// // // // //   patientId: String,
// // // // //   organizationName: String,
// // // // //   imageData: [
// // // // //     {
// // // // //       imagePath: String,
// // // // //       imageId: String,
// // // // //       uploadedAt: { type: Date, default: Date.now },
// // // // //     },
// // // // //   ],
// // // // // });
// // // // // const User = mongoose.model('User', userSchema);

// // // // // // Multer setup for file uploads
// // // // // const storage = multer.diskStorage({
// // // // //   destination: (req, file, cb) => {
// // // // //     const uploadPath = path.join(__dirname, 'uploads');
// // // // //     cb(null, uploadPath);
// // // // //   },
// // // // //   filename: (req, file, cb) => {
// // // // //     const uniqueFilename = `${Date.now()}-${file.originalname}`;
// // // // //     cb(null, uniqueFilename);
// // // // //   },
// // // // // });
// // // // // const upload = multer({ storage });

// // // // // // Serve static files from the uploads folder
// // // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // // Signup route
// // // // // app.post('/api/signup', async (req, res) => {
// // // // //   const { name, email, password, role, patientId, organizationName } = req.body;

// // // // //   try {
// // // // //     const hashedPassword = await bcrypt.hash(password, 10);

// // // // //     const newUser = new User({
// // // // //       name,
// // // // //       email,
// // // // //       password: hashedPassword,
// // // // //       role,
// // // // //       patientId: role === 'patient' ? patientId : undefined,
// // // // //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// // // // //     });

// // // // //     await newUser.save();
// // // // //     res.json({ message: 'User registered successfully' });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ error: 'Failed to register user' });
// // // // //   }
// // // // // });

// // // // // // Login route
// // // // // app.post('/api/login', async (req, res) => {
// // // // //   const { email, password } = req.body;

// // // // //   try {
// // // // //     const user = await User.findOne({ email });
// // // // //     if (!user) {
// // // // //       return res.status(404).json({ error: 'User not found' });
// // // // //     }

// // // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // // //     if (!isMatch) {
// // // // //       return res.status(401).json({ error: 'Invalid credentials' });
// // // // //     }

// // // // //     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
// // // // //     res.json({ message: 'Login successful', token });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ error: 'Failed to login' });
// // // // //   }
// // // // // });

// // // // // // API to fetch all patient IDs
// // // // // app.get('/api/patient-ids', async (req, res) => {
// // // // //   try {
// // // // //     const patients = await User.find({ role: 'patient' }, { patientId: 1, _id: 0 });
// // // // //     res.json(patients);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: 'Failed to fetch patient IDs' });
// // // // //   }
// // // // // });

// // // // // // API to upload image details
// // // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // // //   const { patientId } = req.body;

// // // // //   if (!patientId || !req.file) {
// // // // //     return res.status(400).json({ error: 'Patient ID and image are required' });
// // // // //   }

// // // // //   const imagePath = `/uploads/${req.file.filename}`;
// // // // //   const imageId = req.file.filename;

// // // // //   try {
// // // // //     const patient = await User.findOne({ patientId });

// // // // //     if (!patient) {
// // // // //       return res.status(404).json({ error: 'Patient not found' });
// // // // //     }

// // // // //     const newImageData = { imagePath, imageId };
// // // // //     patient.imageData.push(newImageData);
// // // // //     await patient.save();

// // // // //     res.json({ message: 'Image uploaded successfully', imagePath });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: 'Failed to upload image' });
// // // // //   }
// // // // // });

// // // // // // Start the server
// // // // // const PORT = 5001;
// // // // // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// // // // require('dotenv').config();
// // // // const express = require('express');
// // // // const mongoose = require('mongoose');
// // // // const bcrypt = require('bcryptjs');
// // // // const jwt = require('jsonwebtoken');
// // // // const multer = require('multer');
// // // // const cors = require('cors');
// // // // const fs = require('fs');
// // // // const path = require('path');
// // // // const User = require('./models/User');
// // // // const Image = require('./models/Image');

// // // // const app = express();

// // // // // Enable CORS
// // // // app.use(cors());

// // // // // Middleware
// // // // app.use(express.json());
// // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // MongoDB connection
// // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // //   useNewUrlParser: true,
// // // //   useUnifiedTopology: true,
// // // // })
// // // //   .then(() => console.log('MongoDB connected'))
// // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // Multer configuration for local storage
// // // // const storage = multer.diskStorage({
// // // //   destination: (req, file, cb) => {
// // // //     const uploadDir = path.join(__dirname, 'uploads');
// // // //     if (!fs.existsSync(uploadDir)) {
// // // //       fs.mkdirSync(uploadDir); // Ensure the upload directory exists
// // // //     }
// // // //     cb(null, uploadDir);
// // // //   },
// // // //   filename: (req, file, cb) => {
// // // //     const uniqueName = `${Date.now()}-${file.originalname}`;
// // // //     cb(null, uniqueName);
// // // //   },
// // // // });

// // // // const upload = multer({ storage });

// // // // // Routes

// // // // // Signup Route
// // // // app.post('/api/signup', async (req, res) => {
// // // //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// // // //   if (password !== confirmPassword) {
// // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // //   }

// // // //   try {
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
// // // //     });

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

// // // //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
// // // //       expiresIn: '1h',
// // // //     });

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

// // // // // Fetch Patient IDs
// // // // app.get('/api/patient-ids', async (req, res) => {
// // // //   try {
// // // //     const patients = await User.find({ role: 'patient' }, 'patientId');
// // // //     res.status(200).json(patients);
// // // //   } catch (err) {
// // // //     console.error('Error fetching patient IDs:', err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Upload Patient Image
// // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // //   const { patientId } = req.body;

// // // //   if (!req.file) {
// // // //     return res.status(400).json({ message: 'No file uploaded' });
// // // //   }

// // // //   try {
// // // //     const imagePath = req.file.path;

// // // //     // Verify if the patient exists
// // // //     const patient = await User.findOne({ patientId, role: 'patient' });
// // // //     if (!patient) {
// // // //       fs.unlinkSync(imagePath); // Remove uploaded file if patient doesn't exist
// // // //       return res.status(404).json({ message: 'Patient not found' });
// // // //     }

// // // //     const newImage = new Image({
// // // //       patientId,
// // // //       imageName: req.file.filename,
// // // //       imagePath,
// // // //       uploadedAt: new Date(),
// // // //     });

// // // //     await newImage.save();
// // // //     res.status(201).json({ message: 'Image uploaded and details saved successfully' });
// // // //   } catch (err) {
// // // //     console.error('Error uploading details:', err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Server
// // // // const PORT = process.env.PORT || 5001;
// // // // app.listen(PORT, () => {
// // // //   console.log(`Server running on port ${PORT}`);
// // // // });



// // // // require('dotenv').config();
// // // // const express = require('express');
// // // // const mongoose = require('mongoose');
// // // // const bcrypt = require('bcryptjs');
// // // // const jwt = require('jsonwebtoken');
// // // // const multer = require('multer');
// // // // const cors = require('cors');
// // // // const fs = require('fs');
// // // // const path = require('path');
// // // // const User = require('./models/User');
// // // // const Image = require('./models/Image');

// // // // const app = express();

// // // // // Enable CORS
// // // // app.use(cors());

// // // // // Middleware
// // // // app.use(express.json());
// // // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // // // MongoDB connection
// // // // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// // // //   useNewUrlParser: true,
// // // //   useUnifiedTopology: true,
// // // // })
// // // //   .then(() => console.log('MongoDB connected'))
// // // //   .catch(err => console.error('MongoDB connection error:', err));

// // // // // Multer configuration for local storage
// // // // const storage = multer.diskStorage({
// // // //   destination: (req, file, cb) => {
// // // //     const uploadDir = path.join(__dirname, 'uploads');
// // // //     if (!fs.existsSync(uploadDir)) {
// // // //       fs.mkdirSync(uploadDir); // Ensure the upload directory exists
// // // //     }
// // // //     cb(null, uploadDir);
// // // //   },
// // // //   filename: (req, file, cb) => {
// // // //     const uniqueName = `${Date.now()}-${file.originalname}`;
// // // //     cb(null, uniqueName);
// // // //   },
// // // // });

// // // // const upload = multer({ storage });

// // // // // Routes

// // // // // Signup Route
// // // // app.post('/api/signup', async (req, res) => {
// // // //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// // // //   if (password !== confirmPassword) {
// // // //     return res.status(400).json({ message: 'Passwords do not match' });
// // // //   }

// // // //   try {
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
// // // //     });

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

// // // //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
// // // //       expiresIn: '1h',
// // // //     });

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

// // // // // Fetch Patient IDs
// // // // app.get('/api/patient-ids', async (req, res) => {
// // // //   try {
// // // //     const patients = await User.find({ role: 'patient' }, 'patientId');
// // // //     res.status(200).json(patients);
// // // //   } catch (err) {
// // // //     console.error('Error fetching patient IDs:', err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Upload Patient Image
// // // // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// // // //   const { patientId } = req.body;

// // // //   if (!req.file) {
// // // //     return res.status(400).json({ message: 'No file uploaded' });
// // // //   }

// // // //   try {
// // // //     const imagePath = req.file.path;

// // // //     // Verify if the patient exists
// // // //     const patient = await User.findOne({ patientId, role: 'patient' });
// // // //     if (!patient) {
// // // //       fs.unlinkSync(imagePath); // Remove uploaded file if patient doesn't exist
// // // //       return res.status(404).json({ message: 'Patient not found' });
// // // //     }

// // // //     const newImage = new Image({
// // // //       patientId,
// // // //       imageName: req.file.filename,
// // // //       imagePath,
// // // //       uploadedAt: new Date(),
// // // //     });

// // // //     await newImage.save(); // Save image details to MongoDB
// // // //     res.status(201).json({ message: 'Image uploaded and details saved successfully' });
// // // //   } catch (err) {
// // // //     console.error('Error uploading details:', err);
// // // //     res.status(500).json({ message: 'Server error' });
// // // //   }
// // // // });

// // // // // Server
// // // // const PORT = process.env.PORT || 5001;
// // // // app.listen(PORT, () => {
// // // //   console.log(`Server running on port ${PORT}`);
// // // // });
























// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const multer = require('multer');
// // const path = require('path');
// // const User = require('./models/User');

// // // Initialize express app
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use('/uploads', express.static('uploads'));

// // // MongoDB connection
// // mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// //   .then(() => console.log('MongoDB connected'))
// //   .catch(err => console.error('MongoDB connection error:', err));

// // // Patient schema for storing images
// // const PatientSchema = new mongoose.Schema({
// //   patientId: { type: String, required: true, unique: true },
// //   images: [
// //     {
// //       imageName: { type: String, required: true },
// //       imagePath: { type: String, required: true },
// //       uploadDate: { type: Date, default: Date.now },
// //     },
// //   ],
// // });

// // const Patient = mongoose.model('Patient', PatientSchema);

// // // Configure multer for file uploads
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'uploads'); // Directory to save uploaded files
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, `${uniqueSuffix}-${file.originalname}`);
// //   },
// // });

// // const upload = multer({ storage });

// // // Signup Route
// // app.post('/api/signup', async (req, res) => {
// //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// //   if (password !== confirmPassword) {
// //     return res.status(400).json({ message: 'Passwords do not match' });
// //   }

// //   try {
// //     // Check if the email is already registered
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'Email already in use' });
// //     }

// //     // Hash the password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create the new user
// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role,
// //       patientId: role === 'patient' ? patientId : undefined,
// //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// //     });

// //     // Save the user to the database
// //     await newUser.save();

// //     // Send success response
// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Login Route
// // app.post('/api/login', async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Find the user by email
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid email or password' });
// //     }

// //     // Check if the password is correct
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid email or password' });
// //     }

// //     // Create a JWT token
// //     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
// //       expiresIn: '1h',
// //     });

// //     // Send the token in the response
// //     res.status(200).json({
// //       name: user.name,
// //       email: user.email,
// //       role: user.role,
// //       token,
// //       patientId: user.patientId,
// //       organizationName: user.organizationName,
// //     });

// //   } catch (err) {
// //     console.error('Error during login:', err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Route to get all patient IDs
// // app.get('/api/patient-ids', async (req, res) => {
// //   try {
// //     const patients = await Patient.find({}, 'patientId');
// //     res.json(patients);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Failed to fetch patient IDs' });
// //   }
// // });

// // // Route to upload details (image)
// // app.post('/api/upload-details', upload.single('image'), async (req, res) => {
// //   const { patientId } = req.body;
// //   const { filename, path: filePath } = req.file;

// //   try {
// //     // Check if patient exists
// //     let patient = await Patient.findOne({ patientId });

// //     if (!patient) {
// //       // Create new patient entry if not exists
// //       patient = new Patient({ patientId, images: [] });
// //     }

// //     // Add image details to the patient's record
// //     patient.images.push({
// //       imageName: filename,
// //       imagePath: filePath,
// //       uploadDate: new Date(),
// //     });

// //     // Save the updated patient document
// //     await patient.save();

// //     res.status(201).json({ message: 'Details uploaded successfully' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Failed to upload details' });
// //   }
// // });

// // // Route to get all images for a specific patient
// // app.get('/api/patient-images/:patientId', async (req, res) => {
// //   const { patientId } = req.params;

// //   try {
// //     const patient = await Patient.findOne({ patientId });

// //     if (!patient) {
// //       return res.status(404).json({ message: 'Patient not found' });
// //     }

// //     res.json(patient.images);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Failed to fetch patient images' });
// //   }
// // });

// // // Route to fetch all patient IDs from the database
// // app.get('/api/patient-ids', async (req, res) => {
// //   try {
// //     // Fetch all distinct patient IDs
// //     const patientIds = await Patient.find({}, 'patientId');
// //     res.json(patientIds);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Failed to fetch patient IDs' });
// //   }
// // });


// // const Patient = require('./models/Patient.js'); // Ensure the correct path to your model

// // // Route to fetch all patient IDs
// // app.get('/api/patient-ids', async (req, res) => {
// //   try {
// //     const patients = await Patient.find({}, 'patientId'); // Fetch only `patientId` field
// //     res.json(patients);
// //   } catch (err) {
// //     console.error('Error fetching patient IDs:', err);
// //     res.status(500).json({ message: 'Failed to fetch patient IDs' });
// //   }
// // });



// // // Start the server on port 5001
// // const PORT = process.env.PORT || 5001;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });








// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors'); // Import CORS
// const User = require('./models/User');

// const app = express();

// // Enable CORS for all origins (you can customize this later)
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(express.json());
// // app.use('/uploads', express.static('uploads'));

// // Connect to MongoDB
// // mongoose.connect(process.env.MONGODB_URI, {
// // mongoose.connect("mongodb+srv://sanjanathumpally:rootinc@sanjanaaa.ajf49.mongodb.net/", {
// mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Signup Route
// app.post('/api/signup', async (req, res) => {
//   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   try {
//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       patientId: role === 'patient' ? patientId : undefined,
//       organizationName: role === 'medicalStaff' ? organizationName : undefined,
      
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Send success response
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log('Login request received:', req.body);  // Log the incoming request data

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found');  // Log when user is not found
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Check if the password is correct
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log('Incorrect password');  // Log when password does not match
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Create a JWT token
//     // const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
//     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", {
//       expiresIn: '1h',
//     });

//     // Send the token in the response
//     res.status(200).json({
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token,
//       patientId: user.patientId,
//       organizationName: user.organizationName,
//     });

//   } catch (err) {
//     console.error('Error during login:', err);  // Log the error if something goes wrong
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// app.get('/api/patientIds', async (req, res) => {
//   try {
//     const patients = await User.find({ role: 'patient' }).select('patientId -_id');
//     if (!patients || patients.length === 0) {
//       return res.status(404).json({ message: 'No patients found' });
//     }
//     const patientIds = patients.map(patient => patient.patientId);
//     res.status(200).json(patientIds);
//   } catch (err) {
//     console.error('Error fetching patient IDs:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// const multer = require('multer');
// const path = require('path');

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });
// const upload = multer({ storage });

// app.post('/api/uploadImage', upload.single('image'), async (req, res) => {
//   const { patientId } = req.body;
//   const { filename } = req.file;

//   try {
//     const user = await User.findOne({ patientId });
//     if (!user) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     const imagePath = path.join('uploads', filename);
//     const newImage = {
//       imageName: filename,
//       imageId: filename,
//       imagePath,
//       uploadDate: new Date(),
//     };

//     user.imageData.push(newImage);
//     await user.save();

//     res.status(200).json({ message: 'Image uploaded successfully' });
//   } catch (err) {
//     console.error('Error uploading image:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // Start the server on port 5001
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });











const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const User = require('./models/User');

const app = express();
app.use(cors());
// const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTENDURL,
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

require('dotenv').config();
console.log("Shashi")
console.log("env : ",process.env.MONGODB_URI)
// MongoDB Connection
// mongoose.connect("mongodb+srv://21bd1a661tcsma:Shashi@shashireact.ebrjsgd.mongodb.net/", {
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      patientId: role === 'patient' ? patientId : undefined,
      organizationName: role === 'medicalStaff' ? organizationName : undefined,
    });

    await newUser.save();
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", { expiresIn: '1h' });

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      patientId: user.patientId,
      organizationName: user.organizationName,
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch all patient IDs
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }, { patientId: 1, _id: 0 });
    if (!patients.length) {
      return res.status(404).json({ message: 'No patients found' });
    }
    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/images', async (req, res) => {
  try {
    const usersWithImages = await User.find({ 'imageData.0': { $exists: true } }, 'patientId imageData');
    const images = usersWithImages.flatMap((user) =>
      user.imageData.map((img) => ({
        patientId: user.patientId,
        imageName: img.imageName,
        imagePath: img.imagePath,
        uploadDate: img.uploadDate,
      }))
    );
    res.status(200).json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/upload', upload.single('image'), async (req, res) => {
  const { patientId, organizationName } = req.body; // Destructure organizationName from the request body
  const imagePath = req.file.path;

  try {
    await User.updateOne(
      { patientId },
      {
        $push: {
          imageData: {
            organizationName, // Save organization name
            imageName: req.file.originalname,
            imagePath,
            uploadDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
          },
        },
      }
    );

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



