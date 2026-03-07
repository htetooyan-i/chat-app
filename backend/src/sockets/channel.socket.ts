import { Server, Socket } from "socket.io";

export const registerChannelEvents = (io: Server, socket: Socket) => {
    socket.on("joinChannel", (channelId: number) => {
        const room = `channel-${channelId}`;
        socket.join(room);
        console.log(`Socket ${socket.id} joined room. All rooms:`, socket.rooms);
    });

    socket.on("typingStart", ({ channelId, userId, username }) => {
        const room = `channel-${channelId}`;
        console.log("Rooms this socket is in:", socket.rooms); 
        socket.to(room).emit("userTyping", { userId, username });
        console.log(`User ${username} is typing in channel ${channelId}`);
    });

    socket.on("typingStop", ({ channelId, userId, username }) => {
        const room = `channel-${channelId}`;
        socket.to(room).emit("userStopTyping", { userId, username });

    });

    socket.on("leaveChannel", (channelId: number) => {
        const room = `channel-${channelId}`;
        socket.leave(room);
    })
}
