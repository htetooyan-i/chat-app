import { prisma } from '../lib/prisma';
import { MemberRole } from "@prisma/client";
import { AppError } from '../errors/appError';

class ServerMemberService {

    static async getCurrentUserServers(userId: number) {
        try {
            const servers = await prisma.serverMember.findMany({
            where: { userId },
            include: {
                server: {
                include: {
                    _count: {
                    select: { members: true },
                    },
                },
                },
            },
            orderBy: { server: { createdAt: 'asc' }}
            });

            return servers.map((member) => ({
            ...member.server,
            memberCount: member.server._count.members,
            }));
        } catch (error: any) {
            console.error("Error retrieving user servers:", error.message);
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to retrieve user servers', 500);
        }
    }

    static async addMember(serverId: number, userId: number) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new AppError('SERVER_NOT_FOUND', 'Server not found', 404);
            }

            const existingMember = await prisma.serverMember.findUnique({
                where: {
                    userId_serverId: {
                        userId,
                        serverId,
                    },
                },
            });

            if (existingMember) {
                throw new AppError('MEMBER_ALREADY_EXISTS', 'User is already a member', 409);
            }
            return await prisma.serverMember.create({
                data: {
                    userId,
                    serverId,
                    role: server.ownerId === userId ? MemberRole.OWNER : MemberRole.MEMBER,
                },
                include: { user: true, server: true },
            });
        } catch (error: any) {
            console.error('Error adding member to server:', error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to add member', 500);
        }

    }

    static async removeMember(serverId: number, memberId: number, requesterId: number) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new AppError('SERVER_NOT_FOUND', 'Server not found', 404);
            }

            // Get the member being removed
            const member = await prisma.serverMember.findUnique({
                where: {
                    userId_serverId: {
                        userId: memberId,
                        serverId,
                    },
                },
            });

            if (!member || member.serverId !== serverId) {
                throw new AppError('MEMBER_NOT_FOUND', 'Invalid member', 404);
            }

            // Prevent removing owner
            if (member.userId === server.ownerId) {
                throw new AppError('FORBIDDEN', 'Cannot remove server owner', 403);
            }
            
            if (member.userId === requesterId) {
                throw new AppError('FORBIDDEN', 'Members cannot remove themselves. Use the leave server option instead.', 403);
            }
            
            await prisma.serverMember.delete({
                where: {
                    userId_serverId: {
                        userId: memberId,
                        serverId,
                    },
                },
            });

        } catch (error: any) {
            console.error("Error removing member from server:", error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to remove member', 500);
        }
    }

    static async getServerMembers(serverId: number) {
        try {
            const members = await prisma.serverMember.findMany({
                where: { serverId },
                include: {
                    user: {
                        include: {
                            presence: true,
                        },
                    },
                },
            });
            return members;
        } catch (error: any) {
            console.error('Error retrieving server members:', error.message);
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to retrieve server members', 500);
        }
    }

    static async leaveServer(serverId: number, userId: number) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new AppError('SERVER_NOT_FOUND', 'Server not found', 404);
            }

            if (server.ownerId === userId) {
                throw new AppError('FORBIDDEN', 'Owner cannot leave the server', 403);
            }

            await prisma.serverMember.delete({
                where: {
                    userId_serverId: {
                        userId,
                        serverId,
                    },
                },
            });
        } catch (error: any) {
            console.error('Error leaving server:', error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to leave server', 500);
        }
    }

    static async changeMemberRole(serverId: number, memberId: number, newRole: MemberRole) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new AppError('SERVER_NOT_FOUND', 'Server not found', 404);
            }

            // Get the member being updated
            const member = await prisma.serverMember.findUnique({
                where: {
                    userId_serverId: {
                        userId: memberId,
                        serverId,
                    },
                },
            });

            if (!member || member.serverId !== serverId) {
                throw new AppError('MEMBER_NOT_FOUND', 'Invalid member', 404);
            }

            if (member.userId === server.ownerId) {
                throw new AppError('FORBIDDEN', 'Cannot change role of server owner', 403);
            }

            await prisma.serverMember.update({
                where: {
                    userId_serverId: {
                        userId: memberId,
                        serverId,
                    },
                },
                data: {
                    role: newRole,
                },
            });
        } catch (error: any) {
            console.error('Error changing member role:', error.message);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to change member role', 500);
        }
    }

    static async getServerMember(serverId: number, userId: number) {
        try {
            const member = await prisma.serverMember.findUnique({
                where: {
                    userId_serverId: {
                        userId,
                        serverId,
                    },
                },
            });
            return member;
        } catch (error: any) {
            console.error('Error retrieving server member:', error.message);
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to retrieve server member', 500);
        }
    }

    static async getMemberByUserId(serverId: number, userId: number) {
        try {
            const member = await prisma.serverMember.findUnique({
                where: {
                    userId_serverId: {
                        userId,
                        serverId,
                    },
                },
            });
            return member;
        } catch (error: any) {
            console.error('Error retrieving server member by user ID:', error.message);
            throw new AppError('INTERNAL_SERVER_ERROR', error.message || 'Failed to retrieve server member by user ID', 500);
        }
    }
}

export default ServerMemberService;