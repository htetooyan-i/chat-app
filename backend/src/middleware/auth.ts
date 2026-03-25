import { Request, Response, NextFunction } from 'express';

import { verifyToken } from "../lib/jwt";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const accessToken = req.cookies.accessToken;
    
    // check if the token is present
    if (!accessToken) {
      return res.status(401).json({ code: "TOKEN_MISSING", message: "Missing token" });
    }
    const token = accessToken.startsWith("Bearer ") ? accessToken.slice(7) : accessToken;

    try {
      const payload = await verifyToken<{
        userId: number;
        email: string;
        exp: number;
      }>(token);

      req.user = payload;
      next();
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "JWTExpired") {
          return res.status(401).json({ code: "TOKEN_EXPIRED", message: err.message });
        } else if (err.name === "JWTInvalid" || err.name === "JWTMalformed" || err.name === "JWTVerificationFailed") {
          return res.status(401).json({ code: "TOKEN_INVALID", message: err.message });
        } else {
          return res.status(401).json({ code: "AUTH_FAILED", message: err.message });
        }
      } else {
        return res.status(401).json({ code: "AUTH_FAILED", message: "Unknown error" });
      }
    }
}
