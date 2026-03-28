import { NotificationType } from "@prisma/client";

import { prisma } from "../lib/prisma";

class NotificationService {
  static async createForServerMembers(
    serverId: number,
    type: NotificationType,
    title: string,
    description: string,
    extraRecipientUserIds: number[] = []
  ) {
    const members = await prisma.serverMember.findMany({
      where: { serverId },
      select: { userId: true },
    });

    const recipientUserIds = Array.from(
      new Set([
        ...members.map((member) => member.userId),
        ...extraRecipientUserIds,
      ])
    );

    if (recipientUserIds.length === 0) {
      return { count: 0, createdAt: new Date().toISOString() };
    }

    const createdAt = new Date();

    const result = await prisma.notification.createMany({
      data: recipientUserIds.map((recipientUserId) => ({
        userId: recipientUserId,
        serverId,
        type,
        title,
        description,
        createdAt,
      })),
    });

    return {
      count: result.count,
      createdAt: createdAt.toISOString(),
    };
  }

  static async getForUser(userId: number) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  static async markAsRead(notificationId: number, userId: number) {
    const updateResult = await prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
      },
      data: {
        isRead: true,
      },
    });

    if (updateResult.count === 0) {
      return null;
    }

    return prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });
  }

  static async markAllAsReadForUser(userId: number) {
    const result = await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return result.count;
  }
}

export default NotificationService;
