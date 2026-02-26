//servers/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useServer } from "@/hooks/useServer";
import { useChannel } from "@/hooks/useChannel";

export default function ServersIndexPage() {
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
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-gray-500 text-xl">
          You have no servers. Create or join one!
        </h2>
      </div>
    );
  }

  return ( // This skeleton will show while loading servers/channels
    <div className="w-[300px] h-screen flex flex-col bg-background animate-pulse shrink-0">
      {/* Header - matches your "Create New Channel" button area */}
      <div className="h-[64px] flex items-end pb-1 px-5">
        <div className="h-9 w-full bg-gray-700 rounded" />
      </div>

      {/* Channel list items */}
      <div className="flex flex-col gap-3 p-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-[45px] w-full bg-gray-700 rounded-r-sm border-l-4 border-gray-600" />
        ))}
      </div>
    </div>
  );
}