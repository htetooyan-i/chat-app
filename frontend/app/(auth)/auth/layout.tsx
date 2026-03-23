import React from 'react';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register or Sign In",
  description: "Sign in or create an account to start chatting with your friends and communities in real time.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
