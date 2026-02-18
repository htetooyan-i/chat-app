import React, { useState } from 'react';
import { Layout } from 'antd';

import { useServerLayout } from '@/hooks/useServerLayout';
import CreateNewChannelModal from "@/components/channel/CreateNewChannelModal";
import { useNotification } from '@/hooks/useNotification';
import { useServer } from '@/hooks/useServer';
import { useChannel } from '@/hooks/userChannel';
import api from '@/lib/api';

const { Sider } = Layout;

type ChannelPanelProps = {
    siderStyle: React.CSSProperties;
}

function ChannelPanel({ siderStyle }: ChannelPanelProps) {

    const { contextHolder, showError, showSuccess } = useNotification();
    const { selectedServer } = useServer();
    const { channels, setChannels } = useChannel();
    const serverId = selectedServer?.id || "";
    const { collapsed, setCollapsed } = useServerLayout();
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    
    const handleCreateChannel = async (channelName: string) => {
        if (channelName.trim() === "") {
            showError("Channel name cannot be empty.");
            return;
        }
        try {
            await api.post(`/servers/${serverId}/channels`, { name: channelName });
            showSuccess("Channel created successfully!");
            setShowCreateChannelModal(false);
        }
        catch (error) {
            showError("Failed to create channel.");
        }
        

            
    };
    return (
        <div>
            {contextHolder}
            <CreateNewChannelModal showCreateChannelModal={showCreateChannelModal} setShowCreateChannelModal={setShowCreateChannelModal} handleCreateChannel={handleCreateChannel}  />
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
                <div className={`flex flex-col h-full ${collapsed ? 'hidden' : ''}`}>
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
                    <div className="flex flex-col gap-3 items-center flex-1 overflow-y-auto p-5 thin-scrollbar" >
                        {
                            channels.map(channel => (
                                <div key={channel.id} className={`text-[15px] h-[45px] w-full p-2 border-s-4 rounded-r-sm cursor-pointer flex items-center ${Number(channel.id) === 3 ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`}>
                                    <p className='capitalize truncate'><span>#</span> {channel.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
            </Sider>
        </div>
    );
}

export default ChannelPanel;