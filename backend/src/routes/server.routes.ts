import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    createServer,
    deleteServer,
    getCurrentUserServers,
    updateServerName
 } from '../controllers/server.controller';
import { 
    addMemberToServer,
    getServerMembers,
    removeMemberFromServer
 } from '../controllers/serverMember.controller';

const router = express.Router();

router.post('/', authMiddleware, createServer);
router.patch('/:serverId', authMiddleware, updateServerName);
router.delete('/:serverId', authMiddleware, deleteServer);
router.get('/my-servers', authMiddleware, getCurrentUserServers);

router.get('/:serverId/members', authMiddleware, getServerMembers);
router.post('/:serverId/join', authMiddleware, addMemberToServer);
router.delete('/:serverId/leave', authMiddleware, removeMemberFromServer);

export default router;