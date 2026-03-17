"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { api } from "@/lib/api";
import { useServer } from "@/hooks/useServer";
import { Channel } from "@/types/Channel";
import { useSocket } from "@/hooks/useSocket";

type ChannelContextType = {
  channels: Channel[];
  channelsByServer: Record<string, Channel[]>;

  addChannel: (channel: Channel) => void;
  refreshChannels: () => Promise<void>;
  clearServerCache: (serverId: number) => void;

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

    const { socket } = useSocket();

    const params = useParams();
    const serverId = Array.isArray(params.serverId)
                    ? Number(params.serverId[0])
                    : Number(params.serverId);
    const channelId = Array.isArray(params.channelId)
                    ? Number(params.channelId[0])
                    : Number(params.channelId);

    const [channelsByServer, setChannelsByServer] = useState<Record<number, Channel[]>>({});
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
        if (serverLoading || !serverId || channelsByServer[serverId]) return;

        fetchChannels();

    }, [fetchChannels, serverId, serverLoading, channelsByServer]);

    useEffect(() => {
        if (!socket || !channelId) return;

        const handleUpdatedChannel = (channel: Channel) => {
            setChannelsByServer(prev => ({
                ...prev,
                [serverId]: prev[serverId].map(c =>
                    c.id === channel.id ? channel : c
                ),
            }));
        };

        const handleDeletedChannel = (channelId: number) => {
            setChannelsByServer(prev => ({
                ...prev,
                [serverId]: prev[serverId].filter(c  => c.id !== channelId),
            }));
        }

        socket.emit("joinChannel", channelId);
        socket.on("receivedNewChannel", addChannel);
        socket.on("channelUpdated", handleUpdatedChannel);
        socket.on("channelDeleted", handleDeletedChannel);

        return () => {
            socket.emit("leaveChannel", channelId);
            socket.off("receivedNewChannel");
            socket.off("channelUpdated");
            socket.off("channelDeleted");
        }
    }, [channelId, socket]);

    const addChannel = (channel: Channel) => {
      if (!serverId) return;

      setChannelsByServer(prev => ({
        ...prev,
        [serverId]: [...(prev[serverId] ?? []), channel],
      }));
    };

    const clearServerCache = useCallback((id: number) => {
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
        channelsByServer[serverId] = [...channelsByServer[serverId], res.data];
        return res.data;
    };

    const editChannelName = async (newName: string) => {
      if (!serverId || !channelId) return;
      await api.patch(`/servers/${serverId}/channels/${channelId}`, { newName });
      channelsByServer[serverId] = channelsByServer[serverId].map(channel => channel.id !== Number(channelId) ? channel : { ...channel, name: newName });
      await refreshChannels();
    };

    const deleteChannel = async () => {
      if (!serverId || !channelId) return;
      await api.delete(`/servers/${serverId}/channels/${channelId}`);
      channelsByServer[serverId] = channelsByServer[serverId].filter(channel => channel.id !== Number(channelId));
      await refreshChannels();
    };

    return (
        <ChannelContext.Provider value={{ channels, channelsByServer, addChannel, refreshChannels, clearServerCache, loading, createChannel, editChannelName, deleteChannel }}>
        {children}
        </ChannelContext.Provider>
    );
};
