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

    static async updateServerName(serverId: number, name: string, userId: number) {

        if (name === undefined || name.trim() === '') {
            throw new Error('Server name is required');
        }

        try {
            const server = await prisma.server.findUnique({ where: { id: serverId } });
            if (!server) {
                throw new Error('Server not found');
            }
            if (server.ownerId !== userId) {
                throw new Error('Unauthorized');
            }
            const updatedServer = await prisma.server.update({
                where: { id: serverId },
                data: { name },
            });
            return updatedServer;
        } catch (error: any) {
            console.error('Error updating server name:', error.message);
            throw error;
        }
    }

    static async deleteServer(serverId: number, userId: number) {
        try {
            const server = await prisma.server.findUnique({ where: { id: serverId } });
            if (!server) {
                throw new Error('Server not found');
            }
            if (server.ownerId !== userId) {
                throw new Error('Unauthorized');
            }
            await prisma.server.delete({ where: { id: serverId } });
        } catch (error: any) {
            console.error('Error deleting server:', error.message);
            throw error;
        }
    }

}

export default ServerService;