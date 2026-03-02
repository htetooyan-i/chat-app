import { registerChatEvents } from "./chat.socket";

const setupSocket = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('User connected:', socket.id);
    registerChatEvents(io, socket);
  });
};

export default setupSocket;