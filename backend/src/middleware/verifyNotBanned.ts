import { Request, Response, NextFunction } from 'express';

import BanService from '../services/ban.service';
import ServerInviteService from '../services/serverInvite.service';

export async function verifyNotBanned(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.userId;
    const code = req.params.code;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const inviteCode = await ServerInviteService.getInviteByCode(code as string);
        const existingBan = await BanService.findExistingBan(Number(inviteCode.serverId), userId);
        if (existingBan && !existingBan.revokedAt && (!existingBan.expiresAt || existingBan.expiresAt > new Date())) {
            return res.status(403).json({ message: 'You are banned from this server' });
        }
        next();
    } catch (error: any) {
        console.error('Error checking if user is banned:', error.message);
        res.status(500).json({ message: error.message });
    }
};