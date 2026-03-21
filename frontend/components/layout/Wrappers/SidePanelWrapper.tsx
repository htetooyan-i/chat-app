"use client";

import React from "react";

import SideBar from "../SideBar";
import SidePanel from "../SidePanel";
import Skeletons from "@/components/layout/Skeletons";
import { useServer } from "@/hooks/useServer";
import { useAuth } from "@/hooks/useAuth";
import { useChannel } from "@/hooks/useChannel";

const siderStyle: React.CSSProperties = {
    overflow: 'hidden',
    position: 'relative',
    insetInlineStart: 0,
    top: 0,
    height: '100%',
};

export default function SidePanelWrapper() {
    const { loading: serverLoading } = useServer();
    const { loading: channelLoading } = useChannel();
    const { user, loading: authLoading } = useAuth();

    if (serverLoading || authLoading ) return (
        <div className="hidden md:flex">
            <Skeletons.SidebarSkeleton />
            <Skeletons.ChannelPanelSkeleton />
        </div>
    );

    if (channelLoading) return (
        <div className="hidden md:flex">
            <SideBar siderStyle={siderStyle} />
            <Skeletons.ChannelPanelSkeleton />
        </div>
    );

    return (
        <SidePanel />
    );
}