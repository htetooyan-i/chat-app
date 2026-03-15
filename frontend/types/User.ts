export type User = {
  id: number;
  username: string;
  email: string;
  verified: boolean;
  bio?: string;
  avatarUrl?: string;
  createdAt: Date | string;
};