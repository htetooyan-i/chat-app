import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { requireServerRole } from '../middleware/requireServerRole';
import { MemberRole } from '../../generated/prisma/enums';
import { 
    addMemberToServer,
    getServerMembers,
    removeMemberFromServer,
    leaveServer,
    changeMemberRole
 } from '../controllers/serverMember.controller';

const router = express.Router({ mergeParams: true });

router.get('/members', authMiddleware, getServerMembers);
router.post('/join', authMiddleware, addMemberToServer);
router.delete('/kick', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.OWNER]), removeMemberFromServer);
router.delete('/leave', authMiddleware, leaveServer);

router.patch('/members/:userId', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.OWNER]), changeMemberRole);

export default router;