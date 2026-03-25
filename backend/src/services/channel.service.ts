import { ChannelErrorCode } from '../errors/channelErrors';
import { prisma } from '../lib/prisma';
import { ChannelType } from "@prisma/client";

class ChannelService {

    static async createChannel(serverId: number, name: string) {

        if (name === undefined || name.trim() === '') {
            throw new Error(ChannelErrorCode.MISSING_PARAMETERS);
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
            throw new Error(error.message);
        }
    }

    static async getChannelById(channelId: number) {
        try {
            const channel = await prisma.channel.findUnique({
                where: { id: channelId },
            });
            return channel;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async updateChannelName(channelId: number, newName: string) {

        if (newName === undefined || newName.trim() === '') {
            throw new Error(ChannelErrorCode.MISSING_PARAMETERS);
        }

        try {
            const updatedChannel = await prisma.channel.update({
                where: { id: channelId },
                data: { name: newName },
            });
            return updatedChannel;
        } catch (error: any) {
            throw new Error(error.message);
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
                throw new Error(ChannelErrorCode.MISSING_PARAMETERS);
            }

            // delete the channel
            await prisma.channel.delete({
                where: { id: channelId },
            });
            
        } catch (error: any) {
            throw new Error(error.message);
        }

    }

}

export default ChannelService;