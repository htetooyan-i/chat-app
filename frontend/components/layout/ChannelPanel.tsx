import React from 'react';
import { Layout } from 'antd';
import { useServerLayout } from '@/hooks/useServerLayout';

const { Sider } = Layout;

type ChannelPanelProps = {
    siderStyle: React.CSSProperties;
}

function ChannelPanel({ siderStyle }: ChannelPanelProps) {

    const handleCreateChannel = () => {
        // Navigate to the maintenance page
        window.location.href = "/maintenance?from=/";
    };

    const { collapsed, setCollapsed } = useServerLayout();

    return (
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
                    onClick={handleCreateChannel}
                    className="bg-accent w-full text-white py-2 font-semibold rounded flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors"
                    >
                    Create New Channel
                    </button>
                </header>
            

                {/* Channel List */}
                <div className="flex flex-col gap-3 items-center flex-1 overflow-y-auto p-5 thin-scrollbar" >
                    <div className="text-[15px] h-[45px] w-full p-2 border-s-4 border-accent bg-chat-panel rounded-r-sm cursor-pointer flex items-center">
                        <p className='capitalize truncate'><span>#</span> General</p>
                    </div>
                    <div className="text-[15px] h-[45px] w-full p-2 border-s-4 border-muted-border rounded-r-sm cursor-pointer flex items-center">
                        <p className='capitalize text-muted-text'><span>#</span> random</p>
                    </div>
                    <div className="text-[15px] h-[45px] w-full p-2 border-s-4 border-muted-border rounded-r-sm cursor-pointer flex items-center">
                        <p className='capitalize text-muted-text'><span>#</span> project-x</p>
                    </div>
                </div>
            </div>
            
        </Sider>
    );
}

export default ChannelPanel;