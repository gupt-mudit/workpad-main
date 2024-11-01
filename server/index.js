import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';
import mongoose from 'mongoose';
import Room from './models/Room.js';  // Room schema for MongoDB
import * as Y from 'yjs';
import url from 'url'; // Parse query strings
import Connection from './db.js';

// Connect to MongoDB
Connection();

// Store active rooms in memory
const activeRooms = {};

// Function to save the Y.Doc to MongoDB

// Function to load the Y.Doc from MongoDB

// Function to handle room setup and connection
async function setupRoomConnection(ws, roomName) {

    // Set up WebSocket connection for real-time updatessetupWSConnection(ws, );


    // Handle WebSocket disconnection
    ws.on('close', async () => {
        // Log when users leave the room
        console.log(`User left room ${roomName}, saving Y.Doc to DB`);
    });
}

// WebSocket server setup
const wss = new WebSocketServer({ port: 1234 });

wss.on('connection', (ws, req) => {
    const parsedUrl = url.parse(req.url, true);
    const roomName = parsedUrl.query.roomName;

    if (!roomName) {
        console.error('Room name is required');
        ws.close();
        return;
    }

    console.log(`Client connected to room: ${roomName}`);
    setupRoomConnection(ws, roomName);
});

// Handle errors globally
wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});

console.log('WebSocket server running on ws://localhost:1234');
