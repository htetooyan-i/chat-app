import React from "react";

import { ServerLayoutProvider } from "@/context/ServerLayoutContext";
import { ServerMemberProvider } from "@/context/ServerMemberContext";
import { ServerAdminProvider } from "@/context/ServerAdminContext";

export default function ServerLayout({ children }: { children: React.ReactNode }) {
    return (
        <ServerLayoutProvider>
            <ServerMemberProvider>
                <ServerAdminProvider>
                    {children}
                </ServerAdminProvider>
            </ServerMemberProvider>
        </ServerLayoutProvider>
    );
}
