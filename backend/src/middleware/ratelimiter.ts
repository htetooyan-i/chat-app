import { Request, Response, NextFunction } from 'express';

import rateLimit from "express-rate-limit";

export const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each email to 3 requests per window
  message: { error: "Too many password reset requests from this email, please try again later." },
  handler: (req: Request, res: Response, next: NextFunction, options) => {
    res.status(options.statusCode).json(options.message);
  }
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                  // 5 attempts
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again in 15 minutes." },
  handler: (req: Request, res: Response, next: NextFunction, options) => {
    res.status(options.statusCode).json(options.message);
  }
});

export const resendVerificationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each email to 3 requests per window
  message: { error: "Too many requests to resend verification email, please try again later." },
  keyGenerator: (req: Request) => {
    return (req.user?.email ?? req.ip) as string // Use email as key if available, otherwise fallback to IP
  },
  handler: (req: Request, res: Response, next: NextFunction, options) => {
    res.status(options.statusCode).json(options.message);
  }
});

