import express from 'express';

import ServerMemberService from '../services/serverMember.service';

export async function addMemberToServer(req: express.Request, res: express.Response) {
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

export async function removeMemberFromServer(req: express.Request, res: express.Response) {
    const userId = req.user?.userId;
    const { serverId } = req.params;
    const { memberId } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        await ServerMemberService.removeMember(Number(serverId), userId, Number(memberId));
        res.status(200).json({ message: 'Member removed from server successfully' });
    } catch (error: any) {
        console.error('Error removing member from server:', error.message);
        res.status(500).json({ message: error.message });
    }
}

export async function getServerMembers(req: express.Request, res: express.Response) {
    const { serverId } = req.params;
    try {
        const members = await ServerMemberService.getServerMembers(Number(serverId));
        res.status(200).json({ message: 'Server members retrieved successfully', data: members });
    } catch (error: any) {
        console.error('Error retrieving server members:', error.message);
        res.status(500).json({ message: error.message });
    }
}

