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

    static async removeMember(serverId: number, userId: number) {
        try {
            await prisma.serverMember.delete({
                where: { userId_serverId: { userId, serverId } },
            });
        } catch (error: any) {
            console.error('Error removing member from server:', error.message);
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