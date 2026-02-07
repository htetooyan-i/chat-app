import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: int;
        email: string;
        exp: number;
      };
    }
  }
}
