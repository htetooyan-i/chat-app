//servers/[serverId]/channels/page.tsx
"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import Skeletons from "@/components/layout/Skeletons";
import EmptyPage from "@/components/layout/EmptyPage";
import { useAuth } from "@/hooks/useAuth";
import { useChannel } from "@/hooks/useChannel";

export default function ChannelIndexPage() {

    const { user } = useAuth();
    const { channels, loading: channelLoading } = useChannel();
    const router = useRouter();
    const { serverId } = useParams();

    const navigateBackOrChannels = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
            return;
        }

        router.replace("/channels");
    };

    useEffect(() => {
        const parsedServerId = Number(Array.isArray(serverId) ? serverId[0] : serverId);

        if (!parsedServerId) {
            navigateBackOrChannels();
        }
    }, [serverId, router]);

    useEffect(() => {
        if (channelLoading) return;
        if (channels.length === 0) return;

        router.replace(`/channels/${serverId}/${channels[0].id}`);
    }, [channels, channelLoading, serverId, router]);


    if (!channelLoading && channels.length === 0 && user) {
        // Show empty state directly instead of redirecting
        return (
            <EmptyPage username={user.username} page="channel"/>
        );
    }

    return (
        <Skeletons.ChatPanelSkeleton />
    );
}