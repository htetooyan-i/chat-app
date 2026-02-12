"use client";
import React from "react";
import { Avatar, Badge, Layout, Menu, theme } from 'antd';
import Image from 'next/image';
import { useAuth } from "@/hooks/useAuth";
import SideBar from "@/components/layout/SideBar";
import ChannelPanel from "@/components/layout/ChannelPanel";
import ChatPanel from "@/components/layout/ChatPanel";

export const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

// import Dashboard from "@/components/ui/Dashboard";

export default function Home() {
  
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="background-red-500">
      {/* <Dashboard /> */}
      <Layout hasSider>

        <SideBar siderStyle={siderStyle} />
        <ChannelPanel siderStyle={siderStyle} />

        <ChatPanel />

      </Layout>
    </div>

  );
}
