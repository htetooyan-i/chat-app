"use client";
import { Layout } from "antd";

import SideBar from "@/components/layout/SideBar";
import ChannelPanel from "@/components/layout/ChannelPanel";
import { ServerLayoutProvider } from "@/context/ServerLayoutContext";

const siderStyle: React.CSSProperties = {
  overflow: 'hidden',
  position: 'relative',
  insetInlineStart: 0,
  top: 0,
  height: '100vh',
};

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <ServerLayoutProvider>
      <Layout>
        <SideBar siderStyle={siderStyle} />
        <ChannelPanel siderStyle={siderStyle} />
        <div className="flex-1">
          {children}
        </div>
      </Layout>
    </ServerLayoutProvider>
  );  
}
