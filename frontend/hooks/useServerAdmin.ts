import { useContext } from "react";

import { ServerAdminContext } from "@/context/ServerAdminContext";

export const useServerAdmin = () => {
    const context = useContext(ServerAdminContext);
    if (!context) {
        throw new Error("useServerAdmin must be used within a ServerAdminProvider");
    }
    return context;
};