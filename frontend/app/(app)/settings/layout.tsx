import React from 'react';
import { UserSettingsProvider } from "@/context/UserSettingLayoutContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {

    return (
        <UserSettingsProvider>
        {children}
        </UserSettingsProvider>
    );
}
