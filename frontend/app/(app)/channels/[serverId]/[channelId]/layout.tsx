import React from 'react';

import ChannelPanelWrapper from '@/components/layout/Wrappers/ChannelPanelWrapper';
import { MessageProvider } from '@/context/MessageContext';
import { ChatUIProvider } from '@/context/ChatUIContext';
import { ServerAttachmentProvider} from "@/context/ServerAttachmentContext";


export default function MessageLayout({ children }: { children: React.ReactNode; }) {
    return (
        <MessageProvider>
            <ChatUIProvider>
                <ServerAttachmentProvider>
                    <ChannelPanelWrapper />
                    {children}
                </ServerAttachmentProvider>
            </ChatUIProvider>
        </MessageProvider>
    );
}
