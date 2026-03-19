"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layout } from 'antd';
import { toast } from "sonner";

import CreateNewChannelModal from "@/components/channel/CreateNewChannelModal";
import ContextDropdownComponent, { ContextDropdownItem } from '../ui/ContextDropdown';
import DeleteChannelModal from '../channel/settings/DeleteChannelModal';
import EditChannelModal from '../channel/EditChannelModal';
import { useChannel } from '@/hooks/useChannel';
import { useServerLayout } from '@/hooks/useServerLayout';
import type { Channel } from '@/types/Channel';
import { getErrorMessage } from '@/lib/api';

const { Sider } = Layout;

type ChannelPanelProps = {
    siderStyle: React.CSSProperties;
}

function ChannelPanel({ siderStyle }: ChannelPanelProps) {

    const router = useRouter();
    const { serverId, channelId } = useParams();
    const { channels, deleteChannel } = useChannel();
    const selectedChannel = channels.find(c => String(c.id) === String(channelId));

    const { collapsed, setCollapsed } = useServerLayout();
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    const [showDeleteChannelModal, setShowDeleteChannelModal] = useState(false);
    const [ showEditChannelModal, setShowEditChannelModal ] = useState(false);

    const dropdownItems = (channel: Channel): ContextDropdownItem[] => [
        {
            label: "Edit Channel",
            onClick: () => {
                router.push(`/servers/${serverId}/channels/${channel.id}`);
                setShowEditChannelModal(true);
            },
            type: "normal"
        },
        {
            label: "Delete Channel",
            onClick: () => {
                router.push(`/servers/${serverId}/channels/${channel.id}`);
                setShowDeleteChannelModal(true);
            },
            type: "danger"
        }
    ];

    const handleChangeChannel = (selectedChannelId: number) => {
        router.push(`/servers/${serverId}/channels/${selectedChannelId}`);
    };

    const handleDeleteChannel = async () => {
        try {
            await deleteChannel();

            // After deletion, redirect to the first available channel or back to server main page
            if (channels.length > 0) {
                router.push(`/servers/${serverId}/channels/${channels[0].id}`);
            } else {
                router.push(`/servers/${serverId}`);
            }

            toast.success("Channel deleted successfully!");
            setShowDeleteChannelModal(false);
        } catch (err) {
            toast.error("Failed to delete channel.", {
                description: getErrorMessage(err, "An unexpected error occurred.")
            });
        }
    };

    return (
        <div>
            <CreateNewChannelModal showCreateChannelModal={showCreateChannelModal} setShowCreateChannelModal={setShowCreateChannelModal} />
            <DeleteChannelModal 
            show={showDeleteChannelModal} 
            channelName={selectedChannel?.name || ""}
            onClose={() => {
                setShowDeleteChannelModal(false);
            }}
            onConfirm={() => {
                if (selectedChannel) handleDeleteChannel()
            }} />
            <EditChannelModal show={showEditChannelModal} onClose={() => setShowEditChannelModal(false)} />
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
                scrollbarColor: "var(--muted-border) transparent",
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
                                    <div onClick={() => handleChangeChannel(channel.id)} className={`text-[15px] h-[45px] w-full p-2 border-s-4 rounded-r-sm cursor-pointer flex items-center ${channel.id === selectedChannel?.id ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`}>
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