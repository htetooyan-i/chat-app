import React from 'react';

import { MessageProvider } from '@/context/MessageContext';
import { ChatUIProvider } from '@/context/ChatUIContext';
import { ServerAttachmentProvider} from "@/context/ServerAttachmentContext";


export default function MessageLayout({ children }: { children: React.ReactNode; }) {
    return (
        <MessageProvider>
            <ChatUIProvider>
                <ServerAttachmentProvider>
                    {children}
                </ServerAttachmentProvider>
            </ChatUIProvider>
        </MessageProvider>
    );
}
