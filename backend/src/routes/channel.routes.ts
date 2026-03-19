import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { requireServerRole } from '../middleware/requireServerRole';
import { MemberRole } from '@prisma/client';
import { 
    createNewChannelForServer,
    deleteChannel,
    getChannelById,
    getChannelsForServer,
    updateChannelName
} from '../controllers/channel.controller';

const router = express.Router({ mergeParams: true });


router.post('/', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.OWNER]), createNewChannelForServer);
router.get('/', authMiddleware, getChannelsForServer);

router.get('/:channelId', authMiddleware, getChannelById);
router.patch('/:channelId', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.OWNER]), updateChannelName);
router.delete('/:channelId', authMiddleware, requireServerRole([MemberRole.ADMIN, MemberRole.OWNER]), deleteChannel);

export default router;