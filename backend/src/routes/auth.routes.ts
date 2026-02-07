import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { RegisterUser, LoginUser, GetCurrentUser, RefreshAccessToken, LogoutUser, DeleteUser, ChangePassword } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);

router.get('/logout', authMiddleware, LogoutUser);
router.get('/delete', authMiddleware, DeleteUser);

router.get('/me', authMiddleware, GetCurrentUser);
router.get('/refresh-access-token', RefreshAccessToken);

router.patch('/change-password', authMiddleware, ChangePassword);

export default router;