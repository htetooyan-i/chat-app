import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    toggleReaction,
    getReactionsForMessage,
    deleteReaction
} from '../controllers/reaction.controller';

const router  = express.Router({ mergeParams: true });

router.post('/', authMiddleware, toggleReaction);
router.get('/', authMiddleware, getReactionsForMessage);
router.delete('/:reactionId', authMiddleware, deleteReaction);
export default router ;

