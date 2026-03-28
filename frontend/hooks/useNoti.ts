import { useContext } from "react";

import { NotificationContext } from "@/context/NotificationContext";

export const useNofi = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNofi must be used within NotificationProvider");
  return ctx;
};
