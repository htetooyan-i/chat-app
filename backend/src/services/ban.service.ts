import { prisma } from '../lib/prisma';
import { MemberRole } from '../../generated/prisma/enums';

class BanService {

    static async findExistingBan(serverId: number, userId: number) {
        try {
            const ban = await prisma.ban.findFirst({
                where: {
                    serverId,
                    userId,
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
                include: {
                    user: true,
                }
            });

            return bans;
        } catch (error: any) {
            throw error;
        }
    }

    static async banUser(serverId: number, userId: number, requesterRole: MemberRole, reason?: string, duration?: number | null) {
        try {

            const existingBan = await this.findExistingBan(serverId, userId);
            if (existingBan && !existingBan.revokedAt) {
                throw new Error("User is already banned");
            }

            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new Error("Server not found");
            }

            if(server.ownerId == userId) {
                throw new Error("Cannot ban the server owner");
            }

            if (existingBan) {

                if (!existingBan.revokedAt &&
                    (!existingBan.expiresAt || existingBan.expiresAt > new Date())) {
                    throw new Error("User is already banned");
                }

                await prisma.$transaction([
                    // Re-activate ban
                    prisma.ban.update({
                        where: {
                        serverId_userId: { serverId, userId }
                        },
                        data: {
                        revokedAt: null,
                        appealStatus: "ACCEPTED",
                        reason: reason || null,
                        expiresAt: duration ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000) : null // Update expiresAt if duration is provided, otherwise keep existing
                        }
                    }),
                    prisma.serverMember.delete({
                        where: {
                            userId_serverId: {
                                userId,
                                serverId,
                            }
                        }
                    })
                ]);
            } else { // Create new ban
                await prisma.$transaction([
                    prisma.ban.create({
                        data: {
                            serverId,
                            userId,
                            bannedByRole: requesterRole,
                            appealStatus: "ACCEPTED",
                            reason: reason || null,
                            expiresAt: duration ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000) : null // Convert duration from days to milliseconds
                        }

                    }),
                    prisma.serverMember.delete({
                        where: {
                            userId_serverId: {
                                userId,
                                serverId,
                            }
                        }
                    })
                ])
            }
        }catch (error: any) {
            throw error;
        }
    }

    static async revokeBan(serverId: number, userId: number, requesterId: number) {
        try {
            await prisma.ban.updateMany({
                where: {
                    serverId,
                    userId,
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
}

export default BanService;