import { Request, Response } from "express";

import ServerInvitesService from "../services/serverInvites.service";
import ServerMemberService from "../services/serverMember.service";
import {io} from "../server";

export async function GetInvitesForServer(req: Request, res: Response) {
    const { serverId } = req.params;

    try {
        const invites = await ServerInvitesService.getInvitesForServer(Number(serverId));
        res.status(200).json(invites);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function CreateInvite(req: Request, res: Response) {

    const { serverId } = req.params;
    const userId = req.user?.userId;
    
    const { expiresInMinutes, maxUses } = req.body ?? {};


    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const invite = await ServerInvitesService.generate(Number(serverId), userId, expiresInMinutes, maxUses);
        io.to(`server-${serverId}`).emit('receivedNewInvite', invite);
        res.status(201).json(invite);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function DeleteInvite(req: Request, res: Response) {
    const { serverId, inviteId } = req.params;

    try {
        await ServerInvitesService.deleteInvite(Number(inviteId));
        io.to(`server-${serverId}`).emit('inviteDeleted', Number(inviteId));
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function DeleteInvitesByUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
        await ServerInvitesService.deleteInvitesByUser(Number(userId));
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export async function JoinServerViaCode(req: Request, res: Response) {
    const { code } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (code.length !== 8) {
        return res.status(400).json({ error: "Invalid invite code format" });
    }

    try {
        const invite = await ServerInvitesService.verifyInvite(code as string);
        if (!invite) {
            return res.status(404).json({ error: "Invite not found or expired" });
        }

        const newMember = await ServerMemberService.addMember(invite.serverId, userId);
        const updatedInvite = await ServerInvitesService.incrementInviteUsage(invite.id);

        io.to(`server-${newMember.serverId}`).emit("receivedNewMember", newMember);
        io.to(`server-${newMember.serverId}`).emit("inviteUpdated", { inviteId: updatedInvite.id, newCount: updatedInvite.currentUses});

        res.status(200).json({ message: "Joined server successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

