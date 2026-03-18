import React from 'react';
import { Layout } from 'antd';

import ServerSidebar from '@/components/layout/SideBar';
import ChannelSidebar from '@/components/layout/ChannelPanel';

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
    return (
        <Layout style={{ height: "100vh", overflow: "hidden", display: "flex", backgroundColor: "red" }}>
            <ServerSidebar siderStyle={siderStyle} />
            {
                page === 'channel' && <ChannelSidebar siderStyle={siderStyle} />
            }

            <Layout className="flex items-center justify-center" style={{ flex: 1, backgroundColor: "var(--background)" }}>
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
        </Layout>
    );
}

export default EmptyPage;