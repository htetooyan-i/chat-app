import { prisma } from '../lib/prisma';

class ServerService {

    static async createServer(name: string, ownerId: number) {
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