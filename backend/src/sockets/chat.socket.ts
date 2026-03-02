import { Server, Socket } from "socket.io";

import MessageService from "../services/message.service";

export const registerChatEvents = (io: Server, socket: Socket) => {
    socket.on("joinChannel", (channelId: string) => {
        const room = `channel-${channelId}`;
        socket.join(room);
        console.log(`User ${socket.id} joined channel ${channelId}`);
    });

    socket.on("sendMessage", async (data: { content: string, channelId: number, authorId: number, replyToMessageId?: number, clientMsgId?: string }) => {
        try {
            const message = await MessageService.createMessage(data.channelId, data.authorId, data.content, data.replyToMessageId, data.clientMsgId);
            console.log(`Message created with ID: ${message.id}`);
            io.to(`channel-${data.channelId}`).emit("receivedMessage", message);
            console.log(`Message sent to channel ${data.channelId}`);
            console.log("Rooms:", socket.rooms);
        } catch (error: any) {
            console.error("Error sending message:", error.message);
            socket.emit("error", { message: error.message });
        }
    });
};
