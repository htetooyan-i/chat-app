"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Skeleton } from 'antd';

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
      <div className="w-[300px] h-screen flex flex-col bg-background shrink-0">
        <div className="h-[64px] flex items-end pb-1 px-5">
          <Skeleton.Button active block style={{ height: "40px", width: "100%", backgroundColor: "var(--muted-background)", borderRadius: "5px" }} />
        </div>
        <div className="flex flex-col gap-3 p-5">
          {[...Array(5)].map((_, i) => (
            // <div key={i} className="h-[45px] w-full bg-gray-700 rounded-r-sm border-l-4 border-gray-600" />
            <Skeleton.Node key={i} active style={{ height: "45px", width: "100%", backgroundColor: "var(--muted-background)", borderLeft: "4px solid var(--muted-border)", borderRadius: '0', borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }} />
          ))}
        </div>
      </div>

      {/* Chat panel skeleton */}
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
    </div>
  );
}