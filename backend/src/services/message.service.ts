import { prisma } from "../lib/prisma";

class MessageService {

    static async getMessagesForChannel(channelId: number, pagination?: { skip: number; take: number }) {
        try {
            const messages = await prisma.message.findMany({
                where: { channelId },
                orderBy: { createdAt: 'desc' },
                skip: pagination?.skip || 0,
                take: pagination?.take || 50,
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true,
                        }
                    }
                }
            });
            return messages;
        } catch (error: any) {
            console.error("Error fetching messages:", error.message);
            throw new Error(error.message);
        }
    }

    static async getMessageById(
        messageId: number, 
        userId: number
    ) {
        try {
            const message = await prisma.message.findUnique({
                where: { id: messageId },
                include: {
                    channel: {
                        include: {
                            server: {
                                include: {
                                    members: {
                                        where: { userId },
                                    }
                                }
                            }
                        }
                    },
                }
            });

            if(!message) throw new Error('Message not found');
            if(!message.channel.server.members.length) throw new Error('Not a member of this server');

            return message;

        } catch (error: any) {
            console.error("Error fetching message by ID:", error.message);
            throw new Error(error.message);
        }
    }

    static async createMessage(// current implementation is very basic, I will add more features like attachments, embeds, reactions later
        channelId: number,
        authorId: number,
        content: string,
        replyToMessageId?: number,
        clientMsgId?: string
    ) {
        try {

            // Check if channel exists and if the author is a member of the server that the channel belongs to
            const channel = await prisma.channel.findUnique({
                where: { id: channelId },
                include: {
                    server: {
                        include: {
                            members: {
                                where: { userId: authorId },
                            }
                        }
                    }
                }
            });

            if (!channel) throw new Error('Channel not found');
            if (!channel.server.members.length) throw new Error('Not a member of this server');

            const message = await prisma.message.create({
                data: {
                    channelId,
                    authorId,
                    content,
                    replyToMessageId: replyToMessageId || null,
                    clientMsgId: clientMsgId || null,
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true
                        }
                    }
                }
            });

            return message;
        } catch (error: any) {
            console.error("Error creating message:", error.message);
            throw new Error(error.message);
        }
    }

    static async editMessage(
        messageId: number, 
        userId: number, 
        newContent: string
    ) {

        if (newContent === undefined || newContent.trim() === '') {
            throw new Error('Message content is required');
        }

        try {
            const message = await this.getMessageById(messageId, userId);
            
            // Check if the user is the author of the message
            if (message.authorId !== userId) {
                throw new Error('Not authorized to edit this message');
            }

            const updatedMessage = await prisma.message.update({
                where: { id: messageId },
                data: { content: newContent, editedAt: new Date() },
            });
            return updatedMessage;
        } catch (error: any) {
            console.error("Error updating message:", error.message);
            throw new Error(error.message);
        }
    }

    static async deleteMessage(
        messageId: number, 
        userId: number
    ) {
        try {

            const message = await this.getMessageById(messageId, userId);

            // Check if the user is the author of the message or has a role of OWNER, ADMIN, or MODERATOR in the server
            const requesterRole = message.channel.server.members[0].role;
            if (requesterRole !== 'OWNER' && requesterRole !== 'ADMIN' && requesterRole !== 'MODERATOR' && message.authorId !== userId) {
                throw new Error('Not authorized to delete this message');
            }

            await prisma.message.delete({
                where: { id: messageId },
            });
        } catch (error: any) {
            console.error("Error deleting message:", error.message);
            throw new Error(error.message);
        }
    }

    
}

export default MessageService;