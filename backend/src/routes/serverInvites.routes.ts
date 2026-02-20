import express from 'express';

import { authMiddleware } from '../middleware/auth';
import {
    CreateInvite,
    DeleteInvite,
    DeleteInvitesByUser,
    GetInvitesForServer,
    JoinServerViaCode
} from '../controllers/serverInvites.controller';

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, GetInvitesForServer);
router.post('/', authMiddleware, CreateInvite);
router.delete('/:inviteId', authMiddleware, DeleteInvite);

router.post('/:code', authMiddleware, JoinServerViaCode);

export default router;