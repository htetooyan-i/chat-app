import { prisma } from '../lib/prisma';
import { MemberRole } from "../../generated/prisma/enums";

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
            throw error;
        }
    }

    static async addMember(serverId: number, userId: number) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new Error("Server not found");
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
                throw new Error("User is already a member");
            }
            const serverMember = await prisma.serverMember.create({
                data: {
                    userId,
                    serverId,
                    role: server.ownerId === userId ? MemberRole.OWNER : MemberRole.MEMBER,
                },
            });
            return serverMember;
        } catch (error: any) {
            console.error('Error adding member to server:', error.message);
            throw error;
        }

    }

    static async removeMember(serverId: number, memberId: number, requesterId: number) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new Error("Server not found");
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
                throw new Error("Invalid member");
            }

            // Prevent removing owner
            if (member.userId === server.ownerId) {
                throw new Error("Cannot remove server owner");
            }
            
            if (member.userId === requesterId) {
                throw new Error("Members cannot remove themselves. Use the leave server option instead.");
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
            throw error;
        }
    }

    static async getServerMembers(serverId: number) {
        try {
            const members = await prisma.serverMember.findMany({
                where: { serverId },
                include: { user: true },
            });
            return members;
        } catch (error: any) {
            console.error('Error retrieving server members:', error.message);
            throw error;
        }
    }

    static async leaveServer(serverId: number, userId: number) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new Error("Server not found");
            }

            if (server.ownerId === userId) {
                throw new Error("Owner cannot leave the server");
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
            throw error;
        }
    }

    static async changeMemberRole(serverId: number, memberId: number, newRole: MemberRole) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new Error("Server not found");
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
                throw new Error("Invalid member");
            }

            if (member.userId === server.ownerId) {
                throw new Error("Cannot change role of server owner");
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
            throw error;
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
            throw error;
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
            throw error;
        }
    }
}

export default ServerMemberService;