import { AuthProvider } from "@/context/AuthContext";
import { ServerProvider } from "@/context/ServerContext";
import { ChannelProvider } from "@/context/ChannelContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ServerProvider>  
        <ChannelProvider>
          {children}
        </ChannelProvider>
      </ServerProvider>
    </AuthProvider>
  );
}
