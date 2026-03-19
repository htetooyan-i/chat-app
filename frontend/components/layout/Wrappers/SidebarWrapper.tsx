"use client";

import React from "react";
import Sidebar from "@/components/layout/SideBar";
import Skeletons from "@/components/layout/Skeletons";
import { useServer } from "@/hooks/useServer";
import { useAuth } from "@/hooks/useAuth";

const siderStyle: React.CSSProperties = {
    overflow: 'hidden',
    position: 'relative',
    insetInlineStart: 0,
    top: 0,
    height: '100%',
};

export default function SidebarWrapper() {
    const { loading } = useServer();
    const { user } = useAuth();

    if (loading || !user) return <Skeletons.SidebarSkeleton />;

    return <Sidebar siderStyle={siderStyle} />;
}