import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';

class ServerService {

    static async createServer(name: string, ownerId: number) {

        if (name === undefined || name.trim() === '') {
            throw new AppError('MISSING_PARAMETERS', 'Server name is required', 400);
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
            throw new AppError('INTERNAL_SERVER_ERROR', 'Could not create server', 500);
        }
    }

    static async updateServerProfile(serverId: number, userId: number, name?: string, avatarUrl?: string) {

        if (name === undefined || name.trim() === '') {
            throw new AppError('MISSING_PARAMETERS', 'Server name is required', 400);
        }

        try {
            const server = await prisma.server.findUnique({ where: { id: serverId } });
            if (!server) {
                throw new AppError('SERVER_NOT_FOUND', 'Server not found', 404);
            }
            const updatedServer = await prisma.server.update({
                where: { id: serverId },
                data: { name, avatarUrl },
            });
            return updatedServer;
        } catch (error: any) {
            console.error('Error updating server profile:', error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to update server profile', 500);
        }
    }

    static async deleteServerAvatar(serverId: number, userId: number) {
        try {
            const server = await prisma.server.findUnique({ where: { id: serverId } });
            if (!server) {
                throw new AppError('SERVER_NOT_FOUND', 'Server not found', 404);
            }
            const updatedServer = await prisma.server.update({
                where: { id: serverId },
                data: { avatarUrl: null },
            });
            return updatedServer;
        } catch (error: any) {
            console.error('Error deleting server avatar:', error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to delete server avatar', 500);
        }
    }

    static async deleteServer(serverId: number, userId: number) {
        try {
            const server = await prisma.server.findUnique({ where: { id: serverId } });
            if (!server) {
                throw new AppError('SERVER_NOT_FOUND', 'Server not found', 404);
            }
            await prisma.server.delete({ where: { id: serverId } });
        } catch (error: any) {
            console.error('Error deleting server:', error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to delete server', 500);
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
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to fetch server', 500);
        }
    }

}

export default ServerService;