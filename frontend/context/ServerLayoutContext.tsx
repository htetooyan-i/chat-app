"use client";

import { createContext, useState } from "react";

type ServerLayoutContextType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ServerLayoutContext = createContext<ServerLayoutContextType | null>(null);

export const ServerLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <ServerLayoutContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </ServerLayoutContext.Provider>
  );
};