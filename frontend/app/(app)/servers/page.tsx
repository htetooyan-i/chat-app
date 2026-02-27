"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useServer } from "@/hooks/useServer";
import { useChannel } from "@/hooks/useChannel";
import { useAuth } from "@/hooks/useAuth";

export default function ServersIndexPage() {
  const { user } = useAuth();
  const { servers, loading: serverLoading } = useServer();
  const { channels, loading: channelLoading } = useChannel();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/servers") return; // Prevent loop

    if (!serverLoading && servers.length > 0) {
      router.replace(`/servers/${servers[0].id}/channels/`);
    }
  }, [servers, serverLoading, channelLoading, channels, pathname]);

  if (!serverLoading && servers.length === 0) {
    // Show empty state directly instead of redirecting
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-chat-panel">
        <h2 className="text-gray-500 text-4xl">Welcome {user?.username || "User"}!</h2>
        <h2 className="text-gray-500 text-xl">Create or join a server to get started!</h2>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      {/* Channel panel skeleton */}
      <div className="w-[300px] h-screen flex flex-col bg-background animate-pulse shrink-0">
        <div className="h-[64px] flex items-end pb-1 px-5">
          <div className="h-9 w-full bg-gray-700 rounded" />
        </div>
        <div className="flex flex-col gap-3 p-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-[45px] w-full bg-gray-700 rounded-r-sm border-l-4 border-gray-600" />
          ))}
        </div>
      </div>

      {/* Chat panel skeleton */}
      <div className="flex-1 flex flex-col h-screen bg-chat-panel animate-pulse">
        <div className="h-12 border-b border-muted-border flex items-center px-4">
          <div className="h-4 w-32 bg-gray-700 rounded" />
        </div>
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
        <div className="h-14 mx-4 mb-4 bg-gray-700 rounded-lg" />
      </div>
    </div>
  );
}