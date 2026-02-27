//servers/[serverId]/channels/page.tsx
"use client";
import { useParams } from "next/navigation";

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
    <div className="flex-1 flex flex-col h-screen bg-chat-panel animate-pulse">
      {/* Header skeleton */}
      <div className="h-12 border-b border-muted-border flex items-center px-4">
        <div className="h-4 w-32 bg-gray-700 rounded" />
      </div>

      {/* Messages skeleton */}
      <div className="flex-1 flex flex-col justify-end px-4 py-4 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-700 shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3 w-24 bg-gray-700 rounded" />
              <div className={`h-3 bg-gray-700 rounded ${i % 2 === 0 ? "w-3/4" : "w-1/2"}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Input skeleton */}
      <div className="h-14 mx-4 mb-4 bg-gray-700 rounded-lg" />
    </div>
  );
}