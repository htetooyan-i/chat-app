import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import ServerMemberInfo from "../server/ServerMemberInfo";
import ServerFileInfo from "@/components/server/ServerFileInfo";
import { useIsMobile } from "@/hooks/useIsMobile";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

const { Sider } = Layout;
type Tabs = "settings" | "files" | "users" | "none";

function PanelContent({ type }: { type: Tabs }) {
  if (type === "users") return <ServerMemberInfo />;
  if (type === "files") return <ServerFileInfo />;
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-muted-text">No info to show</p>
    </div>
  );
}

export default function InfoPanel({ type, changeTab }: { type: Tabs; changeTab: (tab: Tabs) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    setMobileOpen(type !== "none");
  }, [type]);

  return (
    <>
      {/* Desktop sidebar */}
      <Sider
        width={250}
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          borderBottomColor: "var(--muted-border)"
        }}
        collapsed={type === "none"}
        collapsedWidth={0}
        className="hidden lg:block"
      >
        <PanelContent type={type} />
      </Sider>

      {/* Mobile drawer - only rendered on mobile */}
      {isMobile && (
        <Drawer direction="right" open={mobileOpen} onClose={() => { changeTab("none"); setMobileOpen(false); }}>
          <DrawerContent style={{ "--border-color": "var(--muted-border)" } as React.CSSProperties}>
            <DrawerHeader>
              <VisuallyHidden.Root>
                <DrawerTitle>Info Panel</DrawerTitle>
              </VisuallyHidden.Root>
            </DrawerHeader>
            <div className="px-4 pb-4 overflow-y-auto">
              <PanelContent type={type} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}