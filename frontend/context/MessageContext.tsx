"use client";
import React, { createContext, useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";

import api from "@/lib/api";
import { Message } from "@/types/Message";
import { useSocket } from "@/hooks/useSocket";
import { groupMessagesByDate } from '@/lib/helper';
import { useAuth } from "@/hooks/useAuth";

type MessageContextType = {

  messages: Message[];
  groupedMessages: Record<string, Message[]>;
  hasMore: boolean;

  sendMessage: (content: string, replyMessage: Message | null) => void;
  editExistingMessage: (messageId: number, content: string) => Promise<void>;
  deleteMessage: (messageId: number) => Promise<void>;

  loadMore: () => Promise<void>;
};

export const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { socket } = useSocket();
    const { user } = useAuth();
    const params = useParams();  
    const channelId: number = Array.isArray(params.channelId)
                    ? Number(params.channelId[0])
                    : Number(params.channelId);
    

    const [ messages, setMessages ] = useState<Message[]>([]);
    const groupedMessages = useMemo(
                                () => groupMessagesByDate(messages),
                                [messages]
                            );
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const oldestMessageId = useRef<number | null>(null);

    const handleNewMessage = (message: Message) => {
        setMessages(prev => {
            const tempIndex = prev.findIndex(m => m.clientMsgId === message.clientMsgId);

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

    const handleDeletedMessage = ({messageId}: {messageId: number}) => {
        setMessages(prev => {
            return prev
                .filter(msg => msg.id !== messageId)
                .map(msg =>
                    msg.replyToMessageId === messageId
                        ? { ...msg, replyToMessageId: null, replyToDeleted: true }
                        : msg
                );
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

        socket.on("newMessage", handleNewMessage);
        socket.on("messageEdited", handleEditedMessage);
        socket.on("messageDeleted", handleDeletedMessage);

        fetchMessages();

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("messageEdited", handleEditedMessage);
            socket.off("messageDeleted", handleDeletedMessage);
            socket.emit("leaveChannel", `channel-${channelId}`);
        };
    }, [channelId, socket]);

    const sendMessage = (text: string, replyMessage: Message | null) => {
        if (!text.trim() || !socket || !channelId || !user) return;

        const tempId = -Date.now();
        const clientMsgId = crypto.randomUUID();
        const newMessage: Message = {
            id: tempId,
            channelId: channelId,
            authorId: user.id,
            replyToMessageId: replyMessage?.id,
            content: text,
            createdAt: new Date(),
            clientMsgId: clientMsgId,
            author: {
                id: user.id,
                email: user.email,
                username: user.username,
                avatarUrl: "", // Current I haven't implemented avatar upload, so this will be default avatar.
                createdAt: new Date(),
            },
            replyTo: replyMessage || null
        };

        // Update UI immediately with temp message
        setMessages(prev => [...prev, newMessage]);

        socket.emit("sendMessage", {
            channelId: Number(channelId),
            content: text,
            authorId: user.id,
            replyToMessageId: replyMessage?.id,
            clientMsgId: clientMsgId,
        });
    };

    const editExistingMessage = async (messageId: number, newContent: string) => {
        if (!socket) return;

        await api.patch(`/messages/${messageId}`, { content: newContent });

        // update UI
        setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, content: newContent, editedAt: new Date() } : msg));
    };

    const deleteMessage = async (messageId: number) => {
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