"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import api from "@/lib/api";
import { useServer } from "@/hooks/useServer";
import { Channel } from "@/types/Channel";

type ChannelContextType = {
  channels: Channel[];
  channelsByServer: Record<string, Channel[]>;

  addChannel: (channel: Channel) => void;
  refreshChannels: () => Promise<void>;
  clearServerCache: (serverId: string) => void;

  createChannel: (channelName: string) => Promise<Channel | null>;
  editChannelName: (newName: string) => Promise<void>;
  deleteChannel: () => Promise<void>;

  loading: boolean;
};

type ChannelProviderProps = {
  children: React.ReactNode;
};

export const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider: React.FC<ChannelProviderProps> = ({ children }) => {

    const router = useRouter();
    const params = useParams();
    const serverId = Array.isArray(params.serverId)
                    ? params.serverId[0]
                    : params.serverId;
    const channelId = Array.isArray(params.channelId)
                    ? params.channelId[0]
                    : params.channelId;

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

    const createChannel = async (channelName: string): Promise<Channel | null> => {
        if (!serverId) return null;

        const res = await api.post(
            `/servers/${serverId}/channels`,
            { name: channelName }
        );

        const newChannel = res.data;

        setChannelsByServer(prev => ({
            ...prev,
            [serverId]: [...(prev[serverId] ?? []), newChannel],
        }));

        return newChannel;
    };

    const editChannelName = async (newName: string) => {
      if (!serverId || !channelId) return;
      await api.patch(`/servers/${serverId}/channels/${channelId}`, { newName });
      channelsByServer[serverId as string] = channelsByServer[serverId as string].map(channel => channel.id !== Number(channelId as string) ? channel : { ...channel, name: newName });
      refreshChannels();
    };

    const deleteChannel = async () => {
      if (!serverId || !channelId) return;
      await api.delete(`/servers/${serverId}/channels/${channelId}`);
      channelsByServer[serverId as string] = channelsByServer[serverId as string].filter(channel => channel.id !== Number(channelId as string));
      refreshChannels();
    };

    return (
        <ChannelContext.Provider value={{ channels, channelsByServer, addChannel, refreshChannels, clearServerCache, loading, createChannel, editChannelName, deleteChannel }}>
        {children}
        </ChannelContext.Provider>
    );
};
