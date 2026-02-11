"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="background-red-500">
      <h1>{isAuthenticated ? `Welcome back, ${user?.username}!` : "Welcome to the Chat App!"}</h1>
      <button onClick={logout}>Logout</button>
    </div>

  );
}
