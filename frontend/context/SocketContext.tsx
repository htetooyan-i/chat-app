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
    const newSocket = io("http://localhost:4000", {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = newSocket;

    newSocket.on("connect", () => {
      setSocket(newSocket);
    });

    newSocket.on("disconnect", (reason) => {
      setSocket(null);
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