import { Server } from "socket.io";
import { createServer } from 'http';
import 'dotenv/config';

import app from './app';
import setupSocket from "./sockets";

const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

setupSocket(io);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
