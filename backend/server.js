



const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Used for directory check and file deletion
const User = require('./models/User'); // Make sure path is correct

const app = express();

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



// --- Middleware ---
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// --- Static Files ---
const uploadsDir = path.join(__dirname, 'uploads');
// Ensure uploads directory exists
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
        cb(null, uploadsDir); // Use the validated uploads directory path
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

// --- Authentication Middleware (Example - Apply where needed) ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            console.error("JWT Verification Error:", err.message);
            return res.sendStatus(403); // Forbidden (invalid token)
        }
        req.user = user; // Add decoded user payload to request object
        next();
    });
};

// --- API Routes ---

// Signup Route
app.post('/api/signup', async (req, res) => {
    const { name, email, role, password, patientId, organizationName, gender, dateOfBirth, referredDoctor } = req.body;

    // Basic Validation
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Missing required fields (name, email, password, role)' });
    }
    if (role === 'patient' && !patientId) {
        return res.status(400).json({ message: 'Patient ID is required for patient role' });
    }
    // Add stricter validation (email format, password strength, date format etc.)

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
            name,
            email,
            password: hashedPassword,
            role,
            patientId: role === 'patient' ? patientId : undefined,
            organizationName, // Store for all? Adjust if needed.
            gender: role === 'patient' ? gender : undefined,
            dateOfBirth: role === 'patient' ? dateOfBirth : undefined,
            referredDoctor: role === 'patient' ? referredDoctor : undefined,
            imageData: [],
            chatHistory: [],
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
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const payload = {
            userId: user._id,
            role: user.role,
            name: user.name,
        };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

        res.status(200).json({
            token,
            user: { // Send necessary user info, exclude password
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                patientId: user.patientId,
                organizationName: user.organizationName,
            }
        });

    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Get All Patients Route
// TODO: Add authentication (e.g., ensure only admin/staff can access)
// app.get('/api/patients', authenticateToken, async (req, res) => { // Example with auth
app.get('/api/patients', async (req, res) => {
    // Optional: Check req.user.role if using authentication
    // if (req.user.role !== 'admin' && req.user.role !== 'staff') {
    //     return res.status(403).json({ message: 'Access forbidden: Insufficient privileges.' });
    // }
    try {
        const patients = await User.find({ role: 'patient' }).select('-password'); // Exclude password

        res.status(200).json(patients); // Return patients (empty array if none found)

    } catch (err) {
        console.error("Error fetching patients:", err);
        res.status(500).json({ message: 'Server error fetching patients' });
    }
});

// Upload Image Route
// TODO: Add authentication (e.g., ensure logged-in user can upload, maybe check role)
app.post('/api/upload', upload.single('image'), async (req, res) => {
    const { patientId, organizationName } = req.body;
    // Add validation: Ensure patientId exists and corresponds to a patient role user

    if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
    }
    if (!patientId) {
        // Clean up uploaded file if patientId is missing
        fs.unlink(req.file.path, (err) => {
            if (err) console.error(`Error deleting orphaned file ${req.file.path}:`, err);
        });
        return res.status(400).json({ message: 'Patient ID is required' });
    }

    // Path relative to the '/uploads' static route
    // Ensure forward slashes for consistency, especially for URLs
    const servedImagePath = `uploads/${req.file.filename}`.replace(/\\/g, '/');

    try {
        const patient = await User.findOne({ patientId: patientId, role: 'patient' });

        if (!patient) {
            // If no patient found, clean up the uploaded file
            fs.unlink(req.file.path, (err) => {
                if (err) console.error(`Error deleting orphaned file ${req.file.path}:`, err);
            });
            return res.status(404).json({ message: 'Patient not found' });
        }

        const newImageData = {
            // Mongoose will add _id automatically here
            organizationName: organizationName || 'Unknown Org',
            imageName: req.file.originalname,
            imagePath: servedImagePath, // Store the relative path
            uploadDate: new Date(),
            // prediction: undefined // Initialize prediction if needed
        };

        patient.imageData.push(newImageData);
        await patient.save();

        // Find the newly added image data to include its _id in the response if needed
        const addedImage = patient.imageData[patient.imageData.length - 1];

        res.status(200).json({
            message: 'Image uploaded successfully',
            filePath: servedImagePath,
            imageId: addedImage._id // Send back the ID of the created image subdocument
        });

    } catch (err) {
        console.error("Image Upload Error:", err);
        // Clean up uploaded file on error
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) console.error(`Error deleting file ${req.file.path} after upload error:`, unlinkErr);
        });
        res.status(500).json({ message: 'Server error during image upload' });
    }
});

// Update Prediction for a Specific Image
// TODO: Add authentication
app.put('/api/patients/:patientId/images/:imageId/predict', async (req, res) => {
    const { patientId, imageId } = req.params;
    const { prediction } = req.body;

    if (!prediction) {
        return res.status(400).json({ message: 'Prediction result is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(imageId)) {
        return res.status(400).json({ message: 'Invalid image ID format' });
    }

    try {
        const updateResult = await User.updateOne(
            // Use patientId for matching user, and imageId for matching subdocument
            { patientId: patientId, role: 'patient', "imageData._id": new mongoose.Types.ObjectId(imageId) },
            { $set: { "imageData.$.prediction": prediction } } // Update only the prediction of the matched image
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: 'Patient or specific image not found' });
        }

        if (updateResult.modifiedCount === 0 && updateResult.matchedCount === 1) {
            // Found but not modified, maybe prediction was the same
             return res.status(200).json({ message: 'Prediction unchanged (already set to this value or no change needed)' });
        }

        console.log(`Prediction updated for patient ${patientId}, image ${imageId}`);
        // Optionally: Fetch and return the updated user document
         const updatedUser = await User.findOne({ patientId: patientId, role: 'patient' }).select('-password');
         res.status(200).json(updatedUser || { message: 'Prediction updated successfully' });


    } catch (err) {
        console.error(`Error updating prediction for patient ${patientId}, image ${imageId}:`, err);
        res.status(500).json({ message: 'Server error updating prediction' });
    }
});

// Update Image Path for a Specific Image
// TODO: Add authentication (ensure user has permission to update)
app.put('/api/patients/:userId/images/:imageId/path', async (req, res) => {
    const { userId, imageId } = req.params;
    const { newImagePath } = req.body; // Expecting { "newImagePath": "new/path/to/image.jpg" }

    // Validation
    if (!newImagePath || typeof newImagePath !== 'string' || newImagePath.trim() === '') {
        return res.status(400).json({ message: 'New image path is required and must be a non-empty string' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
         return res.status(400).json({ message: 'Invalid user ID format' });
    }
    if (!mongoose.Types.ObjectId.isValid(imageId)) {
        return res.status(400).json({ message: 'Invalid image ID format' });
    }

    // Consider adding validation for the path format if necessary (e.g., ensure it starts with 'uploads/')

    try {
        // Find the user and the specific image, then update the path
        const updateResult = await User.updateOne(
            {
                _id: new mongoose.Types.ObjectId(userId),       // Match user by _id
                role: 'patient',                               // Ensure it's a patient
                "imageData._id": new mongoose.Types.ObjectId(imageId) // Match specific image in the array
            },
            {
                $set: { "imageData.$.imagePath": newImagePath.trim() } // Update only the imagePath of the matched element ($)
            }
        );

        // Check if the update was successful
        if (updateResult.matchedCount === 0) {
            // No document matched the criteria (user not found, or image not found within that user)
            return res.status(404).json({ message: 'Patient or specific image not found' });
        }

        if (updateResult.modifiedCount === 0 && updateResult.matchedCount === 1) {
            // Document was found, but the path was not modified (it might be the same as the existing path)
            console.log(`Image path update requested for user ${userId}, image ${imageId}, but value was likely unchanged.`);
            // Still fetch and return the user data as the state is consistent
        } else {
            console.log(`Image path updated successfully for user ${userId}, image ${imageId}`);
        }

        // Fetch the updated user document to send back to the client
        const updatedUser = await User.findById(userId).select('-password'); // Exclude password
        if (!updatedUser) {
            // Should not happen if update succeeded, but handle defensively
             return res.status(404).json({ message: 'Updated user not found after update operation.' });
        }

        res.status(200).json(updatedUser); // Send the full updated user document back

    } catch (err) {
        console.error(`Error updating image path for user ${userId}, image ${imageId}:`, err);
        res.status(500).json({ message: 'Server error updating image path' });
    }
});

// --- NEW ROUTE: Delete Specific Image ---
// TODO: Add authentication (ensure user has permission to delete)
app.delete('/api/patients/:userId/images/:imageId', async (req, res) => {
    const { userId, imageId } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
         return res.status(400).json({ message: 'Invalid user ID format' });
    }
    if (!mongoose.Types.ObjectId.isValid(imageId)) {
        return res.status(400).json({ message: 'Invalid image ID format' });
    }

    try {
        // 1. Find the user and the image to get the path *before* deleting the record
        const user = await User.findOne(
            { _id: userId, role: 'patient', "imageData._id": imageId },
            { 'imageData.$': 1 } // Project only the matching imageData element
        );

        if (!user || !user.imageData || user.imageData.length === 0) {
            return res.status(404).json({ message: 'Patient or specific image not found' });
        }

        const imageToDelete = user.imageData[0]; // The matched image subdocument
        const imagePathToDelete = imageToDelete.imagePath; // e.g., "uploads/unique-name.jpg"

        // 2. Remove the image subdocument from the user's imageData array
        const updateResult = await User.updateOne(
            { _id: userId },
            { $pull: { imageData: { _id: imageId } } } // Use $pull to remove the item from the array
        );

        if (updateResult.modifiedCount === 0) {
            // This might happen if the image was already deleted between step 1 and 2 (race condition)
            // or if the findOne found it but updateOne somehow didn't. Treat as not found.
            console.warn(`Image ${imageId} for user ${userId} was found but DB record update failed (modifiedCount=0).`);
            // You could re-query here to be sure, but often $pull handles this gracefully.
            // Proceed to attempt file deletion anyway, as the goal is deletion.
            // return res.status(404).json({ message: 'Image record could not be removed from database.' });
        }

        // 3. Delete the actual image file from the filesystem
        if (imagePathToDelete) {
            const fullPath = path.join(__dirname, imagePathToDelete); // Get the absolute path
            console.log(`Attempting to delete file: ${fullPath}`);

            fs.unlink(fullPath, (err) => {
                if (err && err.code === 'ENOENT') {
                    // File not found - might have been deleted manually or already processed
                    console.log(`File not found (already deleted?): ${fullPath}`);
                } else if (err) {
                    // Other error deleting file (e.g., permissions)
                    console.error(`Error deleting file ${fullPath}:`, err);
                    // Note: The database record is already deleted. We might log this failure
                    // but still return success for the DB operation. Or return a specific error.
                    // For simplicity here, we log the error but still report overall success.
                } else {
                    console.log(`Successfully deleted file: ${fullPath}`);
                }
            });
        } else {
            console.warn(`No imagePath found for image ${imageId} of user ${userId}. Cannot delete file.`);
        }

        console.log(`Image record ${imageId} deleted successfully for user ${userId}`);
        // Send success response - you could also send back the updated user doc if needed
        res.status(200).json({ message: 'Image deleted successfully' });

    } catch (err) {
        console.error(`Error deleting image ${imageId} for user ${userId}:`, err);
        res.status(500).json({ message: 'Server error deleting image' });
    }
});
// --- END OF NEW DELETE ROUTE ---
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
             systemInstruction: "You are a helpful medical assistant AI. You are discussing a medical image (e.g., a brain scan) with a patient. The image has a preliminary prediction. Be informative, empathetic, and clarify that you are not a doctor and your information is not a diagnosis. Always advise the user to consult with their doctor for any medical decisions or serious concerns.",
            // systemInstruction: "You are a helpful medical assistant AI. You are discussing a medical image (e.g., a brain scan) with a patient. The image has a preliminary prediction. Be informative, empathetic.",
        //    systemInstruction: "You are an intelligent and compassionate AI assistant trained to interpret MRI brain scans using a deep learning model with 44 tumor classes. For every patient query, respond in exactly four concise lines. Explain the prediction, briefly describe the tumor type (if any), and offer supportive guidance. Always remind the user that final diagnosis and treatment decisions should be made by a medical professional."
        //    systemInstruction: "give everything"

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


// --- Server Start ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`------------------------------------------------------`);
    console.log(`Server running on port ${PORT}`);
    console.log(`Local access:   http://localhost:${PORT}`);
    // Find local IP for network access (optional)
    try {
        const { networkInterfaces } = require('os');
        const nets = networkInterfaces();
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    console.log(`Network access: http://${net.address}:${PORT}`);
                    break; // Show first non-internal IPv4
                }
            }
        }
    } catch(e) { console.log("Could not determine network IP.")}

    console.log(`Frontend URL:   ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    console.log(`Static files:   ${uploadsDir}`);
    console.log(`------------------------------------------------------`);
});

// --- Graceful Shutdown ---
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


