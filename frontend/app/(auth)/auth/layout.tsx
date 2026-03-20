import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Auth",
    template: "%s | Auth | Konyat",
  },
  description: "Layout wrapper for auth pages",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
