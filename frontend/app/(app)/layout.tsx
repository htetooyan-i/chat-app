import { AuthProvider } from "@/context/AuthContext";
import { ServerProvider } from "@/context/ServerContext";
import { ChannelProvider } from "@/context/ChannelContext";
import { SocketProvider } from "@/context/SocketContext";
import { NotificationProvider } from "@/context/NotificationContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SocketProvider>
        <NotificationProvider>
          <ServerProvider>
              <ChannelProvider>
                {children}
              </ChannelProvider>
          </ServerProvider>
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  );
}
