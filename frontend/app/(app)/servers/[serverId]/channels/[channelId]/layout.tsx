"use client";
import { Layout } from "antd";
import type { Metadata } from "next";

import SideBar from "@/components/layout/SideBar";
import ChannelPanel from "@/components/layout/ChannelPanel";
import { ServerLayoutContext } from "@/context/ServerLayoutContext";
import { useState } from "react";
import { User } from "lucide-react";
import UserSettingsModal from "@/components/user/UserSettingsModal";

const { Sider } = Layout;

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

  const [collapsed, setCollapsed] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  
  return (
    <ServerLayoutContext.Provider value={{ collapsed, setCollapsed, showUserSettings, setShowUserSettings }}>
      <Layout>
        <UserSettingsModal showUserSettings={showUserSettings} setShowUserSettings={setShowUserSettings} />
        <SideBar siderStyle={siderStyle} />
        <ChannelPanel siderStyle={siderStyle} />
        <div className="flex-1">
          {children}
        </div>
      </Layout>
    </ServerLayoutContext.Provider>
  );  
}
