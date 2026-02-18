import { prisma } from '../lib/prisma';
import { MemberRole } from "../../generated/prisma/enums";

class ServerMemberService {

    static async getCurrentUserServers(userId: number) {
        try {
            const servers = await prisma.serverMember.findMany({
                where: { userId },
                include: { server: true },
            });
            return servers.map((member) => member.server);
        } catch (error: any) {
            console.error('Error retrieving user servers:', error.message);
            throw error;
        }
    }

    static async addMember(serverId: number, userId: number) {
        try {
            const serverMember = await prisma.serverMember.create({
                data: {
                    userId,
                    serverId,
                    role: MemberRole.ADMIN,
                },
            });
            return serverMember;
        } catch (error: any) {
            console.error('Error adding member to server:', error.message);
            throw error;
        }

    }

    static async removeMember(serverId: number, requesterId: number, memberId: number) {
        try {
            const server = await prisma.server.findUnique({
                where: { id: serverId },
            });

            if (!server) {
                throw new Error("Server not found");
            }

            // Get requester role
            const requesterMembership = await prisma.serverMember.findUnique({
                where: { userId_serverId: { userId: requesterId, serverId } },
            });

            if (
                !requesterMembership ||
                (
                    requesterMembership.role !== MemberRole.ADMIN &&
                    requesterMembership.role !== MemberRole.MODERATOR &&
                    server.ownerId !== requesterId
                )
            ) {
                throw new Error("Unauthorized");
            }

            // Get the member being removed
            const member = await prisma.serverMember.findUnique({
                where: { id: memberId },
            });

            if (!member || member.serverId !== serverId) {
                throw new Error("Invalid member");
            }

            // Prevent removing owner
            if (member.userId === server.ownerId) {
                throw new Error("Cannot remove server owner");
            }

            await prisma.serverMember.delete({
                where: { id: memberId },
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

}

export default ServerMemberService;