"use client";
import React from 'react';
import { LogOut, Plus } from 'lucide-react';
import { Avatar, Badge, Layout } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useServerLayout } from '@/hooks/useServerLayout';
import { useServer } from '@/hooks/useServer';
import { useNotification } from '@/hooks/useNotification';
import DropdownComponent, { DropdownItem } from '@/components/ui/Dropdown';

const { Sider } = Layout;

type SideBarProps = {
    siderStyle: React.CSSProperties;
    showServerCreationModal: boolean;
    setShowServerCreationModal: (show: boolean) => void;
}

// const servers = [
//     {
//         id: 1,
//         name: "Server 1",
//         avatar: "/server-img.jpg",
//         title: "Chat"
//     },
//     {
//         id: 2,
//         name: "Server 2",
//         avatar: "/server-img.jpg",
//         title: "Gaming"
//     },
//     {
//         id: 3,
//         name: "Server 3",
//         avatar: "/server-img.jpg",
//         title: "Development"
//     },
//     // {
//     //     id: 4,
//     //     name: "Server 4",
//     //     avatar: "/profile-img.jpg",
//     // },
//     // {
//     //     id: 5,
//     //     name: "Server 5",
//     //     avatar: "/profile-img.jpg",
//     // },
//     // {
//     //     id: 6,
//     //     name: "Server 6",
//     //     avatar: "/profile-img.jpg",
//     // },
//     // {
//     //     id: 7,
//     //     name: "Server 7",
//     //     avatar: "/profile-img.jpg",
//     // },
//     // {
//     //     id: 8,
//     //     name: "Server 8",
//     //     avatar: "/profile-img.jpg",
//     // },
//     // {
//     //     id: 9,
//     //     name: "Server 9",
//     //     avatar: "/profile-img.jpg",
//     // },
//     // {
//     //     id: 10,
//     //     name: "Server 10",
//     //     avatar: "/profile-img.jpg",
//     // },
//     // {
//     //     id: 11,
//     //     name: "Server 11",
//     //     avatar: "/profile-img.jpg",
//     // },
//     // {
//     //     id: 12,
//     //     name: "Server 12",
//     //     avatar: "/profile-img.jpg",
//     // },

// ];

function SideBar({ siderStyle, showServerCreationModal, setShowServerCreationModal }: SideBarProps) {

    const dropDownItems: DropdownItem[] = [
        {
            label: "Leave Server",
            onClick: async () => await handleLeaveServer(),
            type: "danger",
        },
    ];

    const router = useRouter();
    const { collapsed, setCollapsed } = useServerLayout();
    const { logout } = useAuth();
    const { servers, selectedServer, setSelectedServer } = useServer();
    const { contextHolder, showSuccess, showError } = useNotification();

    const hndleSelectServer = (serverId: string) => {
        const server = servers.find(s => s.id === serverId) || null;
        setSelectedServer(server);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleLeaveServer = async () => {
        try {
            await api.delete(`/servers/${selectedServer?.id}/leave`);
            showSuccess("You have left the server.");
            setSelectedServer(null);
        } catch (error: any) {
            console.error("Failed to leave server:", error);
            showError(error.response?.data?.message || "Failed to leave server.");
        }
    };

    const handleShowUserSettings = () => {
        router.push("/settings?from=/");
    };

    return (
        <div>
            {contextHolder}
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
                                onClick={handleShowUserSettings}
                                src="/profile-img.jpg"
                                alt="avatar"
                                width={50}
                                height={50}
                                style={{ objectFit: "cover", borderRadius: "10px"}}
                                />
                            </Avatar>
                        </Badge>
                    </header>
                    {/* Server List */}
                    <div className="flex flex-col items-center flex-1 overflow-y-auto py-5 hide-scrollbar">
                        {/* Server List */}
                        {servers.map((server) => (
                                <div
                                    key={server.id}
                                    className="server-item flex items-center justify-center relative my-2 cursor-pointer"
                                    title={server.name}
                                    onClick={() => hndleSelectServer(server.id)}
                                >
                                    <DropdownComponent items={dropDownItems}>
                                        <Badge>
                                            <Avatar
                                                src='/server-img.jpg'
                                                size={50}
                                                shape="circle"
                                                style={{
                                                    border: 0,
                                                    backgroundColor: "var(--muted-background)",
                                                    ...((selectedServer?.id === server.id)
                                                    ? { outlineColor: "var(--accent)", outlineWidth: "2px", outlineStyle: "solid" }
                                                    : {}),
                                                }}
                                            />

                                        </Badge>
                                    </DropdownComponent>
                                </div>
                        ))}
                    </div>
                    <footer className="flex flex-col items-center py-5 bg-sidebar border-t border-muted-border">
                    {/* Add Server Button */}
                    <div onClick={() => setShowServerCreationModal(true)} className="server-item flex items-center justify-center relative my-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
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
        </div>
    );
}

export default SideBar;