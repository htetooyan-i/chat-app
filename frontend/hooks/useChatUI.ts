import { useContext } from "react";
import { ChatUIContext } from "@/context/ChatUIContext";

export const useChatUI = () => {
    const context = useContext(ChatUIContext);
    if (!context) {
        throw new Error("useChatUI must be used within a ChatUIProvider");
    }
    return context;
};