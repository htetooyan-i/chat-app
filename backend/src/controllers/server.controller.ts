import { Request, Response } from 'express';

import { io } from "../server";

import { prisma } from '../lib/prisma';
import ServerService from "../services/server.service";
import ServerMemberService from '../services/serverMember.service';

export async function createServer(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { name } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const data = await prisma.$transaction(async (tx) => {
            const server = await tx.server.create({
                data: { name, ownerId: userId },
            });

            await tx.serverMember.create({
                data: { serverId: server.id, userId, role: server.ownerId === userId ? "OWNER" : "MEMBER" },
            });

            return server;
        });
        res.status(200).json({ message: 'Server created successfully', server: data });

    } catch (error: any) {
        console.error('Error creating server:', error.message);
        res.status(500).json({ message: error.message });
    }
}

export async function updateServerName(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;
    const { name } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const data = await ServerService.updateServerName(Number(serverId), name, userId);
        io.to(`server-${serverId}`).emit('serverNameChanged', { serverId: Number(serverId), name: name});
        res.status(200).json({ message: 'Server name updated successfully'});
    } catch (error: any) {
        console.error('Error updating server name:', error.message);
        res.status(500).json({ message: error.message });
    }
}

export async function getCurrentUserServers(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const servers = await ServerMemberService.getCurrentUserServers(userId);
        res.status(200).json({ message: 'Servers retrieved successfully', data: servers });
    } catch (error: any) {
        console.error('Error retrieving servers:', error.message);
        res.status(500).json({ message: error.message });
    }
}

export async function deleteServer(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        await ServerService.deleteServer(Number(serverId), userId);
        res.status(200).json({ message: 'Server deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting server:', error.message);
        res.status(500).json({ message: error.message });
    }
}