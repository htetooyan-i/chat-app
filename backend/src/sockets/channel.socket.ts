import { Server, Socket } from "socket.io";

export const registerChannelEvents = (io: Server, socket: Socket) => {
    socket.on("joinChannel", (channelId: number) => {
        const room = `channel-${channelId}`;
        socket.join(room);
    });

    socket.on("typingStart", ({ channelId, userId, username }) => {
        const room = `channel-${channelId}`;
        socket.to(room).emit("userTyping", { userId, username });
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
