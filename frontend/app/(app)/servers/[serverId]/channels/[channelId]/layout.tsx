"use client";
import { Layout } from "antd";

import SideBar from "@/components/layout/SideBar";
import ChannelPanel from "@/components/layout/ChannelPanel";


const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};


export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout hasSider>
      <SideBar siderStyle={siderStyle} />
      <ChannelPanel siderStyle={siderStyle} />
      {children}
    </Layout>
  );
}
