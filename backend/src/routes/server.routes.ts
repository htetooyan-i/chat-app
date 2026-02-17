import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    createServer,
    deleteServer,
    getCurrentUserServers
 } from '../controllers/server.controller';
import { 
    addMemberToServer,
    removeMemberFromServer
 } from '../controllers/serverMember.controller';

const router = express.Router();

router.post('/', authMiddleware, createServer);
router.delete('/:serverId', authMiddleware, deleteServer);
router.get('/my-servers', authMiddleware, getCurrentUserServers);

router.post('/:serverId/join', authMiddleware, addMemberToServer);
router.delete('/:serverId/leave', authMiddleware, removeMemberFromServer);

export default router;