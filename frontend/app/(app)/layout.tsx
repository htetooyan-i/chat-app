import { AuthProvider } from "@/context/AuthContext";
import { ServerProvider } from "@/context/ServerContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ServerProvider>  
        {children}
      </ServerProvider>
    </AuthProvider>
  );
}
