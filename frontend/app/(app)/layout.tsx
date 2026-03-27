import { AuthProvider } from "@/context/AuthContext";
import { ServerProvider } from "@/context/ServerContext";
import { ChannelProvider } from "@/context/ChannelContext";
import { SocketProvider } from "@/context/SocketContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SocketProvider>
        <ServerProvider>  
            <ChannelProvider>
              {children}
            </ChannelProvider>
        </ServerProvider>
      </SocketProvider>
    </AuthProvider>
  );
}
