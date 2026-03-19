import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        exp: number;
      };
      member?: {
        id: number;
        serverId: number;
        userId: number;
        role: import("@prisma/client").MemberRole;
      };
    }
  }
}
