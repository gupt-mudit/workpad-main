// File: models/Room.js
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: Object,  // The Yjs document state will be saved as binary data
        default: null
    }
});

const Room = mongoose.model('Room2', roomSchema);
export default Room;
