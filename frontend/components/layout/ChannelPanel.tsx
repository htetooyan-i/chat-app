"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import CreateNewChannelModal from "@/components/channel/CreateNewChannelModal";
import ContextDropdownComponent, { ContextDropdownItem } from '../ui/ContextDropdown';
import DeleteChannelAlert from '../channel/settings/DeleteChannelAlert';
import EditChannelModal from '../channel/EditChannelModal';
import KonyatTypingText from '@/components/ui/KonyatTypingText';
import { useChannel } from '@/hooks/useChannel';
import { useServerMember } from '@/hooks/useServerMember';
import { SERVER_MANAGABLE_ROLES } from '@/types/ServerMember';


import type { Channel } from '@/types/Channel';

type ChannelPanelProps = {
    siderStyle: React.CSSProperties;
}

function ChannelPanel({ siderStyle }: ChannelPanelProps) {

    const router = useRouter();
    const { serverId, channelId } = useParams();
    const { channels } = useChannel();
    const selectedChannel = channels.find(c => String(c.id) === String(channelId));
    const { me } = useServerMember();

    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    const [ showEditChannelModal, setShowEditChannelModal ] = useState(false);

    const [ showDeleteChannelModal, setShowDeleteChannelModal ] = useState(false);

    const dropdownItems = (channel: Channel): ContextDropdownItem[] => [
        {
            label: "Edit Channel",
            onClick: () => {
                router.push(`/channels/${serverId}/${channel.id}`);
                setShowEditChannelModal(true);
            },
            type: "normal"
        },
        {
            label: "Delete Channel",
            onClick: () => {
                router.push(`/channels/${serverId}/${channel.id}`);
                setShowDeleteChannelModal(true);
            },
            type: "danger"
        }
    ];

    const handleChangeChannel = (selectedChannelId: number) => {
        router.push(`/channels/${serverId}/${selectedChannelId}`);
    };


    return (
        <div className='flex-1 md:w-[300px]'>
            <CreateNewChannelModal showCreateChannelModal={showCreateChannelModal} setShowCreateChannelModal={setShowCreateChannelModal} />
            <EditChannelModal show={showEditChannelModal} onClose={() => setShowEditChannelModal(false)} />
            <DeleteChannelAlert show={showDeleteChannelModal} onClose={() => setShowDeleteChannelModal(false)} />
            <div
            style={{
                ...siderStyle,
                overflow: "hidden",
                backgroundColor: "var(--background)",
                display: "flex",
                maxWidth: "300px",
                flexDirection: "column",
                scrollbarColor: "var(--muted-border) transparent",
                scrollbarWidth: "thin",
            }}
            >
                <div className={`flex-1 flex flex-col w-full h-full`}>
                    {/* Header */}
                    <header className='sticky top-0 z-10 h-[64px] w-full flex justify-center items-end pb-1 px-5 bg-background'>
                        {
                            me?.role && SERVER_MANAGABLE_ROLES.includes(me.role) ? (
                                <button
                                onClick={() => setShowCreateChannelModal(true)}
                                className="cursor-pointer bg-accent w-full text-white py-2 font-semibold rounded flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors"
                                >
                                <span>Create New Channel</span>
                                </button>
                            ) : (
                                <h2 className='bg-gradient-to-r from-accent via-indigo-500 to-secondary-accent w-full text-white py-2 font-semibold rounded flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-300'>                     
                                    <KonyatTypingText />
                                </h2>
                            )
                        }
                    </header>
                    {/* Channel List */}
                    <div className="flex flex-col w-full gap-3 items-center justify-start flex-1 overflow-y-auto p-5 thin-scrollbar" >
                        {
                            channels.map(channel => (
                                me?.role && SERVER_MANAGABLE_ROLES.includes(me.role) ? (
                                    <ContextDropdownComponent items={dropdownItems(channel)} key={channel.id}>
                                        <div onClick={() => handleChangeChannel(channel.id)} className={`text-[15px] h-[45px] w-full p-2 border-s-4 rounded-r-sm cursor-pointer flex items-center ${channel.id === selectedChannel?.id ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`}>
                                            <p className='truncate'><span>#</span> {channel.name}</p>
                                        </div>
                                    </ContextDropdownComponent>
                                ) : (
                                    <div key={channel.id} onClick={() => handleChangeChannel(channel.id)} className={`text-[15px] h-[45px] w-full p-2 border-s-4 rounded-r-sm cursor-pointer flex items-center ${channel.id === selectedChannel?.id ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`}>
                                        <p className='truncate'><span>#</span> {channel.name}</p>
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default ChannelPanel;