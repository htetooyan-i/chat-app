"use client";
import { Skeleton } from 'antd';
import { useParams, useRouter } from 'next/navigation';

import ChatPanel from "@/components/layout/ChatPanel";
import { useAuth } from "@/hooks/useAuth";
import { useChannel } from "@/hooks/useChannel";
import { useServer } from "@/hooks/useServer";

function page() {

    const params = useParams();
    const router = useRouter();
    const serverId = Array.isArray(params.serverId) ? params.serverId[0] : params.serverId;
    const channelId = Array.isArray(params.channelId) ? params.channelId[0] : params.channelId;

    const { loading: authLoading } = useAuth();
    const { servers, loading: serverLoading } = useServer();
    const { channels, loading: channelLoading } = useChannel();
    
    // if ( !(serverId && servers.find(s => s.id === serverId)) || !(channelId && channels.find(c => c.id === Number(channelId))) ) {
    //     router.back();
    // }
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

export default page;
