"use client";

import { createContext, useContext } from "react";

type ServerLayoutContextType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  showUserSettings: boolean;
  setShowUserSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ServerLayoutContext = createContext<ServerLayoutContextType | null>(null);


