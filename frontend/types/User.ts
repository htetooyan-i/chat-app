import {ApiResponse} from "@/types/ApiResponse";

export type User = {
  id: number;
  username: string;
  email: string;
  verified: boolean;
  bio?: string;
  avatarUrl?: string;
  createdAt: Date | string;
};

export type GetUserResponse = ApiResponse<User>;