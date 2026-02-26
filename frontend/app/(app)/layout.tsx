import { AuthProvider } from "@/context/AuthContext";
import { ServerProvider } from "@/context/ServerContext";
import { ChannelProviderWrapper } from "./ChannelProviderWrapper";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ServerProvider>  
        <ChannelProviderWrapper>{children}</ChannelProviderWrapper>
      </ServerProvider>
    </AuthProvider>
  );
}
