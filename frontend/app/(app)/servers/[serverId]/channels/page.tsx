//servers/[serverId]/channels/page.tsx
"use client";
import { useParams } from "next/navigation";
import { Skeleton } from 'antd';

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useChannel } from "@/hooks/useChannel";

export default function ChannelIndexPage() {
  const { channels, loading: channelLoading } = useChannel();
  const router = useRouter();
  const pathname = usePathname();
  const { serverId } = useParams();

  useEffect(() => {
    if (pathname !== `/servers/${serverId}/channels`) return; // Prevent loop

    if (!channelLoading && channels.length > 0) {
      router.replace(`/servers/${serverId}/channels/${channels[0].id}`);
    }
  }, [channels, channelLoading, pathname, serverId]);

  if (!channelLoading && channels.length === 0) {
    // Show empty state directly instead of redirecting
    return (
      <div className="flex items-center justify-center h-screen w-full bg-chat-panel">
        <h2 className="text-gray-500 text-xl">
          You have no channels in this server. Create one!
        </h2>
      </div>
    );
  }

  return (
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
  );
}