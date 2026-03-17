import React from 'react';
import { Layout } from "antd";
import Skeletons from "@/components/layout/Skeletons/index";

function FullPageSkeleton() {
    return (
        <div className={ "flex w-full h-screen"}>
            <Skeletons.SidebarSkeleton />
            <Skeletons.ChannelPanelSkeleton />
            <Skeletons.ChatPanelSkeleton />
        </div>
    );
}

export default FullPageSkeleton;