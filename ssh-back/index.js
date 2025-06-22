// index.js
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { handleSSHSession } from './controllers/sshController.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

const PORT = 5001;

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('🔌 WebSocket client connected');
  handleSSHSession(socket);
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});