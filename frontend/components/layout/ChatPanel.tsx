"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Layout, Avatar, Divider, Badge } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { ChevronRight, FileText, Paperclip, Send, Sticker, UsersRound, Reply, Ellipsis } from 'lucide-react';

import api from '@/lib/api';
import ButtonDropDown, { ButtonDropDownItem } from '../ui/ButtonDropDown';
import InfoPanel from '@/components/layout/InfoPanel';
import { formatDateTime, groupMessagesByDate, formatDate } from '@/lib/helper';
import { useServerLayout } from '@/hooks/useServerLayout';
import { handleMaintenanceRoute } from '@/lib/helper';
import { useServer } from '@/hooks/useServer';
import { useChannel } from '@/hooks/useChannel';

const { Header, Content, Footer } = Layout;

type Tabs = "settings" | "files" | "users" | "none";

export type Message = {
    id: string;
    channelId: string;
    authorId: string;
    replyToMessageId?: string;
    content: string;
    createdAt: Date | string;
    editedAt?: Date | string;
    clientId?: string;
    author: {
        id: string;
        username: string;
        avatarUrl: string;
    };
}

function ChatPanel() {

    const { serverId, channelId } = useParams();
    const { servers } = useServer();
    const { channels } = useChannel();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));
    const selectedChannel = channels.find(c => String(c.id) === String(channelId));
    
    const [ groupedMessages, setGroupedMessages ] = useState<Record<string, Message[]>>({});
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true)

    const { collapsed, setCollapsed } = useServerLayout();
    const [activeTab, setActiveTab] = useState<Tabs>("none");

    const items: ButtonDropDownItem[] = [
        {
            label: "Reply",
            onClick: () => {},
            type: "normal",
        },
        {
            label: "Copy Text",
            onClick: () => {},
            type: "normal",
        },
        {
            label: "Divide",
            onClick: () => {},
            type: "divider",
        },
        {
            label: "Delete Message",
            onClick: () => {},
            type: "danger",
        },
    ];

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get(`/channels/${channelId}/messages?limit=50`);
                const grouped = groupMessagesByDate(response.data.reverse()); // reverse to show newest at the bottom
                setGroupedMessages(grouped);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        }
        fetchMessages();
    }, [channelId]);

    // const loadMore = async () => {
    //     const res = await fetch(`/channels/${channelId}/messages?skip=${skip}&take=50`);
    //     const data = await res.json();

    //     if (data.length < 50) setHasMore(false); // no more messages

    //     setMessages(prev => [...data.reverse(), ...prev]); // prepend older messages
    //     setSkip(prev => prev + 50);
    // };


    return (
        <div className="flex w-full h-screen bg-chat-panel">
            <Layout 
                className='flex-1 flex flex-col' 
            >
                <Header 
                    className='flex items-center border-b border-muted-border' 
                    style={{ 
                        background: "var(--chat-panel)",
                        paddingInline: "20px",
                    }}
                >
                    <div className='flex w-full justify-between items-center'>
                        <div className='flex justify-start items-center gap-2 flex-1 min-w-0 overflow-hidden'>
                            <p onClick={() => setCollapsed(!collapsed)} className='text-white text-lg font-semibold text-[26px] capitalize cursor-pointer'>{selectedServer?.name || "Chat"}</p>
                            <ChevronRight className='text-foreground flex-shrink-0' size={32}/>
                            {/* FIX: Channel name should be dynamic and width doesn't work for now */}
                            <p className='text-[15px] min-w-0 max-w-[300px] truncate text-muted-text capitalize font-semibold'>
                                # {selectedChannel?.name || "Channel"}
                            </p>
                        </div>
                        <div className='flex-shrink-0 flex justify-between items-center gap-4' style={{paddingLeft: "5px"}}>
                            <div
                                onClick={() => {
                                    setActiveTab(activeTab === "settings" ? "none" : "settings");
                                }}
                                className={`flex justify-center items-center 
                                    w-[36px] h-[36px] 
                                    rounded-full 
                                    transition-all duration-200 
                                    cursor-pointer
                                    ${activeTab === "settings" ? "bg-accent rotate-180" : "bg-muted-background rotate-0"}
                                `}
                            >
                                <SettingFilled
                                    style={{ fontSize: 18, color: activeTab === "settings" ? "var(--foreground)" : "var(--muted-text)" }}
                                />
                            </div>
                            <div
                                onClick={() => {
                                    setActiveTab(activeTab === "files" ? "none" : "files");
                                }}
                                className={`flex justify-center items-center 
                                    w-[36px] h-[36px] 
                                    rounded-full 
                                    transition-all duration-200 
                                    cursor-pointer
                                    ${activeTab === "files" ? "bg-accent" : "bg-muted-background"}
                                `}
                            >
                                <FileText 
                                    style={{ fontSize: 18, color: activeTab === "files" ? "var(--foreground)" : "var(--muted-text)" }}
                                />
                            </div>
                            <div
                                onClick={() => {
                                    setActiveTab(activeTab === "users" ? "none" : "users");
                                }}
                                className={`flex justify-center items-center 
                                    w-[36px] h-[36px] 
                                    rounded-full 
                                    transition-all duration-200 
                                    cursor-pointer
                                    ${activeTab === "users" ? "bg-accent" : "bg-muted-background"}
                                `}
                            >
                                <UsersRound
                                    style={{ fontSize: 18, color: activeTab === "users" ? "var(--foreground)" : "var(--muted-text)" }}
                                />
                            </div>
                        </div>
                    </div>
                </Header>
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
                            {
                            Object.entries(groupedMessages).map(([date, messages]) => (
                                <div key={date} className='w-full flex flex-col items-start justify-start'>
                                    <div className='mx-auto'>
                                        <p className='text-sm text-muted-text bg-background p-2 rounded-lg text-[11px]'>{formatDate(date)}</p>
                                    </div>
                                    {
                                        messages.map((message, index) => (
                                            <div key={index} className={`relative flex items-start justify-start items-start gap-4 w-full hover:bg-muted-background/50 transition-colors cursor-pointer group ${(index > 0 && message.author.id === messages[index - 1].author.id) ? "pe-5 ps-21" : "px-5 mt-3"}`}>
                                                {
                                                    (index > 0 && message.author.id === messages[index - 1].author.id) ? (
                                                        <>
                                                            <div className='flex-1 flex flex-col gap-1'>
                                                                <div className='flex items-center gap-2'>
                                                                    {/* <div className={`flex items-center gap-1 px-1 py-0.5 bg-accent/20 border border-accent text-accent rounded text-[10px] font-medium ${index % 2 === 0 ? "hidden" : "" }`}>
                                                                        <span>👍</span>
                                                                        <span>1</span>
                                                                    </div> */}
                                                                </div>
                                                                <p className='text-sm text-[13px] font-medium cursor-text'>{message.content}</p>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Avatar shape="circle" size={48} src="/profile-img-sec.jpg" className='border-background' />
                                                            <div className='flex-1 flex flex-col gap-1'>
                                                                <div className='flex items-center gap-2'>
                                                                    <p className='font-semibold'>{message.author.username}</p>
                                                                    {/* <div className={`flex items-center gap-1 px-1 py-0.5 bg-accent/20 border border-accent text-accent rounded text-[10px] font-medium ${index % 2 === 0 ? "hidden" : "" }`}>
                                                                        <span>👍</span>
                                                                        <span>1</span>
                                                                    </div> */}
                                                                </div>
                                                                <p className='text-sm text-[13px] font-medium cursor-text'>{message.content}</p>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                
                                                <div>
                                                    <p className='text-[10px] text-muted-text'>
                                                        {message.editedAt 
                                                            ? `Edited At ${formatDateTime(message.createdAt)}` 
                                                            : formatDateTime(message.createdAt)
                                                        }

                                                    </p>
                                                </div>
                                                <div className='flex justify-between items-center gap-2 absolute right-25 -top-4 px-2 py-1 bg-muted-background/80 rounded-md border border-muted-border opacity-0 group-hover:opacity-100 transition-opacity'>
                                                    <span>👍</span>
                                                    <span>🙂</span>
                                                    <span>😢</span>
                                                    <Divider orientation="vertical" style={{ borderColor: "var(--foreground)" }} />
                                                    <Reply size={16}/>
                                                    <ButtonDropDown items={items} removeStyles><Ellipsis size={16}/></ButtonDropDown>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </Content>
                <Footer style={{ height: "60px", background: "var(--chat-panel)", paddingTop: "0", paddingInline: "20px" }}>
                    <div className='flex items-center gap-4 border rounded-lg border-muted-border bg-background h-[50px] px-2 text-foreground'>
                        <Paperclip className="cursor-pointer" onClick={handleMaintenanceRoute}/>
                        <input type="text" className='flex-1 bg-transparent outline-none placeholder:text-placeholder font-medium' placeholder='Type a message...' />
                        <div className='flex gap-2'>
                            <Sticker className="cursor-pointer" onClick={handleMaintenanceRoute}/>
                            <Send className="cursor-pointer" onClick={handleMaintenanceRoute}/>
                        </div>

                    </div>
                </Footer>
            </Layout>
                
            <InfoPanel type={activeTab} />
        </div>
    );
}

export default ChatPanel;