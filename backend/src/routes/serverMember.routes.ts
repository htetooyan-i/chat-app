import express from 'express';

import { authMiddleware } from '../middleware/auth';
import {
    getServerMembers
} from '../controllers/serverMember.controller';

const router = express.Router();

router.get('/:serverId/members', authMiddleware, getServerMembers);

export default router;