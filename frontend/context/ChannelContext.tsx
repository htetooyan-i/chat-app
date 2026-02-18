"use client";
import React, { createContext, useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { useServer } from '@/hooks/useServer';

type Channel = {
  id: string;
  name: string;
  type: 'text' | 'voice';
};

type ChannelContextType = {
  channels: Channel[];
  selectedChannel: Channel | null;
  setChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
  setSelectedChannel: React.Dispatch<React.SetStateAction<Channel | null>>;
  addChannel: (channel: Channel) => void;
  refreshChannels: () => void;
};

export const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const { selectedServer } = useServer();

    const fetchChannels = useCallback(async () => {
        if (!selectedServer?.id) return;

        try {
            const res = await api.get(`/servers/${selectedServer?.id}/channels`); 
            const data = res.data;
            console.log('Fetched channels:', data);
            setChannels(data);

        } catch (error) {
            console.error('Error fetching channels:', error);
        }
        
    }, [selectedServer?.id]);

    useEffect(() => {
        if (!selectedServer?.id) return;
        fetchChannels();
    }, [fetchChannels]);

    useEffect(() => {
        setChannels([]);
        setSelectedChannel(null);
    }, [selectedServer?.id]);



    const addChannel = (channel: Channel) => {
        setChannels(prev => [...prev, channel]);
    };

    const refreshChannels = useCallback(() => {
        fetchChannels();
    }, [fetchChannels]);

    return (
        <ChannelContext.Provider value={{ channels, setChannels, addChannel, refreshChannels, selectedChannel, setSelectedChannel }}>
        {children}
        </ChannelContext.Provider>
    );
};

