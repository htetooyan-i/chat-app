import React from 'react';
import { Layout, Input } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { ChevronRight, FileText, Paperclip, Send, Sticker, UsersRound, Reply, Ellipsis } from 'lucide-react';

const { Header } = Layout;

type ChatHeaderProps = {
    setCollapsed: (collapsed: boolean) => void;
    collapsed: boolean;
    activeTab: "settings" | "files" | "users" | "none";
    setActiveTab: (tab: "settings" | "files" | "users" | "none") => void;
    selectedChannel: {
        id: string;
        name: string;
    } | null;
    selectedServer: {
        id: string;
        name: string;
    } | null;
}
function ChatHeader({ setCollapsed, collapsed, selectedChannel, selectedServer, activeTab, setActiveTab }: ChatHeaderProps) {
    return (
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
    );
}

export default ChatHeader;