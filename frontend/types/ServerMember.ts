import { User } from "./User";

export type MemberRole = "OWNER" | "ADMIN" | "MEMBER" | "MODERATOR";

export type ServerMember = {
    id: number;
    userId: number;
    serverId: number;
    role: MemberRole;
    joinedAt: Date | string;
    user: User;
};