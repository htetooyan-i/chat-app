import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    addMemberToServer,
    getServerMembers,
    removeMemberFromServer,
    leaveServer
 } from '../controllers/serverMember.controller';

const router = express.Router({ mergeParams: true });

router.get('/members', authMiddleware, getServerMembers);
router.post('/join', authMiddleware, addMemberToServer);
router.delete('/kick', authMiddleware, removeMemberFromServer);
router.delete('/leave', authMiddleware, leaveServer);

export default router;