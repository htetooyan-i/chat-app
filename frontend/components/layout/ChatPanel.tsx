"use client";
import React, { useState } from 'react';
import { Layout } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { ChevronRight, FileText, UsersRound } from 'lucide-react';

import InfoPanel from '@/components/layout/InfoPanel';

const { Header, Content, Footer } = Layout;

type Tabs = "settings" | "files" | "users" | "none";

function ChatPanel() {
    const [activeTab, setActiveTab] = useState<Tabs>("none");
    const [changeTab, setChangeTab] = useState(false);
    return (
        <div className="flex w-full h-screen">
            <Layout 
                className='flex-1 flex flex-col' 
            >
                <Header 
                    className='flex items-center' 
                    style={{ 
                        padding: "20px", 
                        background: "var(--chat-panel)", 
                        borderBottomWidth: 1, 
                        borderBottomColor: "var(--muted-border)",
                    }}
                >
                    <div className='flex w-full justify-between items-center'>
                        <div className='flex justify-start items-center gap-2 flex-1 min-w-0 overflow-hidden'>
                            <p className='text-white text-lg font-semibold text-[26px] capitalize'>Family</p>
                            <ChevronRight className='text-foreground flex-shrink-0' size={32}/>
                            {/* FIX: Channel name should be dynamic and width doesn't work for now */}
                            <p className='text-[15px] w-[50px] sm:w-[300px] truncate text-muted-text capitalize font-semibold'>
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
            </Layout>
                
            {activeTab !== "none" && 
                <InfoPanel type={activeTab} />
            }
        </div>
    );
}

export default ChatPanel;