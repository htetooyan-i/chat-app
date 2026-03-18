import { Request, Response } from "express";

import BanService from "../services/ban.service";
import { io } from "../server";
import { MemberRole } from "../../generated/prisma/enums";

export async function handleBanRequest(req: Request, res: Response) {
    try {
        const { serverId, userId } = req.params;
        const { reason, duration } = req.body;
        const requester = req.member; // from auth middleware

        if (!requester) {
            return res.status(401).json({
                success: false,
                data: null,
                messsage: "Unauthorized",
                error: {
                    code: "UNAUTHORIZED",
                    detail: "You must be logged in to perform this action"
                }
            });
        }
        console.log("Requester role:", requester);
        const isPrivileged =
            requester.role === MemberRole.OWNER ||
            requester.role === MemberRole.MODERATOR;
            
        if (isPrivileged) {
            const ban = await BanService.banUser(Number(serverId), Number(userId), requester.role, reason, duration);
            io.to(`server-${serverId}`).emit("memberBanned", userId);
            io.to(`server-${serverId}`).emit("receivedNewBan", ban);
            return res.status(200).json({
                success: true,
                data: null,
                message: "User banned successfully",
                error: null
            });
        } else {
            const ban = await BanService.requestBanUser(Number(serverId), Number(userId), requester.role, reason, duration);
            io.to(`server-${serverId}`).emit("receivedNewBan", ban);
            return res.status(200).json({
                success: true,
                data: null,
                message: "Ban request submitted for review",
                error: null
            });
        }
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            data: null,
            messsage: "Failed to process ban request: ",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to process ban request"
            }
        });
    }
}

export async function GetBansForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    try {
        const bans = await BanService.getBansForServer(Number(serverId));
        res.status(200).json({
            success: true,
            data: bans,
            message: "Bans retrieved successfully",
            error: null
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Failed to retrieve bans",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to retrieve bans"
            }
        });
    }
}

export async function ReviewBanAppeal(req: Request, res: Response) {
    const { serverId, banId } = req.params;
    const { decision } = req.body;
    const { duration } = req.body || {}; // Optional duration for ACCEPTED decisions
    const reviewerId = req.user?.userId;

    if (!reviewerId) {
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

    if (!banId) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Missing banId",
            error: {
                code: "MISSING_BAN_ID",
                detail: "Ban ID is required"
            }
        });
    }

    const parsedBanId = Number(banId);

    if (isNaN(parsedBanId)) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Invalid banId format",
            error: {
                code: "INVALID_BAN_ID",
                detail: "Ban ID must be a valid number"
            }
        });
    }

    if (decision !== "ACCEPTED" && decision !== "REJECTED") {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Invalid decision value",
            error: {
                code: "INVALID_DECISION",
                detail: "Decision must be either 'ACCEPTED' or 'REJECTED'"
            }
        });
    }

    try {
        const updatedBan = await BanService.reviewBanRequest(parsedBanId, reviewerId, decision, duration);
        io.to(`server-${serverId}`).emit("banUpdated", {banId: parsedBanId, decision, bannedUserId: updatedBan.userId});
        return res.status(200).json({
            success: true,
            data: null,
            message: "Ban appeal reviewed successfully",
            error: null
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to review ban appeal",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to revoke ban"
            }
        });
    }
}

export async function RevokeBan(req: Request, res: Response) {
    const { serverId, banId } = req.params;
    const requesterId = req.user?.userId;

    if (!requesterId) {
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

    const parsedBanId = Number(banId);

    if (isNaN(parsedBanId)) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Invalid banId format",
            error: {
                code: "INVALID_BAN_ID",
                detail: "Ban ID must be a valid number"
            }
        });
    }

    try {
        await BanService.revokeBan(parsedBanId);
        io.to(`server-${serverId}`).emit("banUpdated", {banId: parsedBanId, decision: "REVOKED" });
        return res.status(200).json({
            success: true,
            data: null,
            message: "Ban revoked successfully",
            error: null
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to revoke ban",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to revoke ban"
            }
        });
    }
}

export async function DeleteBan(req: Request, res: Response) {
    const { serverId, banId } = req.params;
    const requesterId = req.user?.userId;

    if (!requesterId) {
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

    const parsedBanId = Number(banId);

    if (isNaN(parsedBanId)) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Invalid banId format",
            error: {
                code: "INVALID_BAN_ID",
                detail: "Ban ID must be a valid number"
            }
        });
    }

    try {
        await BanService.delete(parsedBanId);
        io.to(`server-${serverId}`).emit("banDeleted", {banId: parsedBanId});
        return res.status(200).json({
            success: true,
            data: null,
            message: "Ban deleted successfully",
            error: null
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to delete ban",
            error: {
                code: "INTERNAL_SERVER_ERROR",
                detail: error.message || "Failed to delete ban"
            }
        });
    }
}