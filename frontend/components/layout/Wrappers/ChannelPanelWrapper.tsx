"use client";

import React from "react";
import ChannelPanel from "@/components/layout/ChannelPanel";
import Skeletons from "@/components/layout/Skeletons";
import { useServer } from "@/hooks/useServer";

const siderStyle: React.CSSProperties = {
    overflow: 'hidden',
    position: 'relative',
    insetInlineStart: 0,
    top: 0,
    height: '100vh',
};

export default function ChannelPanelWrapper() {
    const { loading } = useServer();

    if (loading) return <Skeletons.ChannelPanelSkeleton />;

    return <ChannelPanel siderStyle={siderStyle} />;
}