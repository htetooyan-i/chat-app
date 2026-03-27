import {ApiResponse} from "@/types/ApiResponse";

export type Presence = {
  status: string;
  updatedAt: Date | string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  verified: boolean;
  bio?: string;
  avatarUrl?: string;
  presence?: Presence | null;
  createdAt: Date | string;
};

export type GetUserResponse = ApiResponse<User>;