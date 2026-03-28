"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";

import { api } from "@/lib/api";
import { useSocket } from "@/hooks/useSocket";
import {
  GetNotificationsResponse,
  Notification,
  NotificationCreatedEvent,
} from "@/types/Notification";

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  selectedNoti: Notification | null;
  modalOpen: boolean;
  openNotification: (notification: Notification) => void;
  markAllAsRead: () => Promise<void>;
  closeNotification: () => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNoti, setSelectedNoti] = useState<Notification | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get<GetNotificationsResponse>("/users/me/notifications");
        setNotifications(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications]
  );

  useEffect(() => {
    if (!socket) return;

    const handleNotificationCreated = (payload: NotificationCreatedEvent) => {
      setNotifications((prev) => {
        const duplicate = prev.some(
          (item) =>
            item.serverId === payload.serverId &&
            item.title === payload.title &&
            item.description === payload.description &&
            new Date(item.createdAt).toISOString() === new Date(payload.createdAt).toISOString()
        );

        if (duplicate) return prev;

        const newNotification: Notification = {
          id: -Date.now(),
          serverId: payload.serverId,
          type: payload.type,
          title: payload.title,
          description: payload.description,
          isRead: false,
          createdAt: payload.createdAt,
        };

        return [newNotification, ...prev];
      });
    };

    socket.on("notificationCreated", handleNotificationCreated);

    return () => {
      socket.off("notificationCreated", handleNotificationCreated);
    };
  }, [socket]);

  const openNotification = async (notification: Notification) => {
    setSelectedNoti(notification);
    setModalOpen(true);

    if (!notification.isRead) {
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                isRead: true,
              }
            : item
        )
      );

      if (notification.id > 0) {
        try {
          await api.patch(`/users/me/notifications/${notification.id}/read`);
        } catch (error) {
          console.error("Failed to mark notification as read:", error);
        }
      }
    }
  };

  const closeNotification = () => {
    setModalOpen(false);
    setSelectedNoti(null);
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));

    try {
      await api.patch("/users/me/notifications/read-all");
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        selectedNoti,
        modalOpen,
        openNotification,
        markAllAsRead,
        closeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
