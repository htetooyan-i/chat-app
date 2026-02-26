import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { requireServerRole } from '../middleware/requireServerRole';
import { MemberRole } from '../../generated/prisma/enums';
import { 
    BanUser, 
    GetBansForServer, 
    RevokeBan 
} from '../controllers/ban.controller';

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, GetBansForServer);
router.post('/:userId', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.MODERATOR, MemberRole.OWNER]), BanUser);
router.patch('/:userId/revoke', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.MODERATOR, MemberRole.OWNER]), RevokeBan);

export default router;