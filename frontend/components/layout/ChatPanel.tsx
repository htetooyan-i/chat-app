"use client";
import React, { useState } from 'react';
import { Layout } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { ChevronRight, FileText, Paperclip, Send, Sticker, UsersRound } from 'lucide-react';

import InfoPanel from '@/components/layout/InfoPanel';
import { useServerLayout } from '@/hooks/useServerLayout';
import { handleMaintenanceRoute } from '@/lib/helper';
import { useServer } from '@/hooks/useServer';

const { Header, Content, Footer } = Layout;

type Tabs = "settings" | "files" | "users" | "none";

function ChatPanel() {

    const { selectedServer } = useServer();
    const { collapsed, setCollapsed } = useServerLayout();
    const [activeTab, setActiveTab] = useState<Tabs>("none");
    const [changeTab, setChangeTab] = useState(false);

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
                                # General
                            </p>
                        </div>
                        <div className='flex-shrink-0 flex justify-between items-center gap-4' style={{paddingLeft: "5px"}}>
                            <div
                                onClick={() => {
                                    setActiveTab(activeTab === "settings" ? "none" : "settings");
                                    setChangeTab(activeTab === "settings" ? false : true);
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
                                    setChangeTab(activeTab === "files" ? false : true);
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
                                    setChangeTab(activeTab === "users" ? false : true);
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
                        paddingInline: "20px",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        color: "var(--foreground)",
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                        }}
                        className='w-full'
                    >
                        <p>long content</p>
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