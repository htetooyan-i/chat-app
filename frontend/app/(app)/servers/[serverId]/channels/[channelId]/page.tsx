"use client";
import React from 'react';
import { Skeleton } from 'antd';
import { useParams } from 'next/navigation';

import ChatPanel from "@/components/layout/ChatPanel";
import { useAuth } from "@/hooks/useAuth";
import { useChannel } from "@/hooks/useChannel";
import { useServer } from "@/hooks/useServer";
import PageNotFound from "@/components/ui/PageNotFound";

function Page() {

    const params = useParams();
    const serverId = Array.isArray(params.serverId) ? Number(params.serverId[0]) : Number(params.serverId);
    const channelId = Array.isArray(params.channelId) ? Number(params.channelId[0]) : Number(params.channelId);

    const { loading: authLoading } = useAuth();
    const { servers, loading: serverLoading } = useServer();
    const { channels, loading: channelLoading } = useChannel();

    const isDataReady = !authLoading && !serverLoading && !channelLoading;

    if (isDataReady) { // FIXME: Want to redirect back to channel index if server or channel doesn't exist'
        const serverExists = serverId && servers.some(s => s.id === serverId);
        const channelExists = channelId && channels.some(c => c.id === channelId);

        if (!serverExists || !channelExists) {
            return (
                <PageNotFound />
            );
        }
    }

    return (
        <div className="flex w-full">
            {(authLoading || serverLoading || channelLoading) ? (
                <div className="flex-1 flex flex-col h-screen bg-chat-panel">
                    {/* Header skeleton */}
                    <div className="h-12 border-b border-muted-border flex items-center px-4">
                        <Skeleton.Node active style={{ width: "160px", height: "16px", backgroundColor: "var(--muted-background)", borderRadius: "5px" }} />
                    </div>

                    {/* Messages skeleton */}
                    <div className="flex-1 flex flex-col justify-end px-4 py-4 gap-4">
                        {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <Skeleton.Avatar active shape="circle" size={36} style={{ backgroundColor: "var(--muted-background)" }} />
                            
                            <div className="flex flex-col gap-2 flex-1">
                                <Skeleton.Node active style={{ height: "12px", width: "70px", backgroundColor: "var(--muted-background)", borderRadius: "3px" }} />
                                <Skeleton.Node active style={{ height: "12px", width: `${i % 2 === 0 ? 75 : 50}%`, backgroundColor: "var(--muted-background)", borderRadius: "3px" }} />
                            </div>
                        </div>
                        ))}
                    </div>

                    {/* Input skeleton */}
                    <div className="px-5 mb-4">
                        <Skeleton.Input active block size="large" style={{ width: "100%", height: "50px", backgroundColor: "var(--muted-background)" }} />
                    </div>
                </div>
            ) : (
                <ChatPanel />
            )}
           

        </div>
    );
}

export default Page;
