import 'dotenv/config';
import { Server } from "socket.io";
import { createServer } from 'http';

import app from './app';
import setupSocket from "./sockets";

const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

setupSocket(io);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
