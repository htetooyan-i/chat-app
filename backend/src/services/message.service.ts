import { prisma } from "../lib/prisma";
import { AttachmentType } from "@prisma/client"

import cloudinary from '../lib/cloudinary';
import { AppError } from '../errors/appError';

class MessageService {

    static async getMessagesForChannel(channelId: number, pagination?: { before: number; take: number }) {
        try {
            const messages = await prisma.message.findMany({
                where: { 
                    channelId,
                    ...(pagination?.before && {
                        id: { lt: pagination.before }
                    })
                },
                orderBy: { createdAt: 'desc' },
                take: pagination?.take || 50,
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true,
                        }
                    },
                    replyTo: {
                        select: {
                            id: true,
                            content: true,
                            author: {
                                select: {
                                    id: true,
                                    username: true,
                                    avatarUrl: true,
                                }
                            }
                        }
                    },
                    reactions: {
                        select: {
                            userId: true,
                            emoji: true
                        }
                    },
                    attachments: true
                }
            });

            // group reactions by emoji
            return messages.map(msg => ({
                ...msg,
                reactions: Object.values(
                    msg.reactions.reduce((acc, { emoji, userId }) => {
                        acc[emoji] ??= { emoji, count: 0, userIds: [] };
                        acc[emoji].count++;
                        acc[emoji].userIds.push(userId);
                        return acc;
                    }, {} as Record<string, { emoji: string; count: number; userIds: number[] }>)
                )
            }));

        } catch (error: any) {
            console.error("Error fetching messages:", error.message);
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to fetch messages', 500);
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
                    replies: { select: { id: true } },
                    channel: {
                        include: {
                            server: {
                                include: {
                                    members: {
                                        where: { userId },
                                    }
                                }
                            },
                        }
                    },
                    attachments: true,
                }
            });

            if(!message) throw new AppError('MESSAGE_NOT_FOUND', 'Message not found', 404);
            if(!message.channel.server.members.length) throw new AppError('FORBIDDEN', 'Not a member of this server', 403);

            return message;

        } catch (error: any) {
            console.error("Error fetching message by ID:", error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to fetch message', 500);
        }
    }

    static async createMessage(// current implementation is very basic, I will add more features like attachments, embeds, reactions later
        channelId: number,
        authorId: number,
        content: string,
        replyToMessageId?: number,
        clientMsgId?: string,
        attachments?: {publicId: string, url: string, type: string, originalName: string}[]
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

            if (!channel) throw new AppError('CHANNEL_NOT_FOUND', 'Channel not found', 404);
            if (!channel.server.members.length) throw new AppError('FORBIDDEN', 'Not a member of this server', 403);


            return await prisma.$transaction(async (tx) => {
                const message = await tx.message.create({
                    data: {
                        channelId,
                        authorId,
                        content,
                        replyToMessageId: replyToMessageId || null,
                        clientMsgId: clientMsgId || null,
                    },
                });

                if (attachments && attachments?.length > 0) {
                    await tx.attachment.createMany({
                        data: attachments.map((a: any) => ({
                            messageId: message.id,
                            channelId,
                            publicId: a.publicId,
                            url: a.url,
                            type: a.type.toUpperCase() as AttachmentType,
                            originalName: a.originalName,
                        })),
                    });
                }

                return tx.message.findUnique({
                    where: { id: message.id },
                    include: {
                        attachments: true,
                        author: true,
                        replyTo: {
                            include: { author: { select: { id: true, username: true, avatarUrl: true } } }
                        },
                    },
                });
            });

        } catch (error: any) {
            console.error("Error creating message:", error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to create message', 500);
        }
    }

    static async editMessage(
        messageId: number, 
        userId: number, 
        newContent: string,
        attachments?: {publicId: string, url: string, type: string, originalName: string}[]
    ) {


        try {
            const currentMessage = await this.getMessageById(messageId, userId);
            const hasContent = newContent && newContent.trim() !== '';
            const hasAttachments = attachments && attachments.length > 0;

            if (!currentMessage) {
                throw new AppError('MESSAGE_NOT_FOUND', 'Message not found', 404);
            }

            if (!hasContent && !hasAttachments) {
                throw new AppError('MISSING_PARAMETERS', 'Message must have content or attachments', 400);
            }

            const removedFiles = currentMessage.attachments.filter(a => !attachments?.some((att: any) => att.publicId === a.publicId));
            const addedFiles = attachments?.filter((att: any) => !currentMessage.attachments.some(a => a.publicId === att.publicId)) || [];

            const result = await prisma.$transaction(async (tx) => {
                if (removedFiles.length > 0) {
                    await tx.attachment.deleteMany({
                        where: { publicId: { in: removedFiles.map(a => a.publicId) } }
                    });
                }

                if (addedFiles.length > 0) {
                    await tx.attachment.createMany({
                        data: addedFiles.map((a: any) => ({
                            messageId,
                            channelId: currentMessage.channelId,
                            publicId: a.publicId,
                            url: a.url,
                            type: a.type.toUpperCase() as AttachmentType,
                            originalName: a.originalName,
                        })),
                    });
                }

                return await tx.message.update({
                    where: { id: messageId },
                    data: { content: newContent, editedAt: new Date() },
                    include: { attachments: true, author: true, replyTo: { include: { author: { select: { id: true, username: true, avatarUrl: true } } } } }
                });
            });

            // Delete removed files from Cloudinary
            await Promise.all(removedFiles.map(a =>
                cloudinary.uploader.destroy(a.publicId, {
                    resource_type: a.type.toLowerCase() as 'image' | 'video' | 'raw',
                    invalidate: true
                })
            ));

            return result;

        } catch (error: any) {
            console.error("Error updating message:", error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to update message', 500);
        }
    }

    static async deleteMessage(
        messageId: number, 
        userId: number
    ) {
        try {

            const message = await this.getMessageById(messageId, userId);
            if (!message) throw new AppError('MESSAGE_NOT_FOUND', 'Message not found', 404);

            // Check if the user is the author of the message or has a role of OWNER, ADMIN, or MODERATOR in the server
            const requesterRole = message.channel.server.members[0].role;
            if (requesterRole !== 'OWNER' && requesterRole !== 'ADMIN' && requesterRole !== 'MODERATOR' && message.authorId !== userId) {
                throw new AppError('FORBIDDEN', 'Not authorized to delete this message', 403);
            }

            await prisma.message.updateMany({
                where: { replyToMessageId: messageId },
                data: { replyToDeleted: true }
            });

            if (message.attachments.length > 0) {
                await Promise.all(message.attachments.map(a =>
                    cloudinary.uploader.destroy(a.publicId, {
                        resource_type: a.type.toLowerCase() as 'image' | 'video' | 'raw',
                        invalidate: true
                    })
                ));
            }
                

            await prisma.message.delete({ where: { id: messageId } });

        } catch (error: any) {
            console.error("Error deleting message:", error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to delete message', 500);
        }
    }

    
}

export default MessageService;