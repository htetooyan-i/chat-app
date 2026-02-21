import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    createServer,
    deleteServer,
    getCurrentUserServers,
    updateServerName
 } from '../controllers/server.controller';

const router = express.Router();

router.post('/', authMiddleware, createServer);
router.patch('/:serverId', authMiddleware, updateServerName);
router.delete('/:serverId', authMiddleware, deleteServer);
router.get('/my-servers', authMiddleware, getCurrentUserServers);


export default router;