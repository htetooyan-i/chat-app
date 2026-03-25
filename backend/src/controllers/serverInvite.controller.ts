import { Request, Response } from "express";

import ServerInviteService from "../services/serverInvite.service";
import ServerMemberService from "../services/serverMember.service";
import {io} from "../server";
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';

export async function GetInvitesForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    try {
        const invites = await ServerInviteService.getInvitesForServer(Number(serverId));
        return sendSuccess(res, 200, 'Invites retrieved successfully', invites);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to retrieve invites', 400);
    }
}

export async function CreateInvite(req: Request, res: Response) {

    const { serverId } = req.params;
    const userId = req.user?.userId;
    
    const { expiresInMinutes, maxUses } = req.body ?? {};


    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'You must be logged in to perform this action');
    }

    try {
        const invite = await ServerInviteService.generate(Number(serverId), userId, expiresInMinutes, maxUses);
        io.to(`server-${serverId}`).emit('receivedNewInvite', invite);
        return sendSuccess(res, 201, 'Invite created successfully', invite);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to create invite', 400);
    }
}

export async function DeleteInvite(req: Request, res: Response) {
    const { serverId, inviteId } = req.params;

    try {
        await ServerInviteService.deleteInvite(Number(inviteId));
        io.to(`server-${serverId}`).emit('inviteDeleted', Number(inviteId));
        return sendSuccess(res, 200, 'Invite deleted successfully', null);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to delete invite', 400);
    }
}

export async function DeleteInvitesByUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
        await ServerInviteService.deleteInvitesByUser(Number(userId));
        return sendSuccess(res, 200, 'Invites deleted successfully', null);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to delete invites', 400);
    }
}

export async function JoinServerViaCode(req: Request, res: Response) {
    const { code } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'You must be logged in to perform this action');
    }

    if (code.length !== Number(process.env.INVITE_CODE_LENGTH)) {
        return sendError(res, 400, 'INVALID_INVITE_CODE', `Invite code must be ${process.env.INVITE_CODE_LENGTH} characters long`);
    }

    try {
        const invite = await ServerInviteService.verifyInvite(code as string);
        if (!invite) {
            return sendError(res, 404, 'INVITE_NOT_FOUND', 'The invite you are trying to use does not exist or has expired');
        }

        const newMember = await ServerMemberService.addMember(invite.serverId, userId);
        const updatedInvite = await ServerInviteService.incrementInviteUsage(invite.id);

        io.to(`server-${newMember.serverId}`).emit("receivedNewMember", newMember);
        io.to(`server-${newMember.serverId}`).emit("inviteUpdated", { inviteId: updatedInvite.id, newCount: updatedInvite.currentUses});

        return sendSuccess(res, 200, 'Joined server successfully', null);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to join server', 400);
    }
}

