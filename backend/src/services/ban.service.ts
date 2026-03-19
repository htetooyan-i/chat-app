import { prisma } from '../lib/prisma';
import { MemberRole } from '../../generated/prisma/enums';
import { ServerMember } from '../../generated/prisma/client';

class BanService {

    static async findExistingBan(serverId: number, userId: number) {
        try {
            const ban = await prisma.ban.findFirst({
                where: {
                    serverId,
                    userId,
                    appealStatus: "ACCEPTED",
                    revokedAt: null,
                    OR: [
                        { expiresAt: null },
                        { expiresAt: { gt: new Date() } },
                    ],
                }
            });

            return ban;
        } catch (error: any) {
            throw error;
        }
    }

    static async getBansForServer(serverId: number) {
        try {
            const bans = await prisma.ban.findMany({
                where: {
                    serverId,
                },
                orderBy: { createdAt: "desc" },
                include: {
                    user: true,
                }
            });
            console.log(bans);
            return bans;
        } catch (error: any) {
            throw error;
        }
    }

    static async banUser(
        serverId: number,
        userId: number,
        requesterRole: MemberRole,
        reason?: string,
        duration?: number | null
    ) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) throw new Error("Server not found");
            if (server.ownerId === userId) throw new Error("Cannot ban the server owner");

            const activeBan = await this.findExistingBan(serverId, userId);
            console.log("Active ban check:", activeBan);
            if (!!activeBan) throw new Error("User is already banned");

            const expiresAt = duration
                ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
                : null;

            const [newBan] = await prisma.$transaction([
                prisma.ban.create({
                    data: {
                        serverId,
                        userId,
                        bannedByRole: requesterRole,
                        appealStatus: "ACCEPTED",
                        reason: reason || null,
                        expiresAt,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                avatarUrl: true,
                            }
                        }
                    }
                }),
                
                prisma.ban.updateMany({
                    where: {
                        serverId,
                        userId,
                        appealStatus: "PENDING",
                    },
                    data: { appealStatus: "SUPERSEDED" },
                }),

                prisma.serverMember.delete({
                    where: { userId_serverId: { userId, serverId } },
                }),
            ]);

            return newBan;
        } catch (error: any) {
            throw error;
        }
    }

    static async requestBanUser(
        serverId: number,
        userId: number,
        requesterRole: MemberRole,
        reason?: string,
        duration?: number | null
    ) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) throw new Error("Server not found");
            if (server.ownerId === userId) throw new Error("Cannot ban the server owner");

            // Block request if user is already actively banned
            const activeBan = await prisma.ban.findFirst({
                where: {
                    serverId,
                    userId,
                    appealStatus: "ACCEPTED",
                    revokedAt: null,
                    OR: [
                        { expiresAt: null },
                        { expiresAt: { gt: new Date() } },
                    ],
                },
            });

            if (activeBan) throw new Error("User is already banned");

            const expiresAt = duration
                ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
                : null;

            // Always create a new request, never update existing
            return await prisma.ban.create({
                data: {
                    serverId,
                    userId,
                    bannedByRole: requesterRole,
                    appealStatus: "PENDING",
                    reason: reason || null,
                    expiresAt,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true,
                        }
                    }
                }
            });
        } catch (error: any) {
            throw error;
        }
    }

    static async reviewBanRequest(
        banId: number,
        reviewerId: number,
        newStatus: "ACCEPTED" | "REJECTED",
        duration?: number | null
    ) {
        try {
            const ban = await prisma.ban.findUnique({
                where: { id: banId },
            });

            if (!ban) throw new Error("Ban request not found");
            if (ban.revokedAt) throw new Error("Cannot review a revoked ban");
            if (ban.appealStatus !== "PENDING") throw new Error("Ban has already been reviewed");

            if (newStatus === "ACCEPTED") {

                const activeBan = await this.findExistingBan(ban.serverId, ban.userId);
                if (!!activeBan) {
                    // User already banned, just reject this request
                    await prisma.ban.update({
                        where: { id: banId },
                        data: { appealStatus: "SUPERSEDED" },
                    });
                    throw new Error("User is already banned, request has been superseded");
                }

                const [updatedBan] = await prisma.$transaction([
                    // Accept the reviewed ban
                    prisma.ban.update({
                        where: { id: banId },
                        data: { appealStatus: "ACCEPTED", expiresAt: duration ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000) : null },

                    }),
                    // Reject all other pending requests for this user in this server
                    prisma.ban.updateMany({
                        where: {
                            serverId: ban.serverId,
                            userId: ban.userId,
                            appealStatus: "PENDING",
                            id: { not: banId },
                        },
                        data: { appealStatus: "SUPERSEDED" },
                    }),
                    // Kick the user
                    prisma.serverMember.delete({
                        where: {
                            userId_serverId: {
                                userId: ban.userId,
                                serverId: ban.serverId,
                            },
                        },
                    }),
                ]);
                return updatedBan;
            } else {
                // Just reject this one request
                return await prisma.ban.update({
                    where: { id: banId },
                    data: { appealStatus: "REJECTED" },
                });

            }
        } catch (error: any) {
            throw error;
        }
    }

    static async revokeBan(bandId: number) {
        try {
            await prisma.ban.updateMany({
                where: {
                    id: bandId,
                    revokedAt: null,
                },
                data: {
                    revokedAt: new Date(),
                    appealStatus: "REVOKED",
                }
            });
        } catch (error: any) {
            throw error;
        }
    }

    static async delete(banId: number) {
        try {
            await prisma.ban.delete({
                where: { id: banId },
            });
        } catch (error: any) {
            throw error;
        }
    }
}

export default BanService;