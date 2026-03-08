import { Request, Response } from 'express';

import ReactionService from '../services/reaction.service';
import MessageService from '../services/message.service';

export async function createReaction(req: Request, res: Response) {
    const { messageId } = req.params;
    const { emoji } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).send({"Unauthorized": "User not authenticated"});
    }

    try {
        const message = await MessageService.getMessageById(Number(messageId), userId);
        if (!message) {
            return res.status(400).send({"Message not found": message});
        }

        const reaction = await ReactionService.create(Number(messageId), emoji, userId);
        return res.status(200).send({"Reaction created": reaction});
    } catch (error) {
        return res.status(500).send({"Failed to create reaction": error});
    }

}

export async function getReactionsForMessage(req: Request, res: Response) {
    const { messageId } = req.params;

    try {
        const reactions = await ReactionService.getReactionsForMessage(Number(messageId));
        return res.status(200).send({"Reactions for message": reactions});
    } catch (error) {
        return res.status(500).send({"Failed to get reactions": error});
    }
}

export async function deleteReaction(req: Request, res: Response) {
    const { reactionId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).send({"Unauthorized": "User not authenticated"});
    }

    try {
        await ReactionService.deleteReaction(Number(reactionId), userId);
        return res.status(200).send({"Reaction deleted": reactionId});
    } catch (error) {
        return res.status(500).send({"Failed to delete reaction": error});
    }
}