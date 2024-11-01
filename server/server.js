import { Server } from 'socket.io';
import Connection from './db.js';
import { getRoom, updateRoom } from './controller/roomController.js';

const PORT = process.env.PORT || 9000;

Connection();
let content;
let roomId;
const io = new Server(PORT, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', async documentId => {
        const document = await getRoom(documentId);
        socket.join(documentId);
        socket.on('update-document', async data => {
            console.log("Saving document:", data);
            content = data;
            roomId=documentId

        });
    });

    socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.id);
        await updateRoom(roomId,content);
    });
});
