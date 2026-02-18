import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    createNewChannelForServer,
    deleteChannel,
    getChannelById,
    getChannelsForServer,
    updateChannelName
} from '../controllers/channel.controller';

const router = express.Router({ mergeParams: true });


router.post('/', authMiddleware, createNewChannelForServer);
router.get('/', authMiddleware, getChannelsForServer);

router.get('/:channelId', authMiddleware, getChannelById);
router.patch('/:channelId', authMiddleware, updateChannelName);
router.delete('/:channelId', authMiddleware, deleteChannel);

export default router;