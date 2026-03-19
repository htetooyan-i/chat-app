import React from "react";
import { Layout } from "antd";

import { ServerLayoutProvider } from "@/context/ServerLayoutContext";
import { ServerMemberProvider } from "@/context/ServerMemberContext";
import { ServerAdminProvider } from "@/context/ServerAdminContext";
import SidebarWrapper from "@/components/layout/Wrappers/SidebarWrapper";

export default function ChannelsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ServerLayoutProvider>
            <ServerMemberProvider>
                <ServerAdminProvider>
                    <Layout className="h-screen min-w-0 overflow-hidden flex flex-row" style={{ flexDirection: "row" }}>
                        <SidebarWrapper />
                        {children}
                    </Layout>
                </ServerAdminProvider>
            </ServerMemberProvider>
        </ServerLayoutProvider>
    );
}
