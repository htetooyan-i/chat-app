"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Layout, message } from 'antd';

import api from '@/lib/api';
import ChatContent from '../chat/ChatContent';
import ChatHeader from '../chat/ChatHeader';
import ChatMessageInput from '../chat/ChatMessageInput';
import InfoPanel from '@/components/layout/InfoPanel';
import { groupMessagesByDate, addMessageToGroup } from '@/lib/helper';
import { useServerLayout } from '@/hooks/useServerLayout';
import { useServer } from '@/hooks/useServer';
import { useChannel } from '@/hooks/useChannel';
import { useSocket } from '@/hooks/useSocket';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';

import { Message } from '@/types/Message';

type Tabs = "settings" | "files" | "users" | "none";

function ChatPanel() {
    
    const { socket } = useSocket();
    
    const { user } = useAuth();
    const { serverId, channelId } = useParams();
    const { servers } = useServer();
    const { channels } = useChannel();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));
    const selectedChannel = channels.find(c => String(c.id) === String(channelId));
    
    const { replyMessage } = useChat();
    const [ messages, setMessages ] = useState<Message[]>([]);
    const [ groupedMessages, setGroupedMessages ] = useState<Record<string, Message[]>>({});
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const oldestMessageId = useRef<string | null>(null);
    
    const { collapsed, setCollapsed } = useServerLayout();
    const [ activeTab, setActiveTab ] = useState<Tabs>("none");
    
    useEffect(() => {
        if (!socket ||!channelId) return;

        socket.emit("joinChannel", channelId);

        const handleNewMessage = (message: any) => {
            setMessages(prev => [...prev, message]);
            setGroupedMessages(prev => {
                const dateKeys = Object.keys(prev);
                let found = false;

                const updated = { ...prev }; // shallow copy
                for (const date of dateKeys) {
                    updated[date] = prev[date].map(msg => {
                        if (msg.id === message.clientMsgId) {
                            found = true;
                            return message; // replace temp with server-confirmed
                        }
                        return msg;
                    });
                    if (found) break; // stop once replaced it
                }

                if (!found) {
                    // If temp message not found, it’s a new message from someone else
                    return addMessageToGroup(prev, message);
                }
                return updated;
            });
        };

        socket.on("newMessage", handleNewMessage);

        const handleEditedMessage = (message: Message) => {
            setMessages(prev => prev.map(msg => msg.id === message.id ? message : msg));
            setGroupedMessages(prev => {
                const updated = { ...prev };
                for (const date in updated) {
                    updated[date] = updated[date].map(msg => msg.id === message.id ? { ...msg, content: message.content, editedAt: new Date() } : msg);
                }
                return updated;
            });
        };

        socket.on("messageEdited", handleEditedMessage);

        const handleDeletedMessage = ({messageId}: {messageId: string}) => {
            setMessages(prev => {
                const updatedMessages = prev
                    .filter(msg => msg.id !== messageId)
                    .map(msg =>
                        msg.replyToMessageId === messageId
                            ? { ...msg, replyToMessageId: null, replyToDeleted: true }
                            : msg
                    );

                setGroupedMessages(groupMessagesByDate(updatedMessages));

                return updatedMessages;
            });
        };

        socket.on("messageDeleted", handleDeletedMessage);

        const fetchMessages = async () => {
            try {
                const response = await api.get(`/channels/${channelId}/messages?limit=50`);
                const sorted = [...response.data].reverse(); 
                
                oldestMessageId.current = sorted[0]?.id ?? null;
                setHasMore(response.data.length === 50); // if less than limit, no more pages
                setMessages(sorted);
                setGroupedMessages(groupMessagesByDate(sorted));
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };
        fetchMessages();

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("messageEdited", handleEditedMessage);
            socket.off("messageDeleted", handleDeletedMessage);
            socket.emit("leaveChannel", `channel-${channelId}`);
        };

        
    }, [channelId, socket]);

    // Load older messages (cursor-based, more reliable than skip/take)
    const loadMore = async () => {
        if (isFetchingMore || !hasMore || !oldestMessageId.current) return;
        setIsFetchingMore(true);

        try {
            const container = containerRef.current;
            const prevScrollHeight = container?.scrollHeight ?? 0;

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
                setGroupedMessages(groupMessagesByDate(updated)); // use updated array, not stale state
                return updated;
            });

            // Preserve scroll position after prepend
            requestAnimationFrame(() => {
            if (container) {
                container.scrollTop = container.scrollHeight - prevScrollHeight;
            }
            });
        } finally {
            setIsFetchingMore(false);
        }
    };

    useEffect(() => {
        if (!sentinelRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) loadMore(); },
            { threshold: 1.0 }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [loadMore]); 

    const handleSendMessage = (text: string) => {
        if (!text.trim() || !socket || !selectedChannel || !user) return;

        const tempId = `temp-${Date.now()}`;
        const newMessage: Message = {
            id: tempId,
            channelId: String(selectedChannel.id),
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
        setGroupedMessages(prev => addMessageToGroup(prev, newMessage));

        socket.emit("sendMessage", {
            channelId: selectedChannel.id,
            content: text,
            clientMsgId: tempId,
            authorId: user.id,
            replyToMessageId: replyMessage?.id,
        });
    };

    const handleEditMessage = async (messageId: string, newContent: string) => {
        if (!socket) return;

        await api.patch(`/messages/${messageId}`, { content: newContent });

        // update UI
        setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, content: newContent, editedAt: new Date() } : msg));
        setGroupedMessages(prev => {
            const updated = { ...prev };
            for (const date in updated) {
                updated[date] = updated[date].map(msg => msg.id === messageId ? { ...msg, content: newContent, editedAt: new Date() } : msg);
            }
            return updated;
        });
    };

    const handleDeleteMessage = async (messageId: string) => {
        if (!socket) return;

        await api.delete(`channels/${selectedChannel?.id}/messages/${messageId}`);

        // update UI
        setMessages(prev => {
            const updatedMessages = prev
                .filter(msg => msg.id !== messageId)
                .map(msg =>
                    msg.replyToMessageId === messageId
                        ? { ...msg, replyToMessageId: null, replyToDeleted: true }
                        : msg
                );

            setGroupedMessages(groupMessagesByDate(updatedMessages));

            return updatedMessages;
        });
    };

    return (
        <div className="flex w-full h-screen bg-chat-panel">
            <Layout className='flex-1 flex flex-col'>
                <ChatHeader 
                    setCollapsed={setCollapsed} 
                    collapsed={collapsed}
                    selectedChannel={selectedChannel || null}
                    selectedServer={selectedServer || null}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <ChatContent 
                groupedMessages={groupedMessages}
                channel={selectedChannel || null}
                containerRef={containerRef}
                sentinelRef={sentinelRef}
                hasMore={hasMore}
                handleDeleteMessage={handleDeleteMessage}
                />
                
                <ChatMessageInput handleSendMessage={handleSendMessage} handleEditMessage={handleEditMessage} />
            </Layout>
                
            <InfoPanel type={activeTab} />
        </div>
    );
}

export default ChatPanel;