import type { MemberRole } from "./ServerMember";

export type ServerBan = {
    id: number;
    userId: number;
    serverId: number;
    bannedByRole: MemberRole;
    reason?: string;
    expiresAt?: Date;
    createdAt: Date;
    revokedAt?: Date;
    appealStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "REVOKED" | "SUPERSEDED";
    user: {
        username: string;
        avatar?: string;
    }
}