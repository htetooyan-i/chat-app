import { Request, Response } from "express";

import ServerInviteService from "../services/serverInvite.service";
import ServerMemberService from "../services/serverMember.service";
import {io} from "../server";

export async function GetInvitesForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    try {
        const invites = await ServerInviteService.getInvitesForServer(Number(serverId));
        res.status(200).json({
            success: true,
            data: invites,
            message: "Invites retrieved successfully",
            error: null
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Failed to retrieve invites",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to retrieve invites"
            }
        });
    }
}

export async function CreateInvite(req: Request, res: Response) {

    const { serverId } = req.params;
    const userId = req.user?.userId;
    
    const { expiresInMinutes, maxUses } = req.body ?? {};


    if (!userId) {
        return res.status(401).json({
            success: false,
            data: null,
            message: "Unauthorized",
            error: {
                code: "UNAUTHORIZED",
                detail: "You must be logged in to perform this action"
            }
        });
    }

    try {
        const invite = await ServerInviteService.generate(Number(serverId), userId, expiresInMinutes, maxUses);
        io.to(`server-${serverId}`).emit('receivedNewInvite', invite);
        res.status(201).json({
            success: true,
            data: invite,
            message: "Invite created successfully",
            error: null
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Failed to create invite",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to create invite"
            }
        });
    }
}

export async function DeleteInvite(req: Request, res: Response) {
    const { serverId, inviteId } = req.params;

    try {
        await ServerInviteService.deleteInvite(Number(inviteId));
        io.to(`server-${serverId}`).emit('inviteDeleted', Number(inviteId));
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Failed to delete invite",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to delete invite"
            }
        });
    }
}

export async function DeleteInvitesByUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
        await ServerInviteService.deleteInvitesByUser(Number(userId));
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Failed to delete invites",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to delete invites"
            }
        });
    }
}

export async function JoinServerViaCode(req: Request, res: Response) {
    const { code } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            data: null,
            message: "Unauthorized",
            error: {
                code: "UNAUTHORIZED",
                detail: "You must be logged in to perform this action"
            }
        });
    }

    if (code.length !== Number(process.env.INVITE_CODE_LENGTH)) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Invalid invite code format",
            error: {
                code: "INVALID_INVITE_CODE",
                detail: `Invite code must be ${process.env.INVITE_CODE_LENGTH} characters long`
            }
        });
    }

    try {
        const invite = await ServerInviteService.verifyInvite(code as string);
        if (!invite) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Invite not found or expired",
                error: {
                    code: "INVITE_NOT_FOUND",
                    detail: "The invite you are trying to use does not exist or has expired"
                }
            });
        }

        const newMember = await ServerMemberService.addMember(invite.serverId, userId);
        const updatedInvite = await ServerInviteService.incrementInviteUsage(invite.id);

        io.to(`server-${newMember.serverId}`).emit("receivedNewMember", newMember);
        io.to(`server-${newMember.serverId}`).emit("inviteUpdated", { inviteId: updatedInvite.id, newCount: updatedInvite.currentUses});

        res.status(200).json({
            success: true,
            data: null,
            message: "Joined server successfully",
            error: null
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Failed to join server",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to join server"
            }
        });
    }
}

