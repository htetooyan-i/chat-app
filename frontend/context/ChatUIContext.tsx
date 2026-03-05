"use client";
import React, { createContext, useCallback, useEffect, useState, useRef, useMemo } from "react";   
import { useParams } from "next/navigation";

import { useSocket } from "@/hooks/useSocket";
import { Message } from "@/types/Message";
import { useAuth } from "@/hooks/useAuth";

type ChatUIContextType = {
    replyMessage: Message | null;
    setReplyMessage: React.Dispatch<React.SetStateAction<Message | null>>;

    editMessage: Message | null;
    setEditMessage: React.Dispatch<React.SetStateAction<Message | null>>;

    typingUsers: { userId: string; username: string }[];
    handleTyping: () => void;
    stopTyping: () => void;
};

export const ChatUIContext = createContext<ChatUIContextType | null>(null);

export const ChatUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { socket } = useSocket();
    const { user } = useAuth();
    const params = useParams();
    const channelId = Array.isArray(params.channelId)
                    ? params.channelId[0]
                    : params.channelId;

    const [ replyMessage, setReplyMessage ] = useState<Message | null>(null);
    const [ editMessage, setEditMessage ] = useState<Message | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [ typingUsers, setTypingUsers ] = useState<{ userId: string; username: string }[]>([]);
    const typingTimeout = useRef<NodeJS.Timeout | null>(null);

    const stopTyping = () => {
        if (!socket || !channelId || !user) return;

        setIsTyping(false);
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
            typingTimeout.current = null;
        }

        socket.emit("typingStop", {
            channelId,
            userId: user.id,
            username: user.username,
        });
        console.log("Emitted typingStop");
    };

    // Debounced auto stop after 10s
    const debounceStopTyping = () => {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);

        typingTimeout.current = setTimeout(() => {
            stopTyping();
        }, 10000);
    };

    // Called whenever user types
    const handleTyping = () => {
        if (!socket || !channelId || !user) return;

        if (!isTyping) {
            setIsTyping(true);
            socket.emit("typingStart", {
                channelId,
                userId: user.id,
                username: user.username,
            });
            console.log("Emitted typingStart");
        }

        debounceStopTyping();
    };


    useEffect(() => {
        if (!socket) return;

        const handleUserTyping = ({ userId, username }: { userId: string; username: string }) => {
            setTypingUsers(prev => {
                const alreadyTyping = prev.some(u => u.userId === userId);
                const updated = alreadyTyping ? prev : [...prev, { userId, username }];
                return updated;
            });
        };

        const handleUserStopTyping = ({ userId }: { userId: string }) => {
            setTypingUsers(prev => prev.filter(u => u.userId !== userId));
        };

        socket.on("userTyping", handleUserTyping);
        socket.on("userStopTyping", handleUserStopTyping);

        return () => {
            socket.off("userTyping", handleUserTyping);
            socket.off("userStopTyping", handleUserStopTyping);
        };
    }, [socket]);


    return (
        <ChatUIContext.Provider value={{ replyMessage, setReplyMessage, editMessage, setEditMessage, typingUsers, handleTyping, stopTyping }}>
            {children}
        </ChatUIContext.Provider>
    );
};