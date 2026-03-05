import { Server, Socket } from "socket.io";

export const registerServerEvents = (io: Server, socket: Socket) => {
    socket.on("joinServer", (serverId: string) => {
        const room = `server-${serverId}`;
        socket.join(room);
        console.log(`User ${socket.id} joined server ${serverId}`);
    });
}
