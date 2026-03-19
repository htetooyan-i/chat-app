import { User } from "./User";
import {ApiResponse} from "@/types/ApiResponse";

export type ServerInvite = {
    id: number;
    serverId: number;
    code: string;
    expiresAt: Date | null;
    currentUses: number;
    maxUses: number | null;
    createdBy: User | null;
}

export type GetServerInvitesResponse = ApiResponse<ServerInvite[]>;

export type GetServerInviteResponse = ApiResponse<ServerInvite>;

export type CreateServerInviteResponse = ApiResponse<ServerInvite>;