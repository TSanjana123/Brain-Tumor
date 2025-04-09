// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const User = require('./models/User');

// const app = express();
// app.use(cors());
// // const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
// }));

// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // MongoDB Connection
// mongoose.connect("mongodb+srv://sanjanathumpally:rootinc@sanjanaaa.ajf49.mongodb.net/brain_tumor?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(null, 'C:\\Users\\Dell\\Desktop\\BRAIN_TUMOR\\Brain-Tumor\\uploads\\');
//     cb(null, 'Brain-Tumor\\backend\\uploads\\');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // Signup Route
// // app.post('/api/signup', async (req, res) => {
// //   const { name, email, password, confirmPassword, role, patientId, organizationName } = req.body;

// //   if (password !== confirmPassword) {
// //     return res.status(400).json({ message: 'Passwords do not match' });
// //   }

// //   try {
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'Email already in use' });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role,
// //       patientId: role === 'patient' ? patientId : undefined,
// //       organizationName: role === 'medicalStaff' ? organizationName : undefined,
// //     });

// //     await newUser.save();
// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });
// // Signup Route
// app.post('/api/signup', async (req, res) => {
//   const { name, email, password, confirmPassword, role, patientId, organizationName, age, gender, referredDoctor } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       patientId: role === 'patient' ? patientId : undefined,
//       organizationName: role === 'medicalStaff' ? organizationName : undefined,
//       age: role === 'patient' ? age : undefined,
//       gender: role === 'patient' ? gender : undefined,
//       referredDoctor: role === 'patient' ? referredDoctor : undefined
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// /////////

// // Login Route
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id, role: user.role }, "4fX9@pZ1j3gPl3Xx8G#qT!91&nAkxZ7s", { expiresIn: '1h' });

//     res.status(200).json({
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token,
//       patientId: user.patientId,
//       organizationName: user.organizationName,
//     });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Route to fetch all patient IDs
// app.get('/api/patients', async (req, res) => {
//   try {
//     const patients = await User.find({ role: 'patient' }, { patientId: 1, _id: 0 });
//     if (!patients.length) {
//       return res.status(404).json({ message: 'No patients found' });
//     }
//     res.status(200).json(patients);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.get('/api/images', async (req, res) => {
//   try {
//     const usersWithImages = await User.find({ 'imageData.0': { $exists: true } }, 'patientId imageData');
//     const images = usersWithImages.flatMap((user) =>
//       user.imageData.map((img) => ({
//         patientId: user.patientId,
//         imageName: img.imageName,
//         imagePath: img.imagePath,
//         uploadDate: img.uploadDate,
//       }))
//     );
//     res.status(200).json(images);
//   } catch (err) {
//     console.error('Error fetching images:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// app.post('/api/uploads', upload.single('image'), async (req, res) => {
//   const { patientId, organizationName } = req.body; // Destructure organizationName from the request body
//   const imagePath = req.file.path;

//   try {
//     await User.updateOne(
//       { patientId },
//       {
//         $push: {
//           imageData: {
//             organizationName, // Save organization name
//             imageName: req.file.originalname,
//             imagePath,
//             uploadDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
//           },
//         },
//       }
//     );

//     res.status(200).json({ message: 'Image uploaded successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// // Add new patient
// app.get('/api/patients', async (req, res) => {
//   try {
//     const patients = await User.find({ role: 'patient' }); // Fetch all fields
//     if (!patients.length) {
//       return res.status(404).json({ message: 'No patients found' });
//     }
//     res.status(200).json(patients); // Return the full patient objects
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all patients
// // app.get('/api/patients', async (req, res) => {
// //   try {
// //     const patients = await Patient.find();
// //     res.status(200).json(patients);
// //   } catch (error) {
// //     console.error('Error fetching patients:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });
// // app.get('/api/patients/:patientId', async (req, res) => {
// //   const { patientId } = req.params;

// //   try {
// //       const patient = await Patient.findOne({ patientId });
// //       if (!patient) {
// //           return res.status(404).json({ message: 'Patient not found' });
// //       }

// //       // Ensure the backend sends the image URL along with patient details
// //       res.json({
// //           age: patient.age,
// //           gender: patient.gender,
// //           referredDoctor: patient.referredDoctor,
// //           imageUrl: patient.imageUrl, // Ensure this is stored in DB
// //       });

// //   } catch (error) {
// //       res.status(500).json({ error: 'Error fetching patient data' });
// //   }
// // });

// app.get('/api/patient/:patientId', async (req, res) => {
//   const { patientId } = req.params;

//   try {
//     const patient = await User.findOne({ patientId, role: 'patient' });

//     if (!patient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }

//     res.status(200).json({
//       name: patient.name,
//       age: patient.age,
//       gender: patient.gender,
//       referredDoctor: patient.referredDoctor,
//       email: patient.email,
//     });
//   } catch (err) {
//     console.error('Error fetching patient details:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// // Start the server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const User = require('./models/User'); // Import your User model

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // React front-end
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// MongoDB connection
mongoose.connect("mongodb+srv://sanjanathumpally:rootinc@sanjanaaa.ajf49.mongodb.net/brain_tumor?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Brain-Tumor\\backend\\uploads\\');
    // cb(null, 'uploads\\');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Signup route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, confirmPassword, role, patientId, organizationName, age, gender, referredDoctor } = req.body;

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
      age: role === 'patient' ? age : undefined,
      gender: role === 'patient' ? gender : undefined,
      referredDoctor: role === 'patient' ? referredDoctor : undefined,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
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

    const token = jwt.sign({ userId: user._id, role: user.role }, "your-jwt-secret", { expiresIn: '1h' });

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

// Fetch all patients data
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' });
    if (!patients.length) {
      return res.status(404).json({ message: 'No patients found' });
    }
    res.status(200).json(patients); // Return full patient data
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload images for patients
app.post('/api/uploads', upload.single('image'), async (req, res) => {
  const { patientId, organizationName } = req.body;
  const imagePath = req.file.path;

  try {
    await User.updateOne(
      { patientId },
      {
        $push: {
          imageData: {
            organizationName,
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
