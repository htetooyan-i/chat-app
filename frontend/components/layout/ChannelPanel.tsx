import React from 'react';
import { Layout } from 'antd';

const { Sider } = Layout;

type ChannelPanelProps = {
    siderStyle: React.CSSProperties;
}

function ChannelPanel({ siderStyle }: ChannelPanelProps) {
    const handleCreateChannel = () => {
        // Navigate to the maintenance page
        window.location.href = "/maintenance?from=/";
    };
    return (
        <div>
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
            <Sider
            width={300}
            style={{
                ...siderStyle,
                backgroundColor: "var(--background)",
                scrollbarWidth: "thin",
            }}
            >
                <div className="w-full">
                    <div className="flex flex-col gap-3 py-4 px-5">
                        <div className="text-[15px] h-[45px] p-2 border-s-4 border-accent bg-chat-panel rounded-r-sm cursor-pointer flex items-center">
                            <p className='capitalize'><span>#</span> general</p>
                        </div>
                        <div className="text-[15px] h-[45px] p-2 border-s-4 border-muted-border rounded-r-sm cursor-pointer flex items-center">
                            <p className='capitalize text-muted-text'><span>#</span> random</p>
                        </div>
                        <div className="text-[15px] h-[45px] p-2 border-s-4 border-muted-border rounded-r-sm cursor-pointer flex items-center">
                            <p className='capitalize text-muted-text'><span>#</span> project-x</p>
                        </div>
                    </div>  
                </div>
            </Sider>

        </div>
    );
}

export default ChannelPanel;