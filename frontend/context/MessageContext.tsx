"use client";
import React, { createContext, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";

import api from "@/lib/api";
import { Message } from "@/types/Message";
import { useSocket } from "@/hooks/useSocket";
import { groupMessagesByDate, addMessageToGroup } from '@/lib/helper';
import { useAuth } from "@/hooks/useAuth";

type MessageContextType = {

  messages: Message[];
  groupedMessages: Record<string, Message[]>;
  hasMore: boolean;

  sendMessage: (content: string, replyMessage: Message | null) => void;
  editExistingMessage: (messageId: string, content: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;

  loadMore: () => Promise<void>;
};

export const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { socket } = useSocket();
    const { user } = useAuth();
    const params = useParams();  
    const channelId = Array.isArray(params.channelId)
                    ? params.channelId[0]
                    : params.channelId;
    

    const [ messages, setMessages ] = useState<Message[]>([]);
    const groupedMessages = useMemo(
                                () => groupMessagesByDate(messages),
                                [messages]
                            );
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const oldestMessageId = useRef<string | null>(null);

    const handleNewMessage = (message: any) => {
        setMessages(prev => {
            const tempIndex = prev.findIndex(m => m.id === message.clientMsgId);

            if (tempIndex !== -1) {
                const updated = [...prev];
                updated[tempIndex] = message;
                return updated;
            }

            return [...prev, message];
        });
    };

    const handleEditedMessage = (message: Message) => {
        setMessages(prev => prev.map(msg => msg.id === message.id ? { ...msg, content: message.content, editedAt: new Date() } : msg));
    };

    const handleDeletedMessage = ({messageId}: {messageId: string}) => {
        setMessages(prev => {
            const updatedMessages = prev
                .filter(msg => msg.id !== messageId)
                .map(msg =>
                    msg.replyToMessageId === messageId
                        ? { ...msg, replyToMessageId: null, replyToDeleted: true }
                        : msg
                );
            return updatedMessages;
        });
    };

    const fetchMessages = async () => {
        setMessages([]);
        oldestMessageId.current = null;
        setHasMore(true);
        try {
            const response = await api.get(`/channels/${channelId}/messages?limit=50`);
            const sorted = [...response.data].reverse(); 
            
            oldestMessageId.current = sorted[0]?.id ?? null;
            setHasMore(response.data.length === 50); // if less than limit, no more pages
            setMessages(sorted);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };

    useEffect(() => {
        if (!socket || !channelId) return;

        const join = () => {
            socket.emit("joinChannel", channelId);
            console.log("Joined channel:", channelId);
        };

        if (socket.connected) {
            join();
        } else {
            socket.once("connect", join);
        }

        socket.on("newMessage", handleNewMessage);
        socket.on("messageEdited", handleEditedMessage);
        socket.on("messageDeleted", handleDeletedMessage);

        fetchMessages();

        return () => {
            socket.off("connect", join);
            socket.off("newMessage", handleNewMessage);
            socket.off("messageEdited", handleEditedMessage);
            socket.off("messageDeleted", handleDeletedMessage);
            socket.emit("leaveChannel", `channel-${channelId}`);
        };
    }, [channelId, socket]);

    const sendMessage = (text: string, replyMessage: Message | null) => {
        if (!text.trim() || !socket || !channelId || !user) return;

        const tempId = `temp-${Date.now()}`;
        const newMessage: Message = {
            id: tempId,
            channelId: channelId,
            authorId: user.id,
            replyToMessageId: replyMessage?.id,
            content: text,
            createdAt: new Date(),  
            author: {
                id: user.id,
                username: user.username,
                avatarUrl: "", // Current I haven't implemented avatar upload, so this will be default avatar.
            },
            replyTo: replyMessage || null
        };

        // Update UI immediately with temp message
        setMessages(prev => [...prev, newMessage]);

        socket.emit("sendMessage", {
            channelId: Number(channelId),
            content: text,
            clientMsgId: tempId,
            authorId: user.id,
            replyToMessageId: replyMessage?.id,
        });
        console.log("Emitted sendMessage with tempId:", tempId);
    };

    const editExistingMessage = async (messageId: string, newContent: string) => {
        if (!socket) return;

        await api.patch(`/messages/${messageId}`, { content: newContent });

        // update UI
        setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, content: newContent, editedAt: new Date() } : msg));
    };

    const deleteMessage = async (messageId: string) => {
        if (!socket) return;

        await api.delete(`channels/${channelId}/messages/${messageId}`);

        // update UI
        setMessages(prev => {
            const updatedMessages = prev
                .filter(msg => msg.id !== messageId)
                .map(msg =>
                    msg.replyToMessageId === messageId
                        ? { ...msg, replyToMessageId: null, replyToDeleted: true }
                        : msg
                );

            return updatedMessages;
        });
    };

    const loadMore = async () => {
        if (isFetchingMore || !hasMore || !oldestMessageId.current) return;
        setIsFetchingMore(true);

        try {
            const response = await api.get(`/channels/${channelId}/messages?limit=50&before=${oldestMessageId.current}`);

            if (response.data.length === 0) {
                setHasMore(false);
                return;
            }

            const older = [...response.data].reverse();
            oldestMessageId.current = older[0]?.id ?? null;
            setHasMore(response.data.length === 50);

            setMessages(prev => {
                const updated = [...older, ...prev];
                return updated;
            });

        } finally {
            setIsFetchingMore(false);
        }
    };

    return (
        <MessageContext.Provider value={{ messages, groupedMessages, hasMore, sendMessage, editExistingMessage, deleteMessage, loadMore }}>
            {children}
        </MessageContext.Provider>
    );
};