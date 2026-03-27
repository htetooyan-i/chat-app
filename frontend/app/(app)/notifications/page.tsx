"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, BellRing } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type NotificationItem = {
  id: number;
  title: string;
  summary: string;
  description: string;
  createdAt: string;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Welcome to Notifications",
    summary: "This page now supports notification details.",
    description:
      "You can click any notification card to open a modal and read the full description. This is ready to be connected to backend data.",
    createdAt: "2026-03-27T09:30:00.000Z",
    read: false,
  },
  {
    id: 2,
    title: "Server Member Updated",
    summary: "A member presence status changed in your server.",
    description:
      "Presence updates are now reflected in the member list and can be used as notification entries. You can map backend events to this page next.",
    createdAt: "2026-03-27T08:40:00.000Z",
    read: false,
  },
  {
    id: 3,
    title: "Reminder",
    summary: "Review your server settings.",
    description:
      "Server settings help manage channels, roles, and moderation flow. Open settings from the context menu on a server icon in the sidebar.",
    createdAt: "2026-03-26T18:15:00.000Z",
    read: true,
  },
];

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedNoti, setSelectedNoti] = useState<NotificationItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  const handleOpenNotification = (notification: NotificationItem) => {
    setSelectedNoti(notification);
    setModalOpen(true);

    if (!notification.read) {
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                read: true,
              }
            : item
        )
      );
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/channels");
  };

  return (
    <div className="w-full h-full bg-background px-6 py-6 md:px-10">
      <div className="mb-3">
        <Button
          type="button"
          onClick={handleBack}
          variant="outline"
          size="icon"
          className="cursor-pointer hover:border-accent hover:bg-accent/10"
          aria-label="Go back"
          title="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      <header className="mb-6 flex items-center justify-between border-b border-muted-border pb-4">
        <div className="flex items-center gap-3">
          <BellRing className="h-6 w-6 text-accent" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-text">Click a notification to read the full details.</p>
          </div>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
          {unreadCount} unread
        </span>
      </header>

      <ScrollArea className="h-[calc(100vh-190px)] pr-2">
        <div className="flex flex-col gap-3">
          {notifications.length === 0 ? (
            <div className="rounded-md border border-dashed border-muted-border bg-chat-panel p-8 text-center text-muted-text">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notification) => (
              <Button
                key={notification.id}
                type="button"
                variant="ghost"
                onClick={() => handleOpenNotification(notification)}
                className={`h-auto w-full cursor-pointer rounded-md border p-4 text-left transition ${
                  notification.read
                    ? "border-muted-border bg-chat-panel"
                    : "border-accent/50 bg-accent/10 hover:border-accent hover:bg-accent/20"
                }`}
              >
                <div className="w-full">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                    <span className="text-xs text-muted-text">{formatDateTime(notification.createdAt)}</span>
                  </div>
                  <p className="text-sm text-muted-text">{notification.summary}</p>
                </div>
              </Button>
            ))
          )}
        </div>
      </ScrollArea>

      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) {
            setSelectedNoti(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedNoti?.title}</DialogTitle>
            <DialogDescription>{selectedNoti?.summary}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-foreground">{selectedNoti?.description}</p>
            {selectedNoti ? (
              <p className="text-xs text-muted-text">{formatDateTime(selectedNoti.createdAt)}</p>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
