import { Request, Response } from "express";

import MessageService from "../services/message.service";
import { io } from "../server";

export async function GetMessagesForChannel(req: Request, res: Response) {
    const { channelId } = req.params;
    const { before = '0', take = '50' } = req.query;
    try {
        const messages = await MessageService.getMessagesForChannel(Number(channelId), { before: Number(before), take: Number(take) });
        res.status(200).json(messages);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function CreateMessage(req: Request, res: Response) {
    const { channelId } = req.params;
    const userId = req.user?.userId;
    const { content, replyToMessageId, clientMsgId, attachments } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const message = await MessageService.createMessage(
            Number(channelId),
            userId,
            content,
            replyToMessageId,
            clientMsgId,
            attachments,
        );
        io.to(`channel-${channelId}`).emit("newMessage", message);
        res.status(201).json(message);
    } catch (error: any) {
        console.error("Error creating message:", error.message);
        res.status(400).json({ error: error.message });
    }
}

export async function EditMessage(req: Request, res: Response) {
    const { messageId } = req.params;
    const userId = req.user?.userId;
    const { content, attachments } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const updatedMessage = await MessageService.editMessage(Number(messageId), userId, content, attachments);
        io.to(`channel-${updatedMessage.channelId}`).emit("messageEdited", updatedMessage);
        res.status(200).json(updatedMessage);
    } catch (error: any) {
        console.error("Error editing message:", error.message);
        res.status(400).json({ error: error.message }); 
    }
}

export async function DeleteMessage(req: Request, res: Response) {
    const { channelId, messageId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        await MessageService.deleteMessage(Number(messageId), userId);
        console.log("Emitting messageDeleted to channel:", `channel-${channelId}`);
        io.to(`channel-${channelId}`).emit("messageDeleted", { messageId: Number(messageId) });
        res.status(204).send();
    } catch (error: any) {
        console.error("Error deleting message:", error.message);
        res.status(400).json({ error: error.message }); 
    }
}


