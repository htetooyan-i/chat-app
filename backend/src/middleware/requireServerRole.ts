import { Request, Response, NextFunction } from 'express';

import ServerMemberService from '../services/serverMember.service';
import { MemberRole } from "../../generated/prisma/enums";

export function requireServerRole(requiredRoles: MemberRole[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.userId;
        const { serverId } = req.params;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const member = await ServerMemberService.getServerMember(
                Number(serverId),
                userId
            );

            if (!member || !requiredRoles.includes(member.role)) {
                return res.status(403).json({ message: member ? 'Forbidden: Insufficient permissions' : 'Forbidden: Not a member of the server' });
            }

            next();
        } catch (error: any) {
            console.error('Error checking server role:', error.message);
            res.status(500).json({ message: error.message });
        }
    };
}