import { Request, Response } from 'express';

import { io } from "../server";

import { prisma } from '../lib/prisma';
import ServerService from "../services/server.service";
import ServerMemberService from '../services/serverMember.service';
import { ChannelType } from '@prisma/client';

export async function createServer(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { name, avatarUrl } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const data = await prisma.$transaction(async (tx) => {
            const server = await tx.server.create({
                data: { name, avatarUrl, ownerId: userId },
            });

            await tx.serverMember.create({
                data: { serverId: server.id, userId, role: server.ownerId === userId ? "OWNER" : "MEMBER" },
            });

            await tx.channel.create({
                data: { name: 'General', serverId: server.id, type: ChannelType.TEXT },
            });

            return server;
        });
        res.status(200).json({ message: 'Server created successfully', server: data });

    } catch (error: any) {
        console.error('Error creating server:', error.message);
        res.status(500).json({ message: error.message });
    }
}

export async function updateServerProfile(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;
    const { name, avatarUrl } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        await ServerService.updateServerProfile(Number(serverId), userId, name, avatarUrl);
        io.to(`server-${serverId}`).emit('serverProfileChanged', { serverId: Number(serverId), name: name, avatarUrl: avatarUrl });
        res.status(200).json({ message: 'Server profile updated successfully'});
    } catch (error: any) {
        console.error('Error updating server profile:', error.message);
        res.status(500).json({ message: error.message });
    }
}

export async function deleteServerAvatar(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await ServerService.deleteServerAvatar(Number(serverId), userId);
        io.to(`server-${serverId}`).emit('serverProfileChanged', { serverId: Number(serverId), avatarUrl: null });
        res.status(200).json({ message: 'Server avatar deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting server avatar:', error.message);
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