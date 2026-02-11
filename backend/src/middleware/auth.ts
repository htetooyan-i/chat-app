import { Request, Response, NextFunction } from 'express';

import { verifyToken } from "../lib/jwt";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    
    // check if the header is present and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing token" });
    }
    const token = authHeader.split(" ")[1];

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
