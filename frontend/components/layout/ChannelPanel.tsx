import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import api from '@/lib/api';
import CreateNewChannelModal from "@/components/channel/CreateNewChannelModal";
import DropdownComponent, { DropdownItem } from '../ui/Dropdown';
import DeleteChannelModal from '../channel/settings/DeleteChannelModal';
import { useChannel } from '@/hooks/userChannel';
import { useNotification } from '@/hooks/useNotification';
import { useServerLayout } from '@/hooks/useServerLayout';
import { useServer } from '@/hooks/useServer';
import type { Channel } from '@/context/ChannelContext';

const { Sider } = Layout;

type ChannelPanelProps = {
    siderStyle: React.CSSProperties;
}

function ChannelPanel({ siderStyle }: ChannelPanelProps) {

    const { contextHolder, showError, showSuccess } = useNotification();
    const { selectedServer } = useServer();
    const { channels, setChannels, selectedChannel, setSelectedChannel, refreshChannels } = useChannel();
    const serverId = selectedServer?.id || "";
    const { collapsed, setCollapsed } = useServerLayout();
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    const [showDeleteChannelModal, setShowDeleteChannelModal] = useState(false);
    const [channelToDelete, setChannelToDelete] = useState<Channel | null>(null);    
    const dropdownItems = (channel: Channel): DropdownItem[] => [
        {
            label: "Edit Channel",
            onClick: () => {},
            type: "normal"
        },
        {
            label: "Delete Channel",
            onClick: () => {
                setChannelToDelete(channel);
                setShowDeleteChannelModal(true);
            },
            type: "danger"
        }
    ];
    
    const handleCreateChannel = async (channelName: string) => {
        if (channelName.trim() === "") {
            showError("Channel name cannot be empty.");
            return;
        }
        try {
            await api.post(`/servers/${serverId}/channels`, { name: channelName });
            showSuccess("Channel created successfully!");
            refreshChannels();
            setShowCreateChannelModal(false);
        }
        catch (error) {
            showError("Failed to create channel.");
        } 
    };

    const handleDeleteChannel = async (channelToDelete: Channel) => {
        try {
            await api.delete(`/channels/${channelToDelete.id}`);
            showSuccess("Channel deleted successfully!");
            setChannels(prevChannels => prevChannels.filter(channel => channel.id !== channelToDelete.id));
            refreshChannels();
            setShowDeleteChannelModal(false);
        }
        catch (error) {
            showError("Failed to delete channel.");
        } 
    };

    return (
        <div>
            {contextHolder}
            <CreateNewChannelModal showCreateChannelModal={showCreateChannelModal} setShowCreateChannelModal={setShowCreateChannelModal} handleCreateChannel={handleCreateChannel}  />
            <DeleteChannelModal 
            show={showDeleteChannelModal} 
            channelName={channelToDelete?.name || ""}
            onClose={() => {
                setShowDeleteChannelModal(false);
                setChannelToDelete(null);
            }}
            onConfirm={() => {
                if (channelToDelete) {
                handleDeleteChannel(channelToDelete);
                }
            }} />
            <Sider
            trigger={null}
            width={300}
            breakpoint='lg'
            collapsed={collapsed}
            collapsedWidth={0}
            onBreakpoint={(broken) => {
                setCollapsed(broken);
            }}
            style={{
                ...siderStyle,
                overflow: "hidden",
                backgroundColor: "var(--background)",
                display: "flex",
                flexDirection: "column",
                scrollbarColor: "red transparent",
                scrollbarWidth: "thin",
            }}
            >
                <div className={`flex flex-col w-full h-full ${collapsed ? 'hidden' : ''}`}>
                    {/* Header */}
                    <header className='sticky top-0 z-10 h-[64px] w-full flex justify-center items-end pb-1 px-5 bg-background'>
                        <button
                        onClick={() => setShowCreateChannelModal(true)}
                        className="bg-accent w-full text-white py-2 font-semibold rounded flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors"
                        >
                        Create New Channel
                        </button>
                    </header>
                

                    {/* Channel List */}
                    <div className="flex flex-col w-full gap-3 items-center justify-start flex-1 overflow-y-auto p-5 thin-scrollbar" >
                        {
                            channels.map(channel => (
                                <DropdownComponent items={dropdownItems(channel)} key={channel.id}>
                                    <div onClick={() => setSelectedChannel(channel)} className={`text-[15px] h-[45px] w-full p-2 border-s-4 rounded-r-sm cursor-pointer flex items-center ${channel.id === selectedChannel?.id ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`}>
                                        <p className='capitalize truncate'><span>#</span> {channel.name}</p>
                                    </div>
                                </DropdownComponent>
                            ))
                        }
                    </div>
                </div>
                
            </Sider>
        </div>
    );
}

export default ChannelPanel;