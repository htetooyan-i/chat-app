import { Server, Socket } from "socket.io";

import MessageService from "../services/message.service";

export const registerChatEvents = (io: Server, socket: Socket) => {

    socket.on("sendMessage", async (data: { content: string, channelId: number, authorId: number, replyToMessageId?: number, clientMsgId?: string }) => {
        console.log("Get message", data);
        try {
            const message = await MessageService.createMessage(data.channelId, data.authorId, data.content, data.replyToMessageId, data.clientMsgId);
            io.to(`channel-${data.channelId}`).emit("newMessage", message);
        } catch (error: any) {
            console.error("Error sending message:", error.message);
            socket.emit("error", { message: error.message });
        }
    });
};
