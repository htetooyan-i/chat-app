import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    createReaction,
    getReactionsForMessage,
} from '../controllers/reaction.controller';

const router  = express.Router({ mergeParams: true });

router.post('/', authMiddleware, createReaction);
router.get('/', authMiddleware, getReactionsForMessage);

export default router ;

