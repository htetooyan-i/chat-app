import React from "react";
import { Layout } from "antd";

import { ServerMemberProvider } from "@/context/ServerMemberContext";
import { ServerAdminProvider } from "@/context/ServerAdminContext";
import SidePanelWrapper from "@/components/layout/Wrappers/SidePanelWrapper";
import { ServerLayoutProvider } from "@/context/ServerLayoutContext";

export default function ChannelsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ServerLayoutProvider>
            <ServerMemberProvider>
                <ServerAdminProvider>
                    <Layout className="h-screen min-w-0 overflow-hidden flex flex-row" style={{ flexDirection: "row" }}>
                        <SidePanelWrapper />
                        {children}
                    </Layout>
                </ServerAdminProvider>
            </ServerMemberProvider>
        </ServerLayoutProvider>
    );
}
