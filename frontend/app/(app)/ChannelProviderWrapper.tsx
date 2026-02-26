"use client";
import { useParams } from "next/navigation";
import { ChannelProvider } from "@/context/ChannelContext";

export const ChannelProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { serverId } = useParams();
  const id = typeof serverId === "string" ? serverId : null;
  return <ChannelProvider serverId={id}>{children}</ChannelProvider>;
};
