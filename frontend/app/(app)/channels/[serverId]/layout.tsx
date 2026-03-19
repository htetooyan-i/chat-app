import React from "react";
import { Layout } from "antd";

import ChannelPanelWrapper from "@/components/layout/Wrappers/ChannelPanelWrapper";

export default function ChannelLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout className="flex-1 h-full min-w-0 overflow-hidden flex flex-row" style={{ flexDirection: "row" }}>
            <ChannelPanelWrapper />
            {children}
        </Layout>
    );
}
