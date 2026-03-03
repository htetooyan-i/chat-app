"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import api from "@/lib/api";
import { useServer } from "@/hooks/useServer";

export type Channel = {
  id: string;
  name: string;
  type: "text" | "voice";
};

type ChannelContextType = {
  channels: Channel[];
  channelsByServer: Record<string, Channel[]>;
  addChannel: (channel: Channel) => void;
  refreshChannels: () => Promise<void>;
  clearServerCache: (serverId: string) => void;
  loading: boolean;
};

type ChannelProviderProps = {
  children: React.ReactNode;
  serverId?: string | null;
};

export const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider: React.FC<ChannelProviderProps> = ({ children, serverId }) => {
    const [channelsByServer, setChannelsByServer] = useState<Record<string, Channel[]>>({});
    const [loading, setLoading] = useState(false);
    const { loading: serverLoading } = useServer();

    const channels = channelsByServer[serverId ?? ""] ?? [];

    // Fetch channels for the selected server
    const fetchChannels = useCallback(async () => {
        if (!serverId) return;

        try {
        setLoading(true);
        const res = await api.get(`/servers/${serverId}/channels`);
        setChannelsByServer(prev => ({ ...prev, [serverId]: res.data }));
        } catch (err) {
        console.error("Error fetching channels:", err);
        } finally {
        setLoading(false);
        }
    }, [serverId]);

    useEffect(() => {
      if (serverLoading) return; // Wait for servers to load first
      if (!serverId) return;
      if (channelsByServer[serverId]) return;
      fetchChannels();
    }, [serverId]);


    const addChannel = (channel: Channel) => {
      if (!serverId) return;
      setChannelsByServer(prev => ({
        ...prev,
        [serverId]: [...(prev[serverId] ?? []), channel],
      }));
    };

    const clearServerCache = useCallback((id: string) => {
      setChannelsByServer(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, []);

    const refreshChannels = async () => await fetchChannels();


    return (
        <ChannelContext.Provider value={{ channels, channelsByServer, addChannel, refreshChannels, clearServerCache, loading }}>
        {children}
        </ChannelContext.Provider>
    );
};
