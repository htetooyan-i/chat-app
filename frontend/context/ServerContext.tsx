"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';

type Server = {
  id: string;
  name: string;
  icon?: string;
};

type ServerContextType = {
  servers: Server[];
  selectedServer: Server | null;
  setServers: React.Dispatch<React.SetStateAction<Server[]>>;
  setSelectedServer: React.Dispatch<React.SetStateAction<Server | null>>;
  addServer: (server: Server) => void;
  refreshServers: () => void;
};

export const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const { user } = useAuth();

  const fetchServers = useCallback(async () => {
    try {
      const res = await api.get('/servers/my-servers'); 
      const data = res.data;
      setServers(data.data);
      setSelectedServer(data.data[0] || null);
    } catch (error) {
      console.error('Error fetching servers:', error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchServers();
    }
  }, [fetchServers, user]);

  const addServer = (server: Server) => {
    setServers(prev => [...prev, server]);
  };

  const refreshServers = useCallback(() => {
    fetchServers();
  }, [fetchServers]);

  return (
    <ServerContext.Provider value={{ servers, setServers, addServer, refreshServers, selectedServer, setSelectedServer }}>
      {children}
    </ServerContext.Provider>
  );
};

