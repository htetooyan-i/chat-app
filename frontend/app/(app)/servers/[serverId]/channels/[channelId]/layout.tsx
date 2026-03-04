import { ChatProvider } from '@/context/ChatContext';

export default function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex-1">
      <ChatProvider>
        {children}
      </ChatProvider>
    </div>
  );  
}
