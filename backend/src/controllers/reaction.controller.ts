import { Request, Response } from 'express';

import ReactionService from '../services/reaction.service';
import MessageService from '../services/message.service';
import { io } from '../server';
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';

export async function toggleReaction(req: Request, res: Response) {
    const { messageId } = req.params;
    const { emoji } = req.body;
    const userId = req.user?.userId;

    if (!userId || !emoji) {
        return sendError(res, 401, 'UNAUTHORIZED', 'User not authenticated');
    }

    try {
        const message = await MessageService.getMessageById(Number(messageId), userId);
        if (!message) {
            return sendError(res, 400, 'MESSAGE_NOT_FOUND', 'Message not found');
        }

        const existingReaction = await ReactionService.getExistingReaction(emoji, userId, Number(messageId));

        if (!existingReaction) {

            const reaction = await ReactionService.create(Number(messageId), emoji, userId);
            io.to(`channel-${message.channelId}`).emit("reactionToggled", {
                messageId: Number(messageId),
                reaction: reaction,
                action: "added"
            });
            return sendSuccess(res, 200, 'Reaction created', reaction);

        } else {

            await ReactionService.deleteReaction(existingReaction.id, userId);
            io.to(`channel-${message.channelId}`).emit("reactionToggled", {
                messageId: Number(messageId),
                reaction: existingReaction,
                action: "deleted"
            });
            return sendSuccess(res, 200, 'Reaction deleted', null);

        }

    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to react', 500);
    }

}

export async function getReactionsForMessage(req: Request, res: Response) {
    const { messageId } = req.params;

    try {
        const reactions = await ReactionService.getReactionsForMessage(Number(messageId));
        return sendSuccess(res, 200, 'Reactions fetched successfully', reactions);
    } catch (error) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to get reactions', 500);
    }
}

export async function deleteReaction(req: Request, res: Response) {
    const { messageId, reactionId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'User not authenticated');
    }

    try {

        const message = await MessageService.getMessageById(Number(messageId), userId);
        if (!message) {
            return sendError(res, 400, 'MESSAGE_NOT_FOUND', 'Message not found');
        }

        await ReactionService.deleteReaction(Number(reactionId), userId);

        io.to(`channel-${message.channelId}`).emit("reactionDeleted", { reactionId: Number(reactionId) });
        return sendSuccess(res, 200, 'Reaction deleted', { reactionId: Number(reactionId) });
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to delete reaction', 500);
    }
}