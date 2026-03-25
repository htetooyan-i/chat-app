import express, { Request, Response } from 'express';
import { io } from "../server";

import ServerMemberService from '../services/serverMember.service';
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';

export async function addMemberToServer(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;
    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }
    try {
        const data = await ServerMemberService.addMember(Number(serverId), userId);
        io.to(`server-${serverId}`).emit("receivedNewMember", data);
        return sendSuccess(res, 200, 'Member added to server successfully', data);
    } catch (error: any) {
        console.error('Error adding member to server:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to add member to server', 500);
    }

}

export async function getServerMember(req: Request, res: Response) {
    const { serverId } = req.params;
    const userId = req.user?.userId;
    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        const member = await ServerMemberService.getServerMember(Number(serverId), userId);
        if (!member) {
            return sendError(res, 404, 'MEMBER_NOT_FOUND', 'Member not found');
        }
        return sendSuccess(res, 200, 'Server member retrieved successfully', member);
    } catch (error: any) {
        console.error('Error retrieving server member:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to retrieve server member', 500);
    }
}

export async function removeMemberFromServer(req: Request, res: Response) {
    const { serverId } = req.params;
    const { userId } = req.body;
    const requesterId = req.user?.userId;

    if (!requesterId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        await ServerMemberService.removeMember(Number(serverId), Number(userId), requesterId);
        io.to(`server-${serverId}`).emit('memberLeft', userId);
        return sendSuccess(res, 200, 'Member removed from server successfully', null);
    } catch (error: any) {
        console.error('Error removing member from server:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to remove member from server', 500);
    }
}

export async function leaveServer(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }
    try {
        await ServerMemberService.leaveServer(Number(serverId), userId);
        io.to(`server-${serverId}`).emit('memberLeft', userId);
        return sendSuccess(res, 200, 'Left server successfully', null);
    } catch (error: any) {
        console.error('Error leaving server:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to leave server', 500);
    }
}

export async function getServerMembers(req: Request, res: Response) {
    const { serverId } = req.params;
    try {
        const members = await ServerMemberService.getServerMembers(Number(serverId));
        return sendSuccess(res, 200, 'Server members retrieved successfully', members);
    } catch (error: any) {
        console.error('Error retrieving server members:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to retrieve server members', 500);
    }
}

export async function changeMemberRole(req: Request, res: Response) {
    const { serverId } = req.params;
    const { newRole } = req.body;
    const userId = Array.isArray(req.params.userId) ? Number(req.params.userId[0]) : Number(req.params.userId);

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        await ServerMemberService.changeMemberRole(Number(serverId), userId, newRole);
        io.to(`server-${serverId}`).emit('changedMemberRole', {userId, newRole});
        return sendSuccess(res, 200, 'Member role updated successfully', null); 
    } catch (error: any) {
        console.error('Error changing member role:', error.message);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to change member role', 500);

    }
}
