import { ApiResponse } from "./ApiResponse";

export type Server = {
  id: number;
  name: string;
  avatarUrl: string | null;
  memberCount: number;
  createdAt: string;
};

export type GetMyServersResponse = ApiResponse<Server[]>;
export type CreateServerResponse = ApiResponse<Server>;