import { useContext } from "react";
import { UserSettingLayoutContext } from "@/context/UserSettingLayoutContext";

export function useUserSettingLayout() {
  const context = useContext(UserSettingLayoutContext);
  if (!context) {
    throw new Error("useUserSettingLayout must be used inside UserSettingLayoutProvider");
  }
  return context;
}