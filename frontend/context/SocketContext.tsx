"use client";
import { createContext, useRef, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {

  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {

    if (socketRef.current) return;

    const newSocket = io(process.env.NEXT_PUBLIC_BASE_URL, {
      withCredentials: true
    });
    socketRef.current = newSocket;

    newSocket.on("connect", () => {
        setSocket(newSocket); // ← only set socket in state AFTER connected
    });

    return () => {
      newSocket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

