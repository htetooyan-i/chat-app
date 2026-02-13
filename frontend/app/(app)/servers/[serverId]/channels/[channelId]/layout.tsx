"use client";
import { Layout } from "antd";
import type { Metadata } from "next";

import SideBar from "@/components/layout/SideBar";
import ChannelPanel from "@/components/layout/ChannelPanel";

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  height: '100vh',
  // scrollbarWidth: 'thin',
  // scrollbarGutter: 'auto',
};

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout hasSider style={{ height: "100vh", overflow: "hidden" }}>
      <div className="flex">
        <SideBar siderStyle={siderStyle} />
        <ChannelPanel siderStyle={siderStyle} />
      </div>
      {children}
    </Layout>
  );
}
