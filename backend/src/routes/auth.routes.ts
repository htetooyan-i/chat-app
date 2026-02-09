import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { resetPasswordLimiter, loginLimiter, resendVerificationLimiter } from '../middleware/ratelimiter';
import { 
    RegisterUser,
    LoginUser, 
    GetCurrentUser, 
    RefreshAccessToken, 
    LogoutUser, 
    DeleteUser, 
    ChangePassword, 
    VerifyEmail, 
    ResendVerificationEmail ,
    RequestPasswordReset,
    ResetPassword,
    RequestPhoneOTP,
    VerifyPhoneOTP
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', loginLimiter, LoginUser);

router.get('/logout', authMiddleware, LogoutUser);
router.delete('/delete', authMiddleware, DeleteUser);

router.get('/me', authMiddleware, GetCurrentUser);
router.get('/refresh-access-token', RefreshAccessToken);

router.patch('/change-password', authMiddleware, ChangePassword);
router.post('/request-password-reset', resetPasswordLimiter, RequestPasswordReset);
router.post('/reset-password', ResetPassword);

router.post('/resend-verification-email', authMiddleware, resendVerificationLimiter, ResendVerificationEmail);
router.get('/verify-email', VerifyEmail);

// FIX: Need to test this back after upgrade twilio account
router.post('/request-otp', RequestPhoneOTP)
router.post('/verify-otp', VerifyPhoneOTP)

export default router;