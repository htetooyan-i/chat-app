import { useContext } from "react";
import { ServerLayoutContext } from "@/context/ServerLayoutContext";

export function useServerLayout() {
  const context = useContext(ServerLayoutContext);
  if (!context) {
    throw new Error("useServerLayout must be used inside ServerLayoutProvider");
  }
  return context;
}