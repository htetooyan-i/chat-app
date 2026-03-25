import { ChannelErrorCode } from '../errors/channelErrors';
import { AppError } from '../errors/appError';
import { prisma } from '../lib/prisma';
import { ChannelType } from "@prisma/client";

class ChannelService {

    static async createChannel(serverId: number, name: string) {

        if (name === undefined || name.trim() === '') {
            throw new AppError(ChannelErrorCode.MISSING_PARAMETERS, 'Required parameters are missing.', 400);
        }

        const channel = await prisma.channel.create({
            data: {
            name,
            serverId,
            type: ChannelType.TEXT,
            },
        });
        return channel;
    }

    static async getChannelsForServer(serverId: number) {
        try {
            const channels = await prisma.channel.findMany({
                where: { serverId },
                orderBy: { createdAt: 'asc' },
            });
            return channels;
        } catch (error: any) {
            throw new AppError(ChannelErrorCode.INTERNAL_SERVER_ERROR, error.message || 'Failed to fetch channels', 500);
        }
    }

    static async getChannelById(channelId: number) {
        try {
            const channel = await prisma.channel.findUnique({
                where: { id: channelId },
            });
            return channel;
        } catch (error: any) {
            throw new AppError(ChannelErrorCode.INTERNAL_SERVER_ERROR, error.message || 'Failed to fetch channel', 500);
        }
    }

    static async updateChannelName(channelId: number, newName: string) {

        if (newName === undefined || newName.trim() === '') {
            throw new AppError(ChannelErrorCode.MISSING_PARAMETERS, 'Required parameters are missing.', 400);
        }

        try {
            const updatedChannel = await prisma.channel.update({
                where: { id: channelId },
                data: { name: newName },
            });
            return updatedChannel;
        } catch (error: any) {
            throw new AppError(ChannelErrorCode.INTERNAL_SERVER_ERROR, error.message || 'Failed to update channel', 500);
        }
    }

    static async deleteChannel(channelId: number, userId: number) {
        try {

            // get the channel along with its server to check if the user is the owner of the server
            const channel = await prisma.channel.findUnique({
                where: { id: channelId },
                include: { server: true },
            });

            if (!channel) {
                throw new AppError(ChannelErrorCode.CHANNEL_NOT_FOUND, 'Channel not found.', 404);
            }

            // delete the channel
            await prisma.channel.delete({
                where: { id: channelId },
            });
            
        } catch (error: any) {
            if (error instanceof AppError) throw error;
            throw new AppError(ChannelErrorCode.INTERNAL_SERVER_ERROR, error.message || 'Failed to delete channel', 500);
        }

    }

}

export default ChannelService;