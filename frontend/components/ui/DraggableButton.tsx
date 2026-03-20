"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { motion } from "motion/react";
import { ShieldX } from "lucide-react";
import { MessageFilled } from "@ant-design/icons";
import HoverCardUI from "./HoverCard";

export default function DraggableButton() {
    const [isDragging, setIsDragging] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // render nothing on server

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <motion.div
                    drag
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => {
                        setTimeout(() => setIsDragging(false), 50);
                    }}
                    onClick={(e) => {
                        if (isDragging) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }}
                    className="fixed bottom-4 right-4 text-white cursor-grab active:cursor-grabbing bg-accent rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-50"
                >
                    <HoverCardUI
                        trigger={<MessageFilled style={{color: "var(--foreground)", fontSize: "1.25rem", display: "flex", justifyContent: "center", alignItems: "center" }} />}
                        content={
                            <div className="p-2 text-sm text-foreground">
                                <p>Help Us 🫶</p>
                            </div>
                        }
                    />
                </motion.div>
            </AlertDialogTrigger>

        <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-red-100 text-red-500 w-10 h-10 flex items-center justify-center mb-4">
                        <ShieldX />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Found a bug?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This is the beta version of the app, so there might be some bugs. If you find any, you are more than welcome to report them to us. We will try our best to fix them as soon as possible. Thank you for your support!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="bg-chat-panel border-t border-muted-border">
                    <AlertDialogCancel className="border border-muted-border hover:bg-muted-background cursor-pointer">
                        <HoverCardUI
                            trigger={<span>Close</span>}
                            content={
                            <div className="p-2 text-sm text-foreground">
                                <p>Are you sure 😢</p>
                            </div>
                            }
                            position="top"
                        />
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <button
                        type="button"
                        className="!border !border-error-border !text-error !bg-error-background cursor-pointer px-4 py-2 rounded hover:bg-error-hover"
                        onClick={() => {
                            window.location.href = `mailto:support@konyat.chat?subject=${encodeURIComponent(
                            "Bug Report - Konyat App"
                            )}&body=${encodeURIComponent(
                            "Describe the bug you encountered:\n\nPlease provide an image of the bug if possible:\n\nExpected result:\n\nActual result:\n"
                            )}`;
                        }}
                        >
                        Report Bug
                        </button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}