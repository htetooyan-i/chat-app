import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { requireServerRole } from '../middleware/requireServerRole';
import { MemberRole } from '../../generated/prisma/enums';
import { 
    createServer,
    deleteServer,
    getCurrentUserServers,
    updateServerProfile
 } from '../controllers/server.controller';

const router = express.Router();

router.post('/', authMiddleware, createServer);
router.get('/my-servers', authMiddleware, getCurrentUserServers);
router.patch('/:serverId', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.OWNER]), updateServerProfile);
router.delete('/:serverId', authMiddleware,  requireServerRole([MemberRole.OWNER]), deleteServer);

export default router;