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
            <Sider
            width={300}
            style={{
                ...siderStyle,
                backgroundColor: "var(--background)",
                paddingInline: "20px",
                scrollbarGutter: "auto",
            }}
            className="!w-full"
            >
                <div className="w-full mt-7">
                    <button
                    onClick={handleCreateChannel}
                    className="bg-accent w-full text-white py-2 font-semibold rounded mb-4 flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors"
                    >
                    Create New Channel
                    </button>

                    {/* Channel List */}
                    <div className="flex flex-col gap-3 py-4">
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