import { Request, Response } from 'express';

import { io } from "../server";

import { prisma } from '../lib/prisma';
import ServerService from "../services/server.service";
import ServerMemberService from '../services/serverMember.service';
import { ChannelType } from '@prisma/client';
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';

export async function createServer(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { name, avatarUrl } = req.body;
    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
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
        return sendSuccess(res, 200, 'Server created successfully', data);

    } catch (error: any) {
        console.error('Error creating server:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to create server', 500);
    }
}

export async function updateServerProfile(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;
    const { name, avatarUrl } = req.body;
    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }
    try {
        await ServerService.updateServerProfile(Number(serverId), userId, name, avatarUrl);
        io.to(`server-${serverId}`).emit('serverProfileChanged', { serverId: Number(serverId), name: name, avatarUrl: avatarUrl });
        return sendSuccess(res, 200, 'Server profile updated successfully', null);
    } catch (error: any) {
        console.error('Error updating server profile:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to update server profile', 500);
    }
}

export async function deleteServerAvatar(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        await ServerService.deleteServerAvatar(Number(serverId), userId);
        io.to(`server-${serverId}`).emit('serverProfileChanged', { serverId: Number(serverId), avatarUrl: null });
        return sendSuccess(res, 200, 'Server avatar deleted successfully', null);
    } catch (error: any) {
        console.error('Error deleting server avatar:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to delete server avatar', 500);
    }
}

export async function getCurrentUserServers(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }
    try {
        const servers = await ServerMemberService.getCurrentUserServers(userId);
        return sendSuccess(res, 200, 'Servers retrieved successfully', servers);
    } catch (error: any) {
        console.error('Error retrieving servers:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to retrieve servers', 500);
    }
}

export async function deleteServer(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;
    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }
    try {
        await ServerService.deleteServer(Number(serverId), userId);
        return sendSuccess(res, 200, 'Server deleted successfully', null);
    } catch (error: any) {
        console.error('Error deleting server:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to delete server', 500);
    }
}