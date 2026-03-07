import { useContext } from "react";

import { ServerMemberContext } from "@/context/ServerMemberContext";

export const useServerMember = () => {
    const context = useContext(ServerMemberContext);
    if (!context) {
        throw new Error("useServerMember must be used within a ServerMemberProvider");
    }
    return context;
};