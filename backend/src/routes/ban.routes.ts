import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { requireServerRole } from '../middleware/requireServerRole';
import { MemberRole } from '../../generated/prisma/enums';
import { 
    RequestBanUser,
    ReviewBanAppeal, 
    GetBansForServer, 
    handleBanRequest,
    RevokeBan, 
    DeleteBan
} from '../controllers/ban.controller';

const router = express.Router({ mergeParams: true });

router.get('/', authMiddleware, GetBansForServer);
router.post('/:userId', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.MODERATOR, MemberRole.OWNER, MemberRole.MEMBER]), handleBanRequest);
router.patch('/:banId/revoke', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.MODERATOR, MemberRole.OWNER]), RevokeBan);
router.patch('/:banId/review', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.MODERATOR, MemberRole.OWNER]), ReviewBanAppeal);
router.delete('/:banId', authMiddleware, requireServerRole([MemberRole.OWNER, MemberRole.ADMIN]), DeleteBan);
export default router;