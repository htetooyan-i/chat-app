"use client";
import { Layout } from "antd";

import { useAuth } from "@/hooks/useAuth";
import { useServer } from "@/hooks/useServer";
import { useChannel } from "@/hooks/useChannel";
import { useMessage } from "@/hooks/useMessage";
import ServerSidebar from "@/components/layout/SideBar";
import ChannelSidebar from "@/components/layout/ChannelPanel";
import MessagesPanel from "@/components/layout/ChatPanel";
import Skeletons from "@/components/layout/Skeletons";

const siderStyle: React.CSSProperties = {
    overflow: 'hidden',
    position: 'relative',
    insetInlineStart: 0,
    top: 0,
    height: '100vh',
};

export default function ServerPage() {
    const { loading: authLoading } = useAuth();
    const { loading: serversLoading } = useServer();
    const { loading: channelsLoading } = useChannel();
    const { loading: messagesLoading } = useMessage();

    if (authLoading) return <Skeletons.AuthSkeleton />;
    if (serversLoading || channelsLoading) return <Skeletons.FullPageSkeleton />;

    return (
        <Layout style={{ height: "100vh", overflow: "hidden", display: "flex" }}>
            <ServerSidebar siderStyle={siderStyle} />
            <ChannelSidebar siderStyle={siderStyle} />
            <Layout>
                {messagesLoading ? (
                    <Skeletons.ChatPanelSkeleton />
                ) : (
                    <MessagesPanel />
                )}
            </Layout>
        </Layout>
    );
}