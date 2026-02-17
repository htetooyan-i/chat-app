import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    GetCurrentUser, 
    UpdateCurrentUser,
    FindUserById,
    UpdateAvatar,
    DeleteAvatar,
    UpdateEmail
 } from '../controllers/users.controller';
 
const router = express.Router();

router.get('/me', authMiddleware, GetCurrentUser);
router.patch('/me', authMiddleware, UpdateCurrentUser);
router.patch('/me/avatar', authMiddleware, UpdateAvatar);
router.delete('/me/avatar', authMiddleware, DeleteAvatar);
router.patch('/me/email', authMiddleware, UpdateEmail);

router.get('/:id', authMiddleware, FindUserById);

export default router;