import { Request, Response } from "express";

import BanService from "../services/ban.service";
import { io } from "../server";
import { MemberRole } from "@prisma/client";
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';

export async function handleBanRequest(req: Request, res: Response) {
    try {
        const { serverId, userId } = req.params;
        const { reason, duration } = req.body;
        const requester = req.member; // from auth middleware

        if (!requester) {
            return sendError(res, 401, 'UNAUTHORIZED', 'You must be logged in to perform this action');
        }
        const isPrivileged =
            requester.role === MemberRole.OWNER ||
            requester.role === MemberRole.ADMIN ||
            requester.role === MemberRole.MODERATOR;
            
        if (isPrivileged) {
            const ban = await BanService.banUser(Number(serverId), Number(userId), requester.role, reason, duration);
            io.to(`server-${serverId}`).emit("memberBanned", {
                userId: Number(userId),
                serverId: Number(serverId),
            });
            io.to(`server-${serverId}`).emit("receivedNewBan", ban);
            return sendSuccess(res, 200, "User banned successfully", null);
        } else {
            const ban = await BanService.requestBanUser(Number(serverId), Number(userId), requester.role, reason, duration);
            io.to(`server-${serverId}`).emit("receivedNewBan", ban);
            return sendSuccess(res, 200, "Ban request submitted for review", null);
        }
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to process ban request', 400);
    }
}

export async function GetBansForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    try {
        const bans = await BanService.getBansForServer(Number(serverId));
        return sendSuccess(res, 200, "Bans retrieved successfully", bans);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to retrieve bans', 400);
    }
}

export async function ReviewBanAppeal(req: Request, res: Response) {
    const { serverId, banId } = req.params;
    const { decision } = req.body;
    const { duration } = req.body || {}; // Optional duration for ACCEPTED decisions
    const reviewerId = req.user?.userId;

    if (!reviewerId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'You must be logged in to perform this action');
    }

    if (!banId) {
        return sendError(res, 400, 'MISSING_BAN_ID', 'Ban ID is required');
    }

    const parsedBanId = Number(banId);

    if (isNaN(parsedBanId)) {
        return sendError(res, 400, 'INVALID_BAN_ID', 'Ban ID must be a valid number');
    }

    if (decision !== "ACCEPTED" && decision !== "REJECTED") {
        return sendError(res, 400, 'INVALID_DECISION', "Decision must be either 'ACCEPTED' or 'REJECTED'");
    }

    try {
        const updatedBan = await BanService.reviewBanRequest(parsedBanId, reviewerId, decision, duration);

        io.to(`server-${serverId}`).emit("banUpdated", {banId: parsedBanId, decision, bannedUserId: updatedBan.userId});
        if (decision === "ACCEPTED") {
            io.to(`server-${serverId}`).emit("memberBanned", {
                userId: updatedBan.userId,
                serverId: Number(serverId),
            });
        }
        
        return sendSuccess(res, 200, "Ban appeal reviewed successfully", null);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to review ban appeal', 500);
    }
}

export async function RevokeBan(req: Request, res: Response) {
    const { serverId, banId } = req.params;
    const requesterId = req.user?.userId;

    if (!requesterId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'You must be logged in to perform this action');
    }

    const parsedBanId = Number(banId);

    if (isNaN(parsedBanId)) {
        return sendError(res, 400, 'INVALID_BAN_ID', 'Ban ID must be a valid number');
    }

    try {
        await BanService.revokeBan(parsedBanId);
        io.to(`server-${serverId}`).emit("banUpdated", {banId: parsedBanId, decision: "REVOKED" });
        return sendSuccess(res, 200, "Ban revoked successfully", null);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to revoke ban', 500);
    }
}

export async function DeleteBan(req: Request, res: Response) {
    const { serverId, banId } = req.params;
    const requesterId = req.user?.userId;

    if (!requesterId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'You must be logged in to perform this action');
    }

    const parsedBanId = Number(banId);

    if (isNaN(parsedBanId)) {
        return sendError(res, 400, 'INVALID_BAN_ID', 'Ban ID must be a valid number');
    }

    try {
        await BanService.delete(parsedBanId);
        io.to(`server-${serverId}`).emit("banDeleted", {banId: parsedBanId});
        return sendSuccess(res, 200, "Ban deleted successfully", null);
    } catch (error: any) {
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Failed to delete ban', 500);
    }
}