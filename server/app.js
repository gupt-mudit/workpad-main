// File: api.js
import express from 'express';
import mongoose from 'mongoose';
import Room from './models/Room.js'; // Ensure the path to your model is correct
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL if different
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/doc-clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Fetch all documents
app.get('/api/documents', async (req, res) => {
    try {
        const documents = await Room.find();
        res.json(documents);
    } catch (error) {
        res.status(500).send('Error fetching documents');
    }
});

// Create a new document
app.post('/api/documents', async (req, res) => {
    const newRoom = new Room({
        name: req.body.title,
        state: null // Initially set state to null
    });

    try {
        const savedRoom = await newRoom.save();
        res.json(savedRoom);
    } catch (error) {
        res.status(500).send('Error creating document');
    }
});

// Update room state
app.put('/api/documents/:id/state', async (req, res) => {
    const { id: documentId } = req.params;
    const { state } = req.body; // Expecting the state from frontend

    try {
        console.log("Updating room state for document:", documentId);
        const updatedRoom = await Room.findByIdAndUpdate(
            documentId,
            { state: state },  // Store the state as it comes from frontend
            { new: true }  // Return the updated document
        );

        if (!updatedRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(updatedRoom);
    } catch (error) {
        console.error('Error updating document state:', error);
        res.status(500).send('Error updating document state');
    }
});

// Fetch a document by ID
app.get('/api/documents/:id', async (req, res) => {
    const { id: documentId } = req.params;
    try {
        console.log("Fetching room for document:", documentId);
        const room = await Room.findById(documentId);

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).send('Error fetching document');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
