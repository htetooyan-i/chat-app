import React from 'react';
import { UserSettingsProvider } from "@/context/UserSettingLayoutContext";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Settings",
    template: "%s | Settings | Chat App",
  },
  description: "Layout wrapper for settings pages",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {

    return (
        <UserSettingsProvider>
        {children}
        </UserSettingsProvider>
    );
}
