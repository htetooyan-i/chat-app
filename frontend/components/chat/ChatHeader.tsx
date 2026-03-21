import { Layout } from 'antd';
import { ChevronRight, FileText, UsersRound } from 'lucide-react';

import { useServerLayout } from '@/hooks/useServerLayout';
import { Channel } from '@/types/Channel';
import { Server } from '@/types/Server';
const { Header } = Layout;

type ChatHeaderProps = {
    activeTab: "settings" | "files" | "users" | "none";
    setActiveTab: (tab: "settings" | "files" | "users" | "none") => void;
    selectedChannel:  Channel | null;
    selectedServer: Server | null;
}
function ChatHeader({ selectedChannel, selectedServer, activeTab, setActiveTab }: ChatHeaderProps) {
    const { setCollapsed } = useServerLayout();

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
                    <p onClick={() => setCollapsed(prev => !prev)} className='text-white text-lg font-semibold text-[26px] capitalize cursor-pointer'>{selectedServer?.name || "Chat"}</p>
                    <ChevronRight className='text-foreground flex-shrink-0' size={32}/>
                    {/* FIX: Channel name should be dynamic and width doesn't work for now */}
                    <p className='text-[15px] min-w-0 max-w-[300px] truncate text-muted-text capitalize font-semibold'>
                        # {selectedChannel?.name || "Channel"}
                    </p>
                </div>
                <div className='flex-shrink-0 flex justify-between items-center gap-4' style={{paddingLeft: "5px"}}>
                    {/*<div*/}
                    {/*    onClick={() => {*/}
                    {/*        setActiveTab(activeTab === "settings" ? "none" : "settings");*/}
                    {/*    }}*/}
                    {/*    className={`flex justify-center items-center */}
                    {/*        w-[36px] h-[36px] */}
                    {/*        rounded-full */}
                    {/*        transition-all duration-200 */}
                    {/*        cursor-pointer*/}
                    {/*        ${activeTab === "settings" ? "bg-accent rotate-180" : "bg-muted-background rotate-0"}*/}
                    {/*    `}*/}
                    {/*>*/}
                    {/*    <SettingFilled*/}
                    {/*        style={{ fontSize: 18, color: activeTab === "settings" ? "var(--foreground)" : "var(--muted-text)" }}*/}
                    {/*    />*/}
                    {/*</div>*/}
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