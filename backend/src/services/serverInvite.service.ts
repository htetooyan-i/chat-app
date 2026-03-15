// FIXME: Currently the invite code is stored in plaintext in the database for simplicity, but in a production app it should be hashed before storing and then the raw code should only be returned once upon creation. I will implement this later.

import crypto from 'crypto';

import { prisma } from "../lib/prisma";
import { ServerInvite } from '../../generated/prisma/browser';

class ServerInviteService {

    // Generate a new invite code, store it in the database, and return the unique raw code
    static async generate(
        serverId: number,
        inviterId: number,
        expiresInMinutes?: number,
        maxUses?: number
    ): Promise<ServerInvite> {

        while (true) {
            const rawCode = crypto.randomBytes(6).toString("base64url");
            // const hashedCode = crypto
            //     .createHash("sha256")
            //     .update(rawCode)
            //     .digest("hex");

            try {
                const invite = await prisma.serverInvite.create({
                    data: {
                        serverId,
                        createdById: inviterId,
                        code: rawCode,
                        expiresAt: expiresInMinutes
                            ? new Date(Date.now() + expiresInMinutes * 60 * 1000)
                            : null,
                        maxUses: maxUses ?? null,
                        currentUses: 0,
                    },
                });

                return invite;

            } catch (error: any) {
                // If unique constraint fails → retry
                if (error.code === "P2002") {
                    continue;
                }

                console.error("Error creating invite:", error);
                throw new Error("Failed to create invite");
            }
        }
    }

    // verify if an invite code is valid for a server (not expired, not maxed out) and return the invite record if valid else throw an error
    static async verifyInvite(rawCode: string) {
        
        // const hashedCode = crypto
        //     .createHash("sha256")
        //     .update(rawCode)
        //     .digest("hex");

        try {
            const invite = await prisma.serverInvite.findFirst({
                where: {
                    code: rawCode,
                    OR: [
                        { expiresAt: null },
                        { expiresAt: { gt: new Date() } },
                    ],
                },
            });

            if ( !invite || (invite.maxUses !== null && invite.currentUses >= invite.maxUses) ) throw new Error("Invite is invalid or has expired");

            return invite;

        } catch (error: any) {
            console.error("Error verifying invite:", error.message);
            throw new Error(error.message || "Failed to verify invite", { cause: error });
        }
    }

    static async incrementInviteUsage(inviteId: number) {
        try {
            return await prisma.serverInvite.update({
                where: { id: inviteId },
                data: { currentUses: { increment: 1 } },
            });
        } catch (error: any) {
            console.error("Error incrementing invite usage:", error.message);
            throw new Error("Failed to increment invite usage", { cause: error });
        }
    }

    static async getInvitesForServer(serverId: number) {
        try {
            const invites = await prisma.serverInvite.findMany({
                where: { serverId },
                include: { createdBy: { select: { id: true, username: true, avatarUrl: true } } },
                orderBy: { createdAt: "asc" },
            });
            return invites;
        } catch (error: any) {
            console.error("Error fetching invites for server:", error.message);
            throw new Error("Failed to fetch invites for server", { cause: error });
        }
    }

    static async deleteInvite(inviteId: number) {
        try {
            await prisma.serverInvite.delete({
                where: { id: inviteId },
            });
        } catch (error: any) {
            console.error("Error deleting invite:", error.message);
            throw new Error("Failed to delete invite", { cause: error });
        }
    }


    static async deleteInvitesByUser(userId: number) {
        try {
            await prisma.serverInvite.deleteMany({
                where: { createdById: userId },
            });
        } catch (error: any) {
            console.error("Error deleting invites by user:", error.message);
            throw new Error("Failed to delete invites by user", { cause: error });
        }
    }

    static async getInviteByCode(code: string) {
        try {
            const invite = await prisma.serverInvite.findUnique({
                where: { code },
            });

            if (!invite) {
                throw new Error("Invite not found");
            }

            return invite;
        } catch (error: any) {
            console.error("Error fetching invite by code:", error.message);
            throw new Error("Failed to fetch invite by code", { cause: error });
        }
    }
}

export default ServerInviteService;