import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    GetCurrentUser, 
    UpdateCurrentUser,
    FindUserById,
    UpdateAvatar,
    DeleteAvatar
 } from '../controllers/users.controller';
 
const router = express.Router();

router.get('/me', authMiddleware, GetCurrentUser);
router.patch('/me', authMiddleware, UpdateCurrentUser);
router.patch('/me/avatar', authMiddleware, UpdateAvatar);
router.delete('/me/avatar', authMiddleware, DeleteAvatar);

router.get('/:id', authMiddleware, FindUserById);



export default router;