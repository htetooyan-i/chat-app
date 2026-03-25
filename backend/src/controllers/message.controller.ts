import { Request, Response } from "express";

import MessageService from "../services/message.service";
import { io } from "../server";
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';

export async function GetMessagesForChannel(req: Request, res: Response) {
    const { channelId } = req.params;
    const { before = '0', take = '50' } = req.query;
    try {
        const messages = await MessageService.getMessagesForChannel(Number(channelId), { before: Number(before), take: Number(take) });
        return sendSuccess(res, 200, 'Messages fetched successfully', messages);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to fetch messages', 400);
    }
}

export async function CreateMessage(req: Request, res: Response) {
    const { channelId } = req.params;
    const userId = req.user?.userId;
    const { content, replyToMessageId, clientMsgId, attachments } = req.body;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
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
        return sendSuccess(res, 201, 'Message created successfully', message);
    } catch (error: any) {
        console.error("Error creating message:", error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to create message', 400);
    }
}

export async function EditMessage(req: Request, res: Response) {
    const { messageId } = req.params;
    const userId = req.user?.userId;
    const { content, attachments } = req.body;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        const updatedMessage = await MessageService.editMessage(Number(messageId), userId, content, attachments);
        io.to(`channel-${updatedMessage.channelId}`).emit("messageEdited", updatedMessage);
        return sendSuccess(res, 200, 'Message edited successfully', updatedMessage);
    } catch (error: any) {
        console.error("Error editing message:", error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to edit message', 400);
    }
}

export async function DeleteMessage(req: Request, res: Response) {
    const { channelId, messageId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        await MessageService.deleteMessage(Number(messageId), userId);
        io.to(`channel-${channelId}`).emit("messageDeleted", { messageId: Number(messageId) });
        return sendSuccess(res, 200, 'Message deleted successfully', null);
    } catch (error: any) {
        console.error("Error deleting message:", error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to delete message', 400);
    }
}


