import { prisma } from '../lib/prisma';

class ServerService {

    static async createServer(name: string, ownerId: number) {

        if (name === undefined || name.trim() === '') {
            throw new Error('Server name is required');
        }

        try {
            const server = await prisma.server.create({
                data: {
                    name,
                    ownerId,
                },
            });
            return server;
        } catch (error: any) {
            console.error('Error creating server:', error.message);
            throw new Error('Could not create server');
        }
    }

    static async updateServerProfile(serverId: number, userId: number, name?: string, avatarUrl?: string) {

        if (name === undefined || name.trim() === '') {
            throw new Error('Server name is required');
        }

        try {
            const server = await prisma.server.findUnique({ where: { id: serverId } });
            if (!server) {
                throw new Error('Server not found');
            }
            const updatedServer = await prisma.server.update({
                where: { id: serverId },
                data: { name, avatarUrl },
            });
            return updatedServer;
        } catch (error: any) {
            console.error('Error updating server profile:', error.message);
            throw error;
        }
    }

    static async deleteServerAvatar(serverId: number, userId: number) {
        try {
            const server = await prisma.server.findUnique({ where: { id: serverId } });
            if (!server) {
                throw new Error('Server not found');
            }
            const updatedServer = await prisma.server.update({
                where: { id: serverId },
                data: { avatarUrl: null },
            });
            return updatedServer;
        } catch (error: any) {
            console.error('Error deleting server avatar:', error.message);
            throw error;
        }
    }

    static async deleteServer(serverId: number, userId: number) {
        try {
            const server = await prisma.server.findUnique({ where: { id: serverId } });
            if (!server) {
                throw new Error('Server not found');
            }
            await prisma.server.delete({ where: { id: serverId } });
        } catch (error: any) {
            console.error('Error deleting server:', error.message);
            throw error;
        }
    }

    static async getServerById(serverId: number) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });
            return server;
        } catch (error: any) {
            console.error('Error fetching server by ID:', error.message);
            throw new Error(error.message);
        }
    }

}

export default ServerService;