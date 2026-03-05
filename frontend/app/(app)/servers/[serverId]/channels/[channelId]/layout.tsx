import { MessageProvider } from '@/context/MessageContext';
import { ChatUIProvider } from '@/context/ChatUIContext';

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex-1">
      <MessageProvider>
        <ChatUIProvider>
          {children}
        </ChatUIProvider>
      </MessageProvider>
    </div>
  );  
}
