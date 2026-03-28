import { ApiResponse } from "@/types/ApiResponse";

export type NotificationType = "MEMBER_ADDED" | "MEMBER_LEFT" | "MEMBER_BANNED" | "MEMBER_KICKED";

export type Notification = {
  id: number;
  userId?: number;
  serverId: number;
  type: NotificationType;
  title: string;
  description: string;
  isRead: boolean;
  createdAt: Date | string;
};

export type NotificationCreatedEvent = {
  serverId: number;
  type: NotificationType;
  title: string;
  description: string;
  createdAt: Date | string;
};

export type GetNotificationsResponse = ApiResponse<Notification[]>;
