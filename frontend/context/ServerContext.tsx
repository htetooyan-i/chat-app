"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Server } from "@/types/Server";
import type { ServerInvite } from "@/types/ServerInvite";
import { useSocket } from "@/hooks/useSocket";

type ServerContextType = {
  servers: Server[];
  loading: boolean;
  refreshServers: () => Promise<Server[]>;
  createServer: (serverName: string) => Promise<string>;
  joinServer: (inviteCode: string) => Promise<void>;
  updateServer: (data: Partial<Server>) => Promise<void>;
  deleteServer: () => Promise<void>;
  leaveServer: (selectedServerId: number) => Promise<void>;
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

    const handleChangedServerName = (data: {serverId: number, name: string}) => {
      setServers(prev => prev.map(server => server.id === data.serverId ? { ...server, name: data.name } : server));
    }

    socket.on("serverNameChanged", handleChangedServerName);

    return () => {
      socket.off("serverNameChanged");
    }
  }, [serverId, socket]);

  const refreshServers = async () => await fetchServers();

  const createServer = async (serverName: string): Promise<string> => {
    const res = await api.post('/servers', { name: serverName });
    const inviteRes = await api.post(`/servers/${res.data.server.id}/invites`);
    setServers(prev => [...prev, res.data.server]);
    await refreshServers();
    console.log("INVITE DATA: ", inviteRes.data);
    return inviteRes.data.code;
  }

  const joinServer = async (inviteCode: string) => {

      await api.post(`/invites/${inviteCode}`);
      await refreshServers();
  };

  const updateServer = async (data: Partial<Server>) => {
    await api.patch(`/servers/${serverId}`, {name: data.name});
    setServers(prev => prev.map(s => s.id === serverId ? { ...s, ...data } : s));
    await refreshServers();
  };

  const deleteServer = async () => {
    await api.delete(`/servers/${serverId}`);
    setServers(prev => prev.filter(s => s.id !== serverId))
    await refreshServers(); // sync with backend in background
  };

  const leaveServer = async (selectedServerId: number) => {
    await api.delete(`/servers/${selectedServerId}/leave`);
    setServers(prev => prev.filter(s => s.id !== selectedServerId))
    await refreshServers();
  };

  return (
    <ServerContext.Provider value={{ servers, loading, refreshServers, createServer, joinServer, updateServer, deleteServer, leaveServer }}>
      {children}
    </ServerContext.Provider>
  );
};