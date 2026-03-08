"use client";
import React, { useState } from 'react';
import { LogOut, Plus, Settings } from 'lucide-react';
import { Avatar, Badge, Layout } from 'antd';
import { useRouter, useParams, usePathname } from 'next/navigation';
import Image from 'next/image';

import ContextDropdownComponent, { ContextDropdownItem } from '@/components/ui/ContextDropdown';
import ServerSettingsModal from '../server/settings/ServerSettingsModal';
import NewServerModal from '../server/NewServerModal';
import { useAuth } from '@/hooks/useAuth';
import { useServerLayout } from '@/hooks/useServerLayout';
import { useServer } from '@/hooks/useServer';
import { useNotification } from '@/hooks/useNotification';
import { useChannel } from '@/hooks/useChannel';
import { useServerMember } from '@/hooks/useServerMember';
import { getErrorMessage } from '@/lib/api'

const { Sider } = Layout;

type SideBarProps = {
    siderStyle: React.CSSProperties;
}

function SideBar({ siderStyle }: SideBarProps) {

    
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const { contextHolder, showSuccess, showError } = useNotification();
    
    const { servers, refreshServers, leaveServer } = useServer();
    const { channelsByServer, clearServerCache } = useChannel();
    const { me } = useServerMember();
    const { logout } = useAuth();

    const serverId = Array.isArray(params.serverId) ? Number(params.serverId[0]) : Number(params.serverId);
    const selectedServer = servers.find(
        s => s.id === serverId
    );

    const { collapsed, setCollapsed } = useServerLayout();
    const [ showServerSettingsModal, setShowServerSettingsModal ] = useState(false);
    const [showServerCreationModal, setShowServerCreationModal] = useState(false);
    
    const dropDownItems = (selectedServerId: number): ContextDropdownItem[] => {
        const items: ContextDropdownItem[] = [];
        if (selectedServer && me && ( me.role === "OWNER" || me.role === "ADMIN" || me.role === "MODERATOR" )) {
            items.push(
                {
                    label: "Settings",
                    onClick: () => setShowServerSettingsModal(true),
                    type: "normal",
                    icon: <Settings width={20} height={20}/>,
                },
            )
        }

        items.push(
            {
                label: "Leave Server",
                onClick: async () => await handleLeaveServer(selectedServerId),
                type: "danger",
                meta: {
                    disallowSelect: true
                }
            }
        );
        
        return items;
    };

    const handleSelectServer = (serverId: number) => {
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

    const handleLeaveServer = async (selectedServerId: number) => {
        try {
            await leaveServer(selectedServerId);
            showSuccess("You have left the server.");

            clearServerCache(selectedServerId);

            // navigate first before refreshing
            if (selectedServerId === serverId) {
                if (servers.length > 0) {
                    const cached = channelsByServer[servers[0].id];
                    if (cached?.[0]) {
                        router.push(`/servers/${servers[0].id}/channels/${cached[0].id}`);
                    } else {
                        router.push(`/servers/${servers[0].id}/channels`);
                    }
                } else {
                    router.push("/servers");
                }
            }

            await refreshServers();

        } catch (error) {
            showError(getErrorMessage(error, "Failed to leave server."));
        }
    };

    const handleShowUserSettings = () => {
        router.push(`/settings?from=${pathname}`);
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
                    <header className='h-16 sticky top-0 z-10 flex justify-center items-center pt-3 pb-3 bg-sidebar border-b border-muted-border'>
                        <Badge dot color="green" className="bottom-badge cursor-pointer">
                            <Avatar shape="square" size={50}>
                                <Image
                                onClick={handleShowUserSettings}
                                src="/logo.png"
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
                                    onClick={() => handleSelectServer(server.id)}
                                >
                                    <ContextDropdownComponent items={dropDownItems(server.id)}>
                                        <Badge>
                                            <Avatar
                                                src='/server-img-default.png'
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