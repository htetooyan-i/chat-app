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
        <div>
            <Sider width={100} style={{ ...siderStyle, backgroundColor: "var(--sidebar)", scrollbarWidth: "none" }}>
                <div className="flex flex-col items-center h-full py-5">
                    <div className="flex flex-col items-center h-full">
                        {/* User Avatar */}
                        <div className='mb-5'>
                            <a href="/maintenance?from=/">
                                <Badge dot color="green" className="bottom-badge">
                                    <Avatar shape="square" size={60}>
                                        <Image
                                        src="/profile-img.jpg"
                                        alt="avatar"
                                        width={60}
                                        height={60}
                                        style={{ objectFit: "cover", borderRadius: "15px"}}
                                        />
                                    </Avatar>
                                </Badge>
                            </a>
                        </div>

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

                    {/* Add Server Button */}
                    <div onClick={handleCreateNewServer} className="server-item flex items-center justify-center relative my-2 cursor-pointer">
                        <Badge>
                            <Avatar
                            size={50}
                            shape="circle"
                            style={{
                                backgroundColor: "var(--accent)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center", 
                            }}
                            >
                                <Plus width={32} height={32}/>
                            </Avatar>
                        </Badge>
                    </div>

                    {/* Logout Button */}
                    <div onClick={handleLogout} className="server-item flex items-center justify-center relative my-2 cursor-pointer">
                        <Badge>
                            <Avatar
                            size={50}
                            shape="square"
                            style={{
                                backgroundColor: "var(--error)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center", 
                            }}
                            >
                                <LogOut width={32} height={32}/>
                            </Avatar>
                        </Badge>
                    </div>

                </div>
            </Sider>
        </div>
    );
}

export default SideBar;