import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Layout, Divider, Avatar, Skeleton } from 'antd';
import { Reply, Ellipsis, Signature, Pencil } from 'lucide-react';

import api from '@/lib/api';
import ChatMessage from './ChatMessage';
import EditChannelModal from '../channel/EditChannelModal';
import { Message } from '@/types/Message';
import { Channel } from '@/types/Channel';
import { formatDate, formatDateTime } from '@/lib/helper';
import { useNotification } from '@/hooks/useNotification';
import { useChannel } from '@/hooks/useChannel';

const { Content } = Layout;

type ChatContentProps = {
    groupedMessages: Record<string, Message[]>;  
    channel: Channel | null; 
    containerRef: React.RefObject<HTMLDivElement | null>;
    sentinelRef: React.RefObject<HTMLDivElement | null>;
    hasMore: boolean;
    handleDeleteMessage: (messageId: string) => void;
}
function ChatContent({ groupedMessages, channel, containerRef, sentinelRef, hasMore, handleDeleteMessage }: ChatContentProps) {

    const { serverId, channelId } = useParams();
    const { refreshChannels } = useChannel();
    const [ showEditChannelModal, setShowEditChannelModal ] = useState(false);
    const { contextHolder, showError, showSuccess } = useNotification();


    const handleChangeChannelName = async (newName: string) => {
        if (newName.trim() === "") {
            showError("Channel name cannot be empty.");
            return;
        }
        try {
            await api.patch(`/servers/${serverId}/channels/${channelId}`, { newName });
            refreshChannels();
            setShowEditChannelModal(false);
            showSuccess("Channel name updated successfully!");
        }
        catch (error: any) {
            showError(error.response?.data?.message || "Failed to update channel name.");
        } 
    };
    
    // Scroll to bottom when messages change
    const bottomRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, [groupedMessages]);

    return (
        <>
            {contextHolder}
            <EditChannelModal 
            show={showEditChannelModal}
            onClose={() => setShowEditChannelModal(false)}
            changeChannelName={handleChangeChannelName}
            />
            <Content 
            style={{ 
                flex: 1,
                background: "var(--chat-panel)",
                overflowY: "auto",
                scrollbarWidth: "thin",
                color: "var(--foreground)",
            }}
            >
                
                <div
                    style={{
                        paddingBlock: 24,
                    }}
                    className='min-h-full w-full flex-1 flex flex-col items-start justify-end gap-1'
                    >
                    {/* Welcome message */}
                    {
                        hasMore ? ( // Show skeletons while loading messages
                            <div className="flex-1 w-full flex flex-col justify-end px-4 py-4 gap-4">
                                {[...Array(15)].map((_, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Skeleton.Avatar active shape="circle" size={36} style={{ backgroundColor: "var(--muted-background)" }} />
                                    
                                    <div className="flex flex-col gap-2 flex-1">
                                        <Skeleton.Node active style={{ height: "12px", width: "70px", backgroundColor: "var(--muted-background)", borderRadius: "3px" }} />
                                        <Skeleton.Node active style={{ height: "12px", width: `${i % 2 === 0 ? 75 : 50}%`, backgroundColor: "var(--muted-background)", borderRadius: "3px" }} />
                                    </div>
                                </div>
                                ))}
                            </div>
                        ) : ( // Show welcome message if no messages in channel
                            <div className='px-5 mb-5'>
                                <Avatar shape="circle" size={48} icon={<Signature />} />
                                <p className='text-foreground text-[28px] font-bold'>Welcome to #{channel?.name || "Channel"}</p>
                                <p className='text-muted-text text-[14px]'>This is the beginning of the #{channel?.name || "Channel"} channel.</p>
                                <button onClick={() => setShowEditChannelModal(true)} className="flex gap-2 items-center text-accent bg-accent/10 px-3 py-1 rounded-md text-sm my-2">
                                    <Pencil size={14}/>
                                    <span>Edit Channel</span>
                                </button>
                            </div>  
                        )
                    }
                    <div ref={containerRef} className="w-full">
                        <div ref={sentinelRef} className="h-1" />
                        {
                            Object.entries(groupedMessages).map(([date, messages]) => {
                                const messagesMap: Record<string, Message> = {};
                                Object.values(groupedMessages).flat().forEach(msg => {
                                messagesMap[msg.id] = msg;
                                });
                                return (
                                    <div key={date} className='w-full flex flex-col items-start justify-start'>
                                        <div className='mx-auto'>
                                            <p className='text-sm text-muted-text bg-background p-2 rounded-lg text-[11px]'>{formatDate(date, true)}</p>
                                        </div>
                                        <ChatMessage messages={messages} messagesMap={messagesMap} deleteMessage={handleDeleteMessage} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div ref={bottomRef} />
                </div>
                
            </Content>
        </>
    );
}

export default ChatContent;