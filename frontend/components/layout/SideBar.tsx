"use client";
import React, { useState } from 'react';
import { LogOut, Plus, Settings } from 'lucide-react';
import { Avatar, Badge, Layout } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

import api from '@/lib/api';
import ContextDropdownComponent, { ContextDropdownItem } from '@/components/ui/ContextDropdown';
import ServerSettingsModal from '../server/settings/ServerSettingsModal';
import NewServerModal from '../server/NewServerModal';
import { useAuth } from '@/hooks/useAuth';
import { useServerLayout } from '@/hooks/useServerLayout';
import { useServer } from '@/hooks/useServer';
import { useNotification } from '@/hooks/useNotification';
import { useChannel } from '@/hooks/useChannel';

const { Sider } = Layout;

type SideBarProps = {
    siderStyle: React.CSSProperties;
}

function SideBar({ siderStyle }: SideBarProps) {

    const dropDownItems: ContextDropdownItem[] = [
        {
            label: "Settings",
            onClick: () => setShowServerSettingsModal(true),
            type: "normal",
            icon: <Settings width={20} height={20}/>,
        },
        {
            label: "Leave Server",
            onClick: async () => await handleLeaveServer(),
            type: "danger",
        },
    ];

    const router = useRouter();
    const { contextHolder, showSuccess, showError } = useNotification();
    const { serverId } = useParams();
    
    const { servers, refreshServers, loading } = useServer();
    const { channelsByServer } = useChannel();
    const selectedServer = servers.find(
    s => String(s.id) === String(serverId)
    );
    const { logout } = useAuth();
    const { collapsed, setCollapsed } = useServerLayout();

    const [ showServerSettingsModal, setShowServerSettingsModal ] = useState(false);
    const [showServerCreationModal, setShowServerCreationModal] = useState(false);


    const hndleSelectServer = (serverId: string) => {
        const cached = channelsByServer[serverId];
        if (cached?.[0]) {
            router.push(`/servers/${serverId}/channels/${cached[0].id}`);
        } else {
            router.push(`/servers/${serverId}/channels`);
        }
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

            refreshServers();

            if (servers.length > 0) {
                router.push(`/servers/${servers[0].id}/channels`);
            } else { 
                router.push("/");
            }
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
            <ServerSettingsModal show={showServerSettingsModal} onClose={() => setShowServerSettingsModal(false)} />
            <NewServerModal showServerCreationModal={showServerCreationModal} setShowServerCreationModal={setShowServerCreationModal} />
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
                                    <ContextDropdownComponent items={dropDownItems}>
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
                                    </ContextDropdownComponent>
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