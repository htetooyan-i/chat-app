"use client";
import React, { useEffect } from "react";
import { Avatar, Badge, Dropdown, Layout } from 'antd';
import { UserRoundPlus, IdCard } from "lucide-react";

import { useServer } from "@/hooks/useServer";
import api from "@/lib/api";
import DropdownComponent from "@/components/ui/Dropdown";
import { DropdownItem } from "@/components/ui/Dropdown";

const { Sider } = Layout;

type Tabs = "settings" | "files" | "users" | "none";

export default function InfoPanel({ type }: { type: Tabs }) {

  const getDropdownItems = (memberId: string): DropdownItem[] => [
    {
      label: "Open in Mod View",
      onClick: () => console.log("View profile"),
      type: "normal",
    },
    {
      label: "Ban Member",
      onClick: () => console.log("Ban member"),
      type: "danger",
    },
    {
      label: "Kick Member",
      onClick: () => handleKickMember(memberId),
      type: "danger",
    },
    {
      label: "",
      onClick: () => {},
      type: "divider",
    },
    {
      label: "Copy Member ID",
      onClick: () => navigator.clipboard.writeText(memberId),
      type: "normal",
      icon: <IdCard width={16} height={16} />,
    },
  ];

  const { selectedServer } = useServer();
  const [serverMembers, setServerMembers] = React.useState<any[]>([]);

  useEffect(() => {
    if (type !== "users" || !selectedServer ) return;
    const fetchMembers = async () => {
      try {
        const res = await api.get(
          `/servers/${selectedServer.id}/members`
        );

        setServerMembers(res.data.data);
        console.log("Fetched server members:", res.data.data);
      } catch (error) {
        console.error("Error fetching server members:", error);
      }
    };

    fetchMembers();
  }, [type, selectedServer]);

  // Kick user from server and close the context menu
  const handleKickMember = async (memberId: string) => {
    if (!selectedServer) return;
    try {
      await api.delete(`/servers/${selectedServer.id}/kick`, { data: { memberId } });
      setServerMembers(prev => prev.filter(member => member.userId !== memberId));
    } catch (error) {
      console.error("Error kicking member:", error);
    }
  };

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
      <header className="p-4 flex justify-between items-center">
        <h2 className="text-[21px] font-bold py-2">
          { type === "settings" && "Server Settings" }
          { type === "files" && "Shared Files" }
          { type === "users" && "Members" }
        </h2> 
        <div className="p-2 rounded-full cursor-pointer bg-accent " title="Invite People">
          <UserRoundPlus width={18} height={18} />
        </div>
      </header>

      { 
        serverMembers.map(member => (
          
            <div key={member.id} className="px-2">
              <DropdownComponent items={getDropdownItems(member.userId)}>
                <div className={`w-full flex justify-between items-center gap-2 rounded cursor-pointer px-2 py-1 serverMember`} onMouseEnter={() => console.log("hovered")}>
                  <div className="flex items-center gap-2">
                    <Badge dot color="green" className="bottom-badge cursor-pointer" style={{}}>
                      <Avatar
                        shape="circle"
                        size={32}
                        src="/profile-img.jpg"
                      />
                    </Badge>

                    <span className="truncate font-medium" style={{fontSize: "12px", maxWidth: "160px"}}>{member.user.username}</span>
                  </div>
                  <span className="font-semibold" style={{fontSize: "12px"}}>{member.role}</span>
                </div>
              </DropdownComponent> 
            </div>
          
          
        ))
      }
    </Sider>
  );
}
