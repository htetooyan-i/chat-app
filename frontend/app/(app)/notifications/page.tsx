"use client";

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
import { useAuth } from "@/hooks/useAuth";
import { useNofi } from "@/hooks/useNoti";
import { Notification } from "@/types/Notification";

const formatDateTime = (dateInput: Date | string) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function NotificationsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const {
        notifications,
        unreadCount,
        selectedNoti,
        modalOpen,
        openNotification,
        markAllAsRead,
        closeNotification,
    } = useNofi();

    const handleBack = () => {
        if (window.history.length > 1) {
        router.back();
        return;
        }

        router.push("/channels");
    };

    const personalizeDescription = (notification: Notification) => {
        if (!user) return notification.description;

        const trackedTypes = ["MEMBER_ADDED", "MEMBER_BANNED", "MEMBER_LEFT", "MEMBER_KICKED"];
        if (!trackedTypes.includes(notification.type)) return notification.description;

        let text = notification.description;

        const escapedUsername = user.username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        text = text.replace(new RegExp(`\\b${escapedUsername}\\b`, "g"), "You");
        text = text.replace(new RegExp(`\\bUser\\s*#${user.id}\\b`, "gi"), "You");
        text = text.replace(/\bYou was\b/g, "You were");

        return text;
    };

    return (
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-background px-6 py-6 md:px-10">
            <div className="sticky top-0 z-20 shrink-0 bg-background">
                <div className="mb-3">
                    <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    size="icon"
                    className="cursor-pointer hover:border-accent hover:bg-accent/10 hover:text-accent"
                    aria-label="Go back"
                    title="Back"
                    >
                    <ArrowLeft className="h-4 w-4 transition-colors duration-200" />
                    </Button>
                </div>

                <header className="mb-6 flex flex-col gap-4 border-b border-muted-border pb-4">
                    <div className="flex items-center gap-3">
                        <BellRing className="h-6 w-6 text-accent" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                            <p className="text-sm text-muted-text">Click a notification to read the full details.</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={markAllAsRead}
                            disabled={unreadCount === 0}
                            className="cursor-pointer border-accent/60 text-accent hover:border-accent hover:bg-accent/10 hover:text-accent disabled:border-muted-border disabled:text-muted-text disabled:hover:border-muted-border disabled:hover:bg-transparent disabled:hover:text-muted-text"
                        >
                            Mark all as read
                        </Button>
                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                            {unreadCount} unread
                        </span>
                    </div>
                </header>
            </div>

            <ScrollArea className="min-h-0 flex-1 pr-2 [&_[data-slot=scroll-area-scrollbar][data-orientation=vertical]]:w-1.5 [&_[data-slot=scroll-area-scrollbar][data-orientation=vertical]]:p-0.5 [&_[data-slot=scroll-area-thumb]]:bg-muted-border">
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
                        onClick={() => openNotification(notification)}
                        className={`h-auto w-full cursor-pointer rounded-md border p-4 text-left transition ${
                        notification.isRead
                            ? "border-muted-border bg-chat-panel"
                            : "border-accent/50 bg-accent/10 hover:border-accent hover:bg-accent/20"
                        }`}
                    >
                        <div className="w-full">
                        <div className="mb-1 flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                            <span className="text-xs text-muted-text">{formatDateTime(notification.createdAt)}</span>
                        </div>
                        <p className="text-sm text-muted-text line-clamp-1">{personalizeDescription(notification)}</p>
                        </div>
                    </Button>
                    ))
                )}
                </div>
            </ScrollArea>

            <Dialog
                open={modalOpen}
                onOpenChange={(open) => {
                if (!open) {
                    closeNotification();
                }
                }}
            >
                <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{selectedNoti?.title}</DialogTitle>
                    <DialogDescription>{selectedNoti ? selectedNoti.type.replace("_", " ") : ""}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <p className="text-sm text-foreground">{selectedNoti ? personalizeDescription(selectedNoti) : ""}</p>
                    {selectedNoti ? (
                    <p className="text-xs text-muted-text">{formatDateTime(selectedNoti.createdAt)}</p>
                    ) : null}
                </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
