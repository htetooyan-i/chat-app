import { ApiResponse } from "./ApiResponse";
import { User } from "./User";

export type MemberRole = "OWNER" | "ADMIN" | "MEMBER" | "MODERATOR";

export const SERVER_MANAGABLE_ROLES: MemberRole[] = [
  'ADMIN',
  'MODERATOR',
  'OWNER'
];

export type ServerMember = {
    id: number;
    userId: number;
    serverId: number;
    role: MemberRole;
    joinedAt: Date | string;
    user: User;
};

export type PostCreateNewServerMemberResponse = ApiResponse<ServerMember>;
export type GetServerMembersResponse = ApiResponse<ServerMember[]>;