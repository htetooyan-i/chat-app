import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { 
    GetCurrentUser, 
    GetMyNotifications,
    MarkMyNotificationAsRead,
    MarkAllMyNotificationsAsRead,
    UpdateCurrentUser,
    FindUserById,
    UpdateAvatar,
    DeleteAvatar,
    UpdateEmail
 } from '../controllers/users.controller';
 
const router = express.Router();

router.get('/me', authMiddleware, GetCurrentUser);
router.get('/me/notifications', authMiddleware, GetMyNotifications);
router.patch('/me/notifications/read-all', authMiddleware, MarkAllMyNotificationsAsRead);
router.patch('/me/notifications/:notificationId/read', authMiddleware, MarkMyNotificationAsRead);
router.patch('/me', authMiddleware, UpdateCurrentUser);
router.patch('/me/avatar', authMiddleware, UpdateAvatar);
router.delete('/me/avatar', authMiddleware, DeleteAvatar);
router.patch('/me/email', authMiddleware, UpdateEmail);

router.get('/:id', authMiddleware, FindUserById);

export default router;