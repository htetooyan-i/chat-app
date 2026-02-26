import express, { Request, Response } from 'express';

import ServerMemberService from '../services/serverMember.service';

export async function addMemberToServer(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const data = await ServerMemberService.addMember(Number(serverId), userId);
        res.status(200).json({ message: 'Member added to server successfully', data });
    } catch (error: any) {
        console.error('Error adding member to server:', error.message);
        res.status(500).json({ message: error.message });
    }

}

export async function removeMemberFromServer(req: Request, res: Response) {
    const { serverId } = req.params;
    const { memberId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await ServerMemberService.removeMember(Number(serverId), Number(memberId), userId);
        res.status(200).json({ message: 'Member removed from server successfully' });
    } catch (error: any) {
        console.error('Error removing member from server:', error.message);
        res.status(500).json({ message: error.message });
    }
}

export async function leaveServer(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        await ServerMemberService.leaveServer(Number(serverId), userId);
        res.status(200).json({ message: 'Left server successfully' });
    } catch (error: any) {
        console.error('Error leaving server:', error.message);
        res.status(500).json({ message: error.message });
    }
}

export async function getServerMembers(req: Request, res: Response) {
    const { serverId } = req.params;
    console.log('Getting members for server ID:', serverId);
    try {
        const members = await ServerMemberService.getServerMembers(Number(serverId));
        res.status(200).json({ message: 'Server members retrieved successfully', data: members });
    } catch (error: any) {
        console.error('Error retrieving server members:', error.message);
        res.status(500).json({ message: error.message });
    }
}

export async function changeMemberRole(req: Request, res: Response) {
    const { serverId, userId } = req.params;
    const { newRole } = req.body;

    try {
        await ServerMemberService.changeMemberRole(Number(serverId), Number(userId), newRole);
        res.status(200).json({ message: 'Member role updated successfully' }); 
    } catch (error: any) {
        console.error('Error changing member role:', error.message);
        res.status(500).json({ message: error.message });

    }
}
