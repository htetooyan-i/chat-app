import { User } from "./User";

export type ServerInvite = {
    id: number;
    serverId: number;
    code: string;
    expiresAt: Date | null;
    currentUses: number;
    maxUses: number | null;
    createdBy: User | null;
}