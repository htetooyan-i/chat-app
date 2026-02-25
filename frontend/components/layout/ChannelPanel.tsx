import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import api from '@/lib/api';
import CreateNewChannelModal from "@/components/channel/CreateNewChannelModal";
import ContextDropdownComponent, { ContextDropdownItem } from '../ui/ContextDropdown';
import DeleteChannelModal from '../channel/settings/DeleteChannelModal';
import EditChannelModal from '../channel/EditChannelModal';
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
    const [ showEditChannelModal, setShowEditChannelModal ] = useState(false);

    const dropdownItems = (channel: Channel): ContextDropdownItem[] => [
        {
            label: "Edit Channel",
            onClick: () => {
                setSelectedChannel(channel);
                setShowEditChannelModal(true);
            },
            type: "normal"
        },
        {
            label: "Delete Channel",
            onClick: () => {
                setSelectedChannel(channel);
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
        catch (error: any) {
            showError(error.response?.data?.message || "Failed to create channel.");
        } 
    };

    const handleChangeChannelName = async (newName: string, password: string) => {
        if (newName.trim() === "") {
            showError("Channel name cannot be empty.");
            return;
        }
        try {
            await api.patch(`/channels/${selectedChannel?.id}`, { newName, password });
            showSuccess("Channel name updated successfully!");
            refreshChannels();
            setShowEditChannelModal(false);
        }
        catch (error: any) {
            showError(error.response?.data?.message || "Failed to update channel name.");
        } 
    };

    const handleDeleteChannel = async () => {
        try {
            await api.delete(`/channels/${selectedChannel?.id}`);
            showSuccess("Channel deleted successfully!");
            setChannels(prevChannels => prevChannels.filter(channel => channel.id !== selectedChannel?.id));
            refreshChannels();
            setShowDeleteChannelModal(false);
        }
        catch (error: any) {
            showError(error.response?.data?.message || "Failed to delete channel.");
        } 
    };

    return (
        <div>
            {contextHolder}
            <CreateNewChannelModal showCreateChannelModal={showCreateChannelModal} setShowCreateChannelModal={setShowCreateChannelModal} handleCreateChannel={handleCreateChannel}  />
            <DeleteChannelModal 
            show={showDeleteChannelModal} 
            channelName={selectedChannel?.name || ""}
            onClose={() => {
                setShowDeleteChannelModal(false);
            }}
            onConfirm={() => {
                if (selectedChannel) handleDeleteChannel()
            }} />
            <EditChannelModal show={showEditChannelModal} onClose={() => setShowEditChannelModal(false)} changeChannelName={handleChangeChannelName} />
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
                        className="cursor-pointer bg-accent w-full text-white py-2 font-semibold rounded flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors"
                        >
                        Create New Channel
                        </button>
                    </header>
                

                    {/* Channel List */}
                    <div className="flex flex-col w-full gap-3 items-center justify-start flex-1 overflow-y-auto p-5 thin-scrollbar" >
                        {
                            channels.map(channel => (
                                <ContextDropdownComponent items={dropdownItems(channel)} key={channel.id}>
                                    <div onClick={() => setSelectedChannel(channel)} className={`text-[15px] h-[45px] w-full p-2 border-s-4 rounded-r-sm cursor-pointer flex items-center ${channel.id === selectedChannel?.id ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`}>
                                        <p className='capitalize truncate'><span>#</span> {channel.name}</p>
                                    </div>
                                </ContextDropdownComponent>
                            ))
                        }
                    </div>
                </div>
                
            </Sider>
        </div>
    );
}

export default ChannelPanel;