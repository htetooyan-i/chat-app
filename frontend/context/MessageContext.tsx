"use client";
import React, { createContext, useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";

import {api, getErrorMessage} from "@/lib/api";
import {Message, Reaction} from "@/types/Message";
import { useSocket } from "@/hooks/useSocket";
import { groupMessagesByDate } from '@/lib/helper';
import { useAuth } from "@/hooks/useAuth";
import { UploadAttachment } from "@/types/Attachment";

type MessageContextType = {

  messages: Message[];
  groupedMessages: Record<string, Message[]>;
  loading: boolean;
  hasMore: boolean;

  sendMessage: (content: string, replyMessage: Message | null, attachments: UploadAttachment[]) => void;
  editExistingMessage: (messageId: number, content: string, updatedFiles: UploadAttachment[]) => Promise<void>;
  deleteMessage: (messageId: number) => Promise<void>;

  loadMore: () => Promise<void>;

  toggleReaction: (messageId: number, emoji: string) => Promise<void>;
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
    const [ loading, setLoading ] = useState(false);
    const groupedMessages = useMemo(
                                () => groupMessagesByDate(messages),
                                [messages]
                            );

    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const oldestMessageId = useRef<number | null>(null);

    const fetchMessages = useCallback(async () => {
        setMessages([]);
        oldestMessageId.current = null;
        setHasMore(true);
        setLoading(true);
        try {
            const response = await api.get(`/channels/${channelId}/messages?limit=50`);
            const sorted = [...response.data].reverse();
            oldestMessageId.current = sorted[0]?.id ?? null;
            setHasMore(response.data.length === 50);
            setMessages(sorted);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setLoading(false);
        }
    }, [channelId]);

    useEffect(() => {
        if (!socket || !channelId) return;

        const handleNewMessage = (message: Message) => {
            setMessages(prev => {
                const tempIndex = prev.findIndex(m => m.clientMsgId === message.clientMsgId);
                console.log(message);
                if (tempIndex !== -1) {
                    const updated = [...prev];
                    updated[tempIndex] = message;
                    return updated;
                }

                return [...prev, message];
            });
        };

        const handleEditedMessage = (message: Message) => {
            setMessages(prev => prev.map(msg => msg.id === message.id ? { ...msg, content: message.content, editedAt: new Date(), attachments: message.attachments } : msg));
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

        const handleToggleReaction = (data: {messageId: number, reaction: Reaction, action: string}) => {
            setMessages(prev => prev.map(msg => {
                if (msg.id !== data.messageId) return msg;

                const reactions = msg.reactions ?? [];
                const existing = reactions.find(r => r.emoji === data.reaction.emoji);

                if (data.action === "added") {
                    if (existing) {
                        if (existing.userIds.includes(data.reaction.userId)) {
                            return msg; // already counted → do nothing
                        }

                        return {
                            ...msg,
                            reactions: reactions.map(r =>
                                r.emoji === data.reaction.emoji
                                    ? {
                                        ...r,
                                        count: r.count + 1,
                                        userIds: [...r.userIds, data.reaction.userId],
                                    }
                                    : r
                            ),
                        };
                    } else {
                        return {
                            ...msg,
                            reactions: [
                                ...reactions,
                                {
                                    emoji: data.reaction.emoji,
                                    count: 1,
                                    userIds: [data.reaction.userId],
                                },
                            ],
                        };
                    }
                } else {
                    return {
                        ...msg,
                        reactions: reactions
                            .map(r =>
                                r.emoji === data.reaction.emoji
                                    ? {
                                        ...r,
                                        count: r.count - 1,
                                        userIds: r.userIds.filter(id => id !== data.reaction.userId),
                                    }
                                    : r
                            )
                            .filter(r => r.count > 0),
                    };
                }
            }));
        };

        socket.on("newMessage", handleNewMessage);
        socket.on("messageEdited", handleEditedMessage);
        socket.on("messageDeleted", handleDeletedMessage);
        socket.on("reactionToggled", handleToggleReaction);

        fetchMessages();

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("messageEdited", handleEditedMessage);
            socket.off("messageDeleted", handleDeletedMessage);
            socket.emit("leaveChannel", `channel-${channelId}`);
        };
    }, [channelId, socket, fetchMessages]);

    const sendMessage = async (text: string, replyMessage: Message | null, attachments: UploadAttachment[]) => {
        if ((!text.trim() && attachments.length == 0) || !socket || !channelId || !user) return;

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
                bio: user.username,
                avatarUrl: user.avatarUrl,
                verified: user.verified,
                createdAt: new Date(),
            },
            replyTo: replyMessage || null
        };

        // Update UI immediately with a temp message
        setMessages(prev => [...prev, newMessage]);

        try {
            await api.post(`channels/${channelId}/messages`, {
                content: text,
                replyToMessageId: replyMessage?.id,
                clientMsgId,
                attachments: attachments.map(f => ({
                    publicId: f.publicId,
                    url: f.url,
                    type: f.type,
                    originalName: f.originalName,
                })),
            });
        } catch (error) {
            await fetchMessages();
            throw getErrorMessage(error, "Failed to create message. Please try again later.");
        }

    };

    const editExistingMessage = async (messageId: number, newContent: string, updatedFiles: UploadAttachment[]) => {

        if (!socket) return;

        const res = await api.patch(`/messages/${messageId}`, { content: newContent, attachments: updatedFiles });
        const updatedMessage = res.data;
        // update UI
        setMessages(prev => prev.map(msg =>
            msg.id === messageId
                ? { ...msg, content: updatedMessage.content, editedAt: updatedMessage.editedAt, attachments: updatedMessage.attachments }
                : msg
        ));
    };

    const deleteMessage = async (messageId: number) => {
        if (!socket) return;

        // update UI
        setMessages(prev => {
            return prev
                .filter(msg => msg.id !== messageId)
                .map(msg =>
                    msg.replyToMessageId === messageId
                        ? { ...msg, replyToMessageId: null, replyToDeleted: true }
                        : msg
                );
        });

        try {
            await api.delete(`channels/${channelId}/messages/${messageId}`);
        } catch (error) {
            await fetchMessages();
            throw getErrorMessage(error, "Failed to delete message. Please try again later.");
        }
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
                return [...older, ...prev];
            });

        } finally {
            setIsFetchingMore(false);
        }
    };

    // ** REACTION **

    const toggleReaction = async (messageId: number, emoji: string) => {
        await api.post(`/messages/${messageId}/reactions/`, {emoji});
    }


    return (
        <MessageContext.Provider value={{ messages, groupedMessages, loading, hasMore, sendMessage, editExistingMessage, deleteMessage, loadMore, toggleReaction }}>
            {children}
        </MessageContext.Provider>
    );
};