import { Request, Response } from "express";

import BanService from "../services/ban.service";
import ServerMemberService from "../services/serverMember.service";

export async function GetBansForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    if (!serverId) {
        return res.status(400).json({ error: "Missing serverId" });
    }

    const parsedServerId = Number(serverId);

    if (isNaN(parsedServerId)) {
        return res.status(400).json({ error: "Invalid serverId format" });
    }

    try {
        const bans = await BanService.getBansForServer(parsedServerId);
        return res.status(200).json(bans);
    } catch (error: any) {
        return res.status(500).json({ error: error.message || "Failed to retrieve bans" });
    }
}

export async function BanUser(req: Request, res: Response) {
    const { serverId, userId } = req.params;
    const { reason, duration } = req.body || {};
    const requesterId = req.user?.userId;

    if (!serverId || !userId) {
        return res.status(400).json({ error: "Missing serverId or userId" });
    }

    const parsedServerId = Number(serverId);
    const parsedUserId = Number(userId);
    const parsedDuration = duration ? Number(duration) : null;

    if (isNaN(parsedServerId) || isNaN(parsedUserId)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    if (parsedDuration !== null && (isNaN(parsedDuration) || parsedDuration <= 0)) {
        return res.status(400).json({ error: "Invalid duration" });
    }

    if (requesterId === parsedUserId) {
        return res.status(400).json({ error: "You cannot ban yourself!" });
    }
    try {
        const requester = await ServerMemberService.getServerMember(parsedServerId, requesterId);

        if (!requester) {
            return res.status(403).json({ error: "Unauthorized to ban users" });
        }
        await BanService.banUser(
            parsedServerId,
            parsedUserId,
            requester.role,
            reason,
            parsedDuration
        );

        return res.status(200).json({ message: "User banned successfully" });
    } catch (error: any) {
        if (error.message === "User is already banned") {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message || "Failed to ban user" });
    }
}

export async function RevokeBan(req: Request, res: Response) {
    const { serverId, userId } = req.params;
    const requesterId = req.user?.userId;

    if (!serverId || !userId) {
        return res.status(400).json({ error: "Missing serverId or userId" });
    }

    const parsedServerId = Number(serverId);
    const parsedUserId = Number(userId);

    if (isNaN(parsedServerId) || isNaN(parsedUserId)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        await BanService.revokeBan(parsedServerId, parsedUserId, requesterId);
        return res.status(200).json({ message: "Ban revoked successfully" });
    } catch (error: any) {
        return res.status(500).json({ error: "Failed to revoke ban" });
    }
}