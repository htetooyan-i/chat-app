//servers/[serverId]/channels/[channelId]/page.tsx
"use client";
import React from 'react';

import ChatPanel from "@/components/layout/ChatPanel";
import { useAuth } from '@/hooks/useAuth';
import { useServer } from '@/hooks/useServer';

function page({ params } : { params : Promise<{ serverId: string; channelId: string }>}) {
    const { user } = useAuth();
    const { servers, loading } = useServer();
    return (
        <div className="flex w-full">
            { !user || (servers.length === 0 && !loading) ? 
            <div className="flex-1 flex flex-col items-center justify-center bg-chat-panel h-screen">
                <h2 className="text-2xl text-gray-500">Welcome, {user?.username || 'Guest'}!</h2>
                <h3 className="text-lg text-gray-500">Create or join a server to start chatting</h3>
            </div> 
            : 
            <ChatPanel />
            }
        </div>
    );
}

export default page;