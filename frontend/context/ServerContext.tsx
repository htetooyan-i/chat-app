"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Server } from "@/types/Server";
import { useSocket } from "@/hooks/useSocket";

type ServerContextType = {
  servers: Server[];
  loading: boolean;
  refreshServers: () => Promise<Server[]>;
  createServer: (serverName: string, avatarUrl: string) => Promise<string>;
  joinServer: (inviteCode: string) => Promise<void>;
  updateServer: (data: Partial<Server>) => Promise<void>;
  deleteServer: () => Promise<void>;
  leaveServer: (selectedServerId: number) => Promise<void>;
  deleteAvatar: () => Promise<void>;
};

export const ServerContext = createContext<ServerContextType | undefined>(undefined);
  
export const ServerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { user, loading: authLoading } = useAuth();
  const { socket } = useSocket();

  const params = useParams();
  const serverId = Array.isArray(params.serverId) ? Number(params.serverId[0]) : Number(params.serverId);
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(false);


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

  useEffect(() => {
    if (!socket || !serverId) return;

    const handleChangedServerProfile = (data: {serverId: number, name: string, avatarUrl: string}) => {
      setServers(prev => prev.map(server => server.id === data.serverId ? { ...server, name: data.name, avatarUrl: data.avatarUrl } : server));
    }

    socket.on("serverProfileChanged", handleChangedServerProfile);

    return () => {
      socket.off("serverProfileChanged");
    }
  }, [serverId, socket]);

  const refreshServers = async () => await fetchServers();

  const createServer = async (serverName: string, avatarUrl: string): Promise<string> => {
    const res = await api.post('/servers', { name: serverName, avatarUrl });
    const inviteRes = await api.post(`/servers/${res.data.server.id}/invites`);
    setServers(prev => [...prev, res.data.server]);
    await refreshServers();
    return inviteRes.data.code;
  }

  const joinServer = async (inviteCode: string) => {

      await api.post(`/invites/${inviteCode}`);
      await refreshServers();
  };

  const updateServer = async (data: Partial<Server>) => {
    setServers(prev => prev.map(s => s.id === serverId ? { ...s, ...data } : s));
    try {
      await api.patch(`/servers/${serverId}`, {name: data.name, avatarUrl: data.avatarUrl});
    } catch (error) {
      await refreshServers();
      throw error;
    }
  };

  const deleteServer = async () => {
    setServers(prev => prev.filter(s => s.id !== serverId))
    try {
      await api.delete(`/servers/${serverId}`);
    } catch (e) {
      await refreshServers(); // sync with the backend in the background
      throw e;
    }
  };

  const leaveServer = async (selectedServerId: number) => {
    setServers(prev => prev.filter(s => s.id !== selectedServerId))
    try {
      await api.delete(`/servers/${selectedServerId}/leave`);
    } catch (e) {
      await refreshServers();
      throw e;
    }
  };

  const deleteAvatar = async ()=> {
    setServers(prev => prev.map(s => s.id == serverId ? { ...s, avatarUrl: null} : s));

    try {
      await api.delete(`/servers/${serverId}/avatar`);
    } catch (e) {
      await refreshServers();
      throw e;
    }
  }

  return (
    <ServerContext.Provider value={{ servers, loading, refreshServers, createServer, joinServer, updateServer, deleteServer, leaveServer, deleteAvatar }}>
      {children}
    </ServerContext.Provider>
  );
};