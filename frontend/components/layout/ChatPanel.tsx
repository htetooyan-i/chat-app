"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Layout, message } from 'antd';

import { api } from '@/lib/api';
import ChatContent from '../chat/ChatContent';
import ChatHeader from '../chat/ChatHeader';
import ChatMessageInput from '../chat/ChatMessageInput';
import InfoPanel from '@/components/layout/InfoPanel';
import { useServer } from '@/hooks/useServer';
import { useChannel } from '@/hooks/useChannel';
import { useMessage } from '@/hooks/useMessage';

import { Message } from '@/types/Message';

type Tabs = "settings" | "files" | "users" | "none";

function ChatPanel() {

    const { serverId, channelId } = useParams();
    const { servers } = useServer();
    const { channels } = useChannel();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));
    const selectedChannel = channels.find(c => String(c.id) === String(channelId));
    
    const { loadMore  } = useMessage();
    const containerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const [ activeTab, setActiveTab ] = useState<Tabs>("none");


    // Load older messages (cursor-based, more reliable than skip/take)
    const handleLoadMore = async () => {
        const container = containerRef.current;
        const prevScrollHeight = container?.scrollHeight ?? 0;

        await loadMore();

        requestAnimationFrame(() => {
            if (container) {
            container.scrollTop =
                container.scrollHeight - prevScrollHeight;
            }
        });
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

    return (
        <div className="flex flex-1 min-w-0 h-full bg-chat-panel overflow-hidden">
            <Layout className='flex-1 flex flex-col h-full min-h-0 min-w-0'>
                <ChatHeader 
                    selectedChannel={selectedChannel || null}
                    selectedServer={selectedServer || null}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <ChatContent 
                channel={selectedChannel || null}
                containerRef={containerRef}
                sentinelRef={sentinelRef}
                />
                
                <ChatMessageInput />
            </Layout>
                
            <InfoPanel type={activeTab} changeTab={setActiveTab} />
        </div>
    );
}

export default ChatPanel;