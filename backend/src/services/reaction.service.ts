import { prisma } from '../lib/prisma';

class ReactionService {
    static async create(messageId: number, emoji: string, userId: number)  {
        return prisma.reaction.create({
            data: {
                messageId,
                emoji,
                userId,
            }
        });
    }

    static async getExistingReaction(emoji: string, userId: number, messageId: number)  {
        return prisma.reaction.findUnique({
            where: {
                // @ts-ignore
                messageId_userId_emoji: {
                    messageId,
                    userId,
                    emoji,
                }
            }
        })
    }

    static async getReactionsForMessage(messageId: number) {
        return prisma.reaction.findMany({
            where: {
                messageId,
            }
        });
    }

    static async deleteReaction(reactionId: number, userId: number) {
        const reaction = await prisma.reaction.findUnique({
            where: {
                id: reactionId,
            }
        });

        if (!reaction) {
            throw new Error("Reaction not found");
        }

        if (reaction.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return prisma.reaction.delete({
            where: {
                id: reactionId,
            }
        });
    }

}

export default ReactionService;