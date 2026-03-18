import React from "react";
import { Layout } from "antd";

import SidebarWrapper from "@/components/layout/Wrappers/SidebarWrapper";

export default function ChannelLayout({ children }: { children: React.ReactNode }) {

    return (
        <Layout>
            <SidebarWrapper />
            {children}
        </Layout>
    );
}
