import React, { useEffect } from "react";
import { Layout } from 'antd';
import { UserRoundPlus, IdCard } from "lucide-react";
import ServerMemberInfo from "../server/ServerMemberInfo";
import ServerFileInfo from "@/components/server/ServerFileInfo";

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
      {
        type === "users" as Tabs ? 
        (
          <ServerMemberInfo />
        ) : type === "files" as Tabs ? (
            <ServerFileInfo/>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-text">No { type === "settings" ? "Settings" : type === "files" ? "Files" : "Info" } to show</p>
          </div>
        )
      }
    </Sider>
  );
}
