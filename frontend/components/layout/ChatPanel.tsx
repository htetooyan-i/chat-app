"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Layout } from 'antd';


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
    
    const [ groupedMessages, setGroupedMessages ] = useState<Record<string, Message[]>>({});
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true)
    
    const { collapsed, setCollapsed } = useServerLayout();
    const [ activeTab, setActiveTab ] = useState<Tabs>("none");
    
    

    useEffect(() => {
        if (!socket ||!channelId) return;

        socket.emit("joinChannel", channelId);

        const handleReceiveMessage = (message: any) => {
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

        socket.on("receivedMessage", handleReceiveMessage);

        const fetchMessages = async () => {
            try {
                const response = await api.get(`/channels/${channelId}/messages?limit=50`);
                const grouped = groupMessagesByDate(response.data.reverse()); // reverse to show newest at the bottom
                setGroupedMessages(grouped);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        }
        fetchMessages();

        return () => {
            socket.off("receivedMessage", handleReceiveMessage);
            socket.emit("leaveChannel", `channel-${channelId}`);
        };

        
    }, [channelId, socket]);

    // const loadMore = async () => {
    //     const res = await fetch(`/channels/${channelId}/messages?skip=${skip}&take=50`);
    //     const data = await res.json();

    //     if (data.length < 50) setHasMore(false); // no more messages

    //     setMessages(prev => [...data.reverse(), ...prev]); // prepend older messages
    //     setSkip(prev => prev + 50);
    // };

    const handleSendMessage = (text: string) => {
        if (!text.trim() || !socket || !selectedChannel || !user) return;

        const tempId = `temp-${Date.now()}`;
        const newMessage: Message = {
            id: tempId,
            channelId: String(selectedChannel.id),
            authorId: user.id,
            content: text,
            createdAt: new Date(),  
            author: {
                id: user.id,
                username: user.username,
                avatarUrl: "", // Current I haven't implemented avatar upload, so this will be default avatar.
            }
        };

        // Update UI immediately with temp message
        setGroupedMessages(prev => addMessageToGroup(prev, newMessage));

        socket.emit("sendMessage", {
            channelId: selectedChannel.id,
            content: text,
            clientMsgId: tempId,
            authorId: user.id,
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

                />
                
                <ChatMessageInput handleSendMessage={handleSendMessage} />
            </Layout>
                
            <InfoPanel type={activeTab} />
        </div>
    );
}

export default ChatPanel;