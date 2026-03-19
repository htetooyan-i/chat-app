"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useServer } from "@/hooks/useServer";
import { useChannel } from "@/hooks/useChannel";
import { useMessage } from "@/hooks/useMessage";
import MessagesPanel from "@/components/layout/ChatPanel";
import Skeletons from "@/components/layout/Skeletons";

export default function MessagePage() {

    const { servers } = useServer();
    const { channels, loading: channelsLoading } = useChannel();
    const { loading: messagesLoading } = useMessage();

    const { serverId, channelId } = useParams();
    const router = useRouter();

    const parsedServerId = Number(Array.isArray(serverId) ? serverId[0] : serverId);
    const parsedChannelId = Number(Array.isArray(channelId) ? channelId[0] : channelId);

    useEffect(() => {
        if (channelsLoading) return;

        if (!parsedServerId) {
            router.replace(`/channels`);
            return;
        }

        const serverExists = servers.some((s) => s.id === parsedServerId);

        if (!serverExists) {
            if (servers.length > 0) {
                router.replace(`/channels/${servers[0].id}`);
            } else {
                router.replace(`/channels`);
            }
            return;
        }

        if (!parsedChannelId) {
            router.replace(`/channels/${parsedServerId}`);
            return;
        }

        const validChannel = channels.find(
            (c) => c.id === parsedChannelId && c.serverId === parsedServerId
        );

        if (!validChannel) {
            if (channels.length > 0) {
                router.replace(`/channels/${parsedServerId}/${channels[0].id}`);
            } else {
                router.replace(`/channels/${parsedServerId}`);
            }
        }
    }, [channelsLoading, channels, parsedChannelId, parsedServerId, router, servers]);

    return messagesLoading ? <Skeletons.ChatPanelSkeleton /> : <MessagesPanel />;
}