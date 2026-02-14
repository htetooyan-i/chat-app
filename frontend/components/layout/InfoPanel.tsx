"use client";
import React from "react";
import { Layout } from "antd";

const { Sider } = Layout;
type Tabs = "settings" | "files" | "users" | "none";

export default function InfoPanel({ type }: { type: Tabs }) {
  return (
    <Sider 
      width={300}
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        borderBottomColor: "var(--muted-border)"
      }}
      collapsed={ type === "none" }
      collapsedWidth={0}
    >
      {type === "settings" && <div>Settings Content</div>}
      {type === "files" && <div>Files Content</div>}
      {type === "users" && <div>Users Content</div>}
    </Sider>
  );
}
