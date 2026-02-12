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
        <div className='flex w-full'>
            <Layout>
                <Header className='flex items-center' style={{ padding: "20px", background:  "var(--chat-panel)", borderBottomWidth: 1 , borderBottomColor: "var(--muted-border)"}} >
                    <div className='flex w-full justify-between items-center'>
                        <div className='flex justify-start items-center gap-2'>
                            <p className='text-white text-lg font-semibold text-[26px] capitalize'>Family</p>
                            <ChevronRight className='text-foreground' size={32}/>
                            <span className='text-[15px] text-muted-text capitalize font-semibold'># general</span>
                        </div>
                        <div className='flex justify-between items-center gap-2'>
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
                                    style={{ fontSize: 24, color: activeTab === "settings" ? "var(--foreground)" : "var(--muted-text)" }}
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
                                style={{ fontSize: 24, color: activeTab === "files" ? "var(--foreground)" : "var(--muted-text)" }}
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
                                    style={{ fontSize: 24, color: activeTab === "users" ? "var(--foreground)" : "var(--muted-text)" }}
                                />
                            </div>
                        </div>
                    </div>
                </Header>
                <Content style={{ overflow: 'initial' }} className='flex'>
                    <div
                        style={{
                        padding: 24,
                        textAlign: 'center',
                        background: "var(--chat-panel)",
                        }}
                        className='w-full'
                    >
                        <p>long content</p>
                        {
                        // indicates very long content
                        Array.from({ length: 100 }, (_, index) => (
                            <React.Fragment key={index}>
                            {index % 20 === 0 && index ? 'more' : '...'}
                            <br />
                            </React.Fragment>
                        ))
                        }
                    </div>

                    {activeTab !== "none" && <InfoPanel type={activeTab} />}
                </Content>
                <Footer style={{ textAlign: 'center', background: "var(--chat-panel)" }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </div>
    );
}

export default ChatPanel;