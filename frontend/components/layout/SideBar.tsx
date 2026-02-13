"use client";
import React from 'react';
import { LogOut, Plus } from 'lucide-react';
import { Avatar, Badge, Layout } from 'antd';
import Image from 'next/image';

import { useAuth } from '@/hooks/useAuth';

const { Sider } = Layout;

type SideBarProps = {
    siderStyle: React.CSSProperties;
}

const servers = [
    {
        id: 1,
        name: "Server 1",
        avatar: "/profile-img.jpg",
    },
    {
        id: 2,
        name: "Server 2",
        avatar: "/profile-img.jpg",
    },
    {
        id: 3,
        name: "Server 3",
        avatar: "/profile-img.jpg",
    },
];

function SideBar({ siderStyle }: SideBarProps) {

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
        <div className="relative bg-sidebar">
            {/* User Avatar */}
            <header className='flex justify-center items-center pt-3 pb-3 bg-sidebar border-b border-muted-border'>
                <a href="/maintenance?from=/">
                    <Badge dot color="green" className="bottom-badge">
                        <Avatar shape="square" size={50}>
                            <Image
                            src="/profile-img.jpg"
                            alt="avatar"
                            width={50}
                            height={50}
                            style={{ objectFit: "cover", borderRadius: "10px"}}
                            />
                        </Avatar>
                    </Badge>
                </a>
            </header>
            <Sider width={80} style={{ ...siderStyle, backgroundColor: "var(--sidebar)", scrollbarWidth: "none" }}>
                <div className="flex flex-col items-center h-full py-5">
                    <div className="flex flex-col items-center h-full">
                        

                        {/* Server List */}
                        {servers.map((server) => (
                            <div
                                key={server.id}
                                className="server-item flex items-center justify-center relative my-2 cursor-pointer"
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

                    

                </div>
            </Sider>
            <footer className="absolute bottom-0 left-0 w-full flex flex-col items-center py-5 bg-sidebar border-t border-muted-border">
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
    );
}

export default SideBar;