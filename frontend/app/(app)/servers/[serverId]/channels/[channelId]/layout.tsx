"use client";
import { useState } from "react";
import { Layout } from "antd";

import SideBar from "@/components/layout/SideBar";
import ChannelPanel from "@/components/layout/ChannelPanel";
import { ServerLayoutProvider } from "@/context/ServerLayoutContext";
import NewServerModal from "@/components/server/NewServerModal";

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
  
  const [showServerCreationModal, setShowServerCreationModal] = useState(false);
  
  return (
    <ServerLayoutProvider>
      <NewServerModal showServerCreationModal={showServerCreationModal} setShowServerCreationModal={setShowServerCreationModal} />
      <Layout>
        <SideBar siderStyle={siderStyle} showServerCreationModal={showServerCreationModal} setShowServerCreationModal={setShowServerCreationModal} />
        <ChannelPanel siderStyle={siderStyle} />
        <div className="flex-1">
          {children}
        </div>
      </Layout>
    </ServerLayoutProvider>
  );  
}
