import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { requireServerRole } from '../middleware/requireServerRole';
import { verifyNotBanned } from '../middleware/verifyNotBanned';
import { MemberRole } from '../../generated/prisma/enums';
import {
    CreateInvite,
    DeleteInvite,
    GetInvitesForServer,
    JoinServerViaCode
} from '../controllers/serverInvite.controller';

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, GetInvitesForServer);
router.post('/', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.OWNER, MemberRole.MODERATOR]), CreateInvite);
router.delete('/:inviteId', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.OWNER, MemberRole.MODERATOR]), DeleteInvite);

router.post('/:code', authMiddleware, verifyNotBanned, JoinServerViaCode);

export default router;