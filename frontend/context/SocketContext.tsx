"use client";
import { createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { useAuth } from "@/hooks/useAuth";
import { connectSocket, disconnectSocket, getSocket } from "@/app/socket";

type SocketContextType = {
  socket: Socket | null;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (loading) return;

    const instance = getSocket();

    const handleConnect = () => {
      setSocket(instance);
    };

    const handleDisconnect = () => {
      setSocket(null);
    };

    instance.on("connect", handleConnect);
    instance.on("disconnect", handleDisconnect);

    if (isAuthenticated) {
      connectSocket();
      if (instance.connected) {
        setSocket(instance);
      }
    } else {
      disconnectSocket();
      setSocket(null);
    }

    return () => {
      instance.off("connect", handleConnect);
      instance.off("disconnect", handleDisconnect);
    };
  }, [isAuthenticated, loading]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}