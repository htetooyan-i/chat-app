"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";

export type Server = {
  id: string;
  name: string;
  icon?: string;
  memberCount: number;
  createdAt: string;
};

type ServerContextType = {
  servers: Server[];
  loading: boolean;
  refreshServers: () => Promise<Server[]>;
  addServer: (server: Server) => void;
  updateServer: (id: string, data: Partial<Server>) => void;
  removeServer: (id: string) => void;
};

export const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const fetchServers = useCallback(async (): Promise<Server[]> => {
    try {
      setLoading(true);
      const res = await api.get("/servers/my-servers");
      const data = res.data.data;
      setServers(data);
      return data;
    } catch (error) {
      console.error("Error fetching servers:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish loading

    if (user) {
      fetchServers();
    } else {
      setServers([]);
    }
  }, [user, authLoading, fetchServers]);

  const addServer = (server: Server) => {
    setServers(prev => [...prev, server]);
  };

  const removeServer = (id: string) => {
    setServers(prev => prev.filter(s => s.id !== id));
  };

  const updateServer = (id: string, data: Partial<Server>) => {
    setServers(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  return (
    <ServerContext.Provider value={{ servers, loading, refreshServers: fetchServers, addServer, updateServer, removeServer }}>
      {children}
    </ServerContext.Provider>
  );
};