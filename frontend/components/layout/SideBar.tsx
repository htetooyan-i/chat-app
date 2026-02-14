"use client";
import React from 'react';
import { LogOut, Plus } from 'lucide-react';
import { Avatar, Badge, Layout } from 'antd';
import Image from 'next/image';

import { useAuth } from '@/hooks/useAuth';
import { useServerLayout } from '@/hooks/useServerLayout';

const { Sider } = Layout;

type SideBarProps = {
    siderStyle: React.CSSProperties;
}

const servers = [
    {
        id: 1,
        name: "Server 1",
        avatar: "/server-img.jpg",
        title: "Chat"
    },
    {
        id: 2,
        name: "Server 2",
        avatar: "/server-img.jpg",
        title: "Gaming"
    },
    {
        id: 3,
        name: "Server 3",
        avatar: "/server-img.jpg",
        title: "Development"
    },
    // {
    //     id: 4,
    //     name: "Server 4",
    //     avatar: "/profile-img.jpg",
    // },
    // {
    //     id: 5,
    //     name: "Server 5",
    //     avatar: "/profile-img.jpg",
    // },
    // {
    //     id: 6,
    //     name: "Server 6",
    //     avatar: "/profile-img.jpg",
    // },
    // {
    //     id: 7,
    //     name: "Server 7",
    //     avatar: "/profile-img.jpg",
    // },
    // {
    //     id: 8,
    //     name: "Server 8",
    //     avatar: "/profile-img.jpg",
    // },
    // {
    //     id: 9,
    //     name: "Server 9",
    //     avatar: "/profile-img.jpg",
    // },
    // {
    //     id: 10,
    //     name: "Server 10",
    //     avatar: "/profile-img.jpg",
    // },
    // {
    //     id: 11,
    //     name: "Server 11",
    //     avatar: "/profile-img.jpg",
    // },
    // {
    //     id: 12,
    //     name: "Server 12",
    //     avatar: "/profile-img.jpg",
    // },

];

function SideBar({ siderStyle }: SideBarProps) {

    const { collapsed, setCollapsed, showUserSettings, setShowUserSettings } = useServerLayout();
    const { logout } = useAuth();

    const handleCreateNewServer = () => {
        // Navigate to the maintenance page
        window.location.href = "/maintenance?from=/";
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Sider 
        width={80} 
        collapsible
        breakpoint='lg'
        collapsed={collapsed}
        collapsedWidth={0}
        onBreakpoint={(broken) => {
            setCollapsed(broken);
        }}
        style={{ ...siderStyle, backgroundColor: "var(--sidebar)", scrollbarWidth: "none", display: "flex", flexDirection: "column" }}
        >
            <div className="flex flex-col h-full">
                {/* User Avatar */}
                <header className='h-[64px] sticky top-0 z-10 flex justify-center items-center pt-3 pb-3 bg-sidebar border-b border-muted-border'>
                    <Badge dot color="green" className="bottom-badge cursor-pointer">
                        <Avatar shape="square" size={50}>
                            <Image
                            onClick={() => setShowUserSettings(true)}
                            src="/profile-img.jpg"
                            alt="avatar"
                            width={50}
                            height={50}
                            style={{ objectFit: "cover", borderRadius: "10px"}}
                            />
                        </Avatar>
                    </Badge>
                </header>
                <div className="flex flex-col items-center flex-1 overflow-y-auto py-5 hide-scrollbar">
                    {/* Server List */}
                    {servers.map((server) => (
                            <div
                                key={server.id}
                                className="server-item flex items-center justify-center relative my-2 cursor-pointer"
                                title={server.title}
                            >
                                <Badge>
                                    <Avatar
                                        src={server.avatar}
                                        size={50}
                                        shape="circle"
                                        style={{
                                            border: 0,
                                            backgroundColor: "var(--muted-background)",
                                            ...(server.id === 1
                                            ? { outlineColor: "var(--accent)", outlineWidth: "2px", outlineStyle: "solid" }
                                            : {}),
                                        }}
                                    />

                                </Badge>
                            </div>
                    ))}
                </div>
                <footer className="flex flex-col items-center py-5 bg-sidebar border-t border-muted-border">
                {/* Add Server Button */}
                <div onClick={handleCreateNewServer} className="server-item flex items-center justify-center relative my-2 cursor-pointer">
                    <Badge>
                        <Avatar
                        size={40}
                        shape="circle"
                        style={{
                            backgroundColor: "var(--accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", 
                        }}
                        >
                            <Plus width={24} height={24}/>
                        </Avatar>
                    </Badge>
                </div>

                {/* Logout Button */}
                <div onClick={handleLogout} className="server-item flex items-center justify-center relative my-2 cursor-pointer">
                    <Badge>
                        <Avatar
                        size={40}
                        shape="square"
                        style={{
                            backgroundColor: "var(--error)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center", 
                        }}
                        >
                            <LogOut width={24} height={24}/>
                        </Avatar>
                    </Badge>
                </div>
            </footer>
            </div>
        </Sider>
    );
}

export default SideBar;