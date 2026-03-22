import React from 'react';
import { Layout } from 'antd';
import { Button } from "@/components/ui/button"
import { CircleFadingArrowUpIcon } from "lucide-react"

import ChannelSidebar from '@/components/layout/ChannelPanel';
import { useServerLayout } from '@/hooks/useServerLayout';

const siderStyle: React.CSSProperties = {
    overflow: 'hidden',
    position: 'relative',
    insetInlineStart: 0,
    top: 0,
    height: '100vh',
};

type EmptyPageProps = {
    username: string;
    page: "server" | "channel";
};

function EmptyPage({username, page}: EmptyPageProps) {
    const { setPanelCollapsed } = useServerLayout();
    return (
        <Layout style={{ height: "100vh", overflow: "hidden", display: "flex" }}>
            <Layout className="flex items-center justify-center" style={{ flex: 1, backgroundColor: "var(--chat-panel)" }}>
                <div className="text-center">
                    <h2 className="text-gray-500 text-4xl">
                        Welcome {username}!
                    </h2>
                    <h2 className="text-gray-500 text-xl">
                        {
                            page === 'server' ? (
                                "Create or join a server to get started!"
                            ) : (
                                "Create a channel to start chatting!"
                            )
                        }
                    </h2>
                </div>
            </Layout>

        <div className='absolute top-4 left-4'>
            <Button size="icon" className='rounded-full bg-accent cursor-pointer' onClick={() => setPanelCollapsed(prev => !prev)}>
                <CircleFadingArrowUpIcon />
            </Button>
        </div>
        </Layout>
    );
}

export default EmptyPage;