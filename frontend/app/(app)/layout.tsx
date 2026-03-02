import { AuthProvider } from "@/context/AuthContext";
import { ServerProvider } from "@/context/ServerContext";
import { ChannelProviderWrapper } from "./ChannelProviderWrapper";
import { SocketProvider } from "@/context/SocketContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      <AuthProvider>
        <ServerProvider>  
          <ChannelProviderWrapper>{children}</ChannelProviderWrapper>
        </ServerProvider>
      </AuthProvider>
    </SocketProvider>
  );
}
