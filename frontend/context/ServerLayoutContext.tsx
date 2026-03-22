"use client";

import { createContext, useState } from "react";

type ServerLayoutContextType = {
  panelCollapsed: boolean;
  setPanelCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  settingTabCollapsed: boolean;
  setSettingTabCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ServerLayoutContext = createContext<ServerLayoutContextType | null>(null);

export const ServerLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ panelCollapsed, setPanelCollapsed ] = useState(true);
  const [ settingTabCollapsed, setSettingTabCollapsed ] = useState(true);

  return (
    <ServerLayoutContext.Provider value={{ panelCollapsed, setPanelCollapsed, settingTabCollapsed, setSettingTabCollapsed }}>
      {children}
    </ServerLayoutContext.Provider>
  );
};