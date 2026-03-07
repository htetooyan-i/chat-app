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
            return res.status(401).json({ message: "Unauthorized" });
        }
        console.log("Requester role:", requester);
        const isPrivileged =
            requester.role === MemberRole.OWNER ||
            requester.role === MemberRole.MODERATOR;
            
        if (isPrivileged) {
            await BanService.banUser(Number(serverId), Number(userId), requester.role, reason, duration);
            io.to(`serverId-${serverId}`).emit("banned", userId);
            return res.status(200).json({ message: "User banned successfully" });
        } else {
            await BanService.requestBanUser(Number(serverId), Number(userId), requester.role, reason, duration);
            return res.status(200).json({ message: "Ban request submitted for review" });
        }
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

export async function GetBansForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    try {
        const bans = await BanService.getBansForServer(Number(serverId));
        res.status(200).json(bans);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function ReviewBanAppeal(req: Request, res: Response) {
    const { banId } = req.params;
    const { decision } = req.body;
    const { duration } = req.body || {}; // Optional duration for ACCEPTED decisions
    const reviewerId = req.user?.userId;

    if (!reviewerId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (!banId) {
        return res.status(400).json({ error: "Missing banId" });
    }

    const parsedBanId = Number(banId);

    if (isNaN(parsedBanId)) {
        return res.status(400).json({ error: "Invalid banId format" });
    }

    if (decision !== "ACCEPTED" && decision !== "REJECTED") {
        return res.status(400).json({ error: "Invalid decision value" });
    }

    try {
        await BanService.reviewBanRequest(parsedBanId, reviewerId, decision, duration);
        return res.status(200).json({ message: "Ban appeal reviewed successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message || "Failed to review ban appeal" });
    }
}

export async function RevokeBan(req: Request, res: Response) {
    const { banId } = req.params;
    const requesterId = req.user?.userId;

    if (!requesterId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const parsedBanId = Number(banId);

    if (isNaN(parsedBanId)) {
        return res.status(400).json({ error: "Invalid ban ID format" });
    }

    try {
        await BanService.revokeBan(parsedBanId);
        return res.status(200).json({ message: "Ban revoked successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message || "Failed to revoke ban" });
    }
}

export async function DeleteBan(req: Request, res: Response) {
    const { banId } = req.params;
    const requesterId = req.user?.userId;

    if (!requesterId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const parsedBanId = Number(banId);

    if (isNaN(parsedBanId)) {
        return res.status(400).json({ error: "Invalid ban ID format" });
    }

    try {
        await BanService.delete(parsedBanId);
        return res.status(200).json({ message: "Ban deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: error.message || "Failed to delete ban" });
    }
}