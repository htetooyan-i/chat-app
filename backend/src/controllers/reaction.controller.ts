import { Request, Response } from 'express';

import ReactionService from '../services/reaction.service';
import MessageService from '../services/message.service';
import { io } from '../server';

export async function toggleReaction(req: Request, res: Response) {
    const { messageId } = req.params;
    const { emoji } = req.body;
    const userId = req.user?.userId;

    if (!userId || !emoji) {
        return res.status(401).send({message: "Unauthorized", detail: "User not authenticated"});
    }

    try {
        const message = await MessageService.getMessageById(Number(messageId), userId);
        if (!message) {
            return res.status(400).send({message: "Message not found"});
        }

        const existingReaction = await ReactionService.getExistingReaction(emoji, userId, Number(messageId));

        if (!existingReaction) {

            const reaction = await ReactionService.create(Number(messageId), emoji, userId);
            io.to(`channel-${message.channelId}`).emit("reactionToggled", {
                messageId: Number(messageId),
                reaction: reaction,
                action: "added"
            });
            return res.status(200).send({message: "Reaction created", reaction });

        } else {

            await ReactionService.deleteReaction(existingReaction.id, userId);
            io.to(`channel-${message.channelId}`).emit("reactionToggled", {
                messageId: Number(messageId),
                reaction: existingReaction,
                action: "deleted"
            });
            return res.status(200).send({message: "Reaction deleted"});

        }

    } catch (error: any) {
        return res.status(500).send({message: "Failed to react", detail: error});
    }

}

export async function getReactionsForMessage(req: Request, res: Response) {
    const { messageId } = req.params;

    try {
        const reactions = await ReactionService.getReactionsForMessage(Number(messageId));
        return res.status(200).send({message: "Reactions for message", reactions });
    } catch (error) {
        return res.status(500).send({message: "Failed to get reactions", detail: error});
    }
}

export async function deleteReaction(req: Request, res: Response) {
    const { messageId, reactionId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).send({message: "Unauthorized", detail: "User not authenticated"});
    }

    try {

        const message = await MessageService.getMessageById(Number(messageId), userId);
        if (!message) {
            return res.status(400).send({message: "Message not found"});
        }

        await ReactionService.deleteReaction(Number(reactionId), userId);

        io.to(`channel-${message.channelId}`).emit("reactionDeleted", { reactionId: Number(reactionId) });
        return res.status(200).send({message: "Reaction deleted", reactionId });
    } catch (error: any) {
        return res.status(500).send({message: "Failed to delete reaction", detail: error});
    }
}