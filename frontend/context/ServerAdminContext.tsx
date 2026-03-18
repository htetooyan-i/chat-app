"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {api, getErrorMessage} from "@/lib/api";
import { useSocket } from "@/hooks/useSocket";

import type {GetServerInviteResponse, GetServerInvitesResponse, ServerInvite} from "@/types/ServerInvite";
import type {GetServerBanResponse, ServerBan} from "@/types/ServerBan";

type ServerAdminContextType = {
    invites: ServerInvite[];
    inviteLoading: boolean;
    refreshInvites: () => Promise<void>;
    revokeInvite: (inviteId: number) => Promise<void>;
    createInvite: (expireAfter: string, maxUses: string) => Promise<ServerInvite>;

    bans: ServerBan[];
    banLoading: boolean;
    refreshBans: () => Promise<void>;
    revokeBan: (banId: number) => Promise<void>;
    decidePendingBan: (decision: "ACCEPTED" | "REJECTED", banId: number, bannedUserId: number, duration?: string) => Promise<void>;
    deleteBan: (banId: number) => Promise<void>;
};

export const ServerAdminContext = createContext<ServerAdminContextType | undefined>(undefined);
  
export const ServerAdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { socket } = useSocket();

    const params = useParams();
    const serverId = Array.isArray(params.serverId) ? Number(params.serverId[0]) : Number(params.serverId);

    const [ invites, setInvites ] = useState<ServerInvite[]>([]);
    const [ bans, setBans ] = useState<ServerBan[]>([]);
    const [ inviteLoading, setInviteLoading ] = useState(false);
    const [ banLoading, setBanLoading ] = useState(false); 

    // ** INVITES **
    const fetchInvites = useCallback(async () => {
        try {
            setInviteLoading(true);
            const res: GetServerInvitesResponse = await api.get(`/servers/${serverId}/invites/`).then(res => res.data);
            setInvites(res.data);
        } catch (error) {
            getErrorMessage(error, "Failed to fetch invite codes.")
            console.error("Error fetching invite codes:", error);
        } finally {
            setInviteLoading(false);
        }
    }, [serverId]);

    useEffect(() => {
        if (!serverId) return;
        fetchInvites();
    }, [fetchInvites, serverId]);


    const refreshInvites = async () => await fetchInvites();

    const createInvite = async (expireAfter: string, maxUses: string): Promise<ServerInvite> => {
        const res: GetServerInviteResponse = await api.post(`/servers/${serverId}/invites`, {
            expiresInMinutes: expireAfter === "never" ? null : parseInt(expireAfter) * 24 * 60, // Convert days to minutes
            maxUses: maxUses === "No Limit" ? null : parseInt(maxUses),
        }).then(res => res.data);
        await refreshInvites();
        return res.data;
    }

    const revokeInvite = async (inviteId: number) => {
        setInvites(prev => prev.filter(invite => invite.id !== inviteId));

        try {
            await api.delete(`/servers/${serverId}/invites/${inviteId}`);
        } catch (error) {
            await fetchInvites();
            throw getErrorMessage(error, "Failed to revoke invite.");
        }

    }

    // ** INVITE SOCKET LOGICS

    useEffect(() => {
        if (!serverId || !socket) return;

        const handleReceivedNewInvite = (invite: ServerInvite) => {
            setInvites(prev => [...prev, invite]);
        }
        // TODO: Currently, this socket is only for current uses counter
        const handleUpdatedInvite = (data: {inviteId: number, newCount: number}) => {
            setInvites(prev => prev.map(invite => invite.id === data.inviteId ? { ...invite, currentUses: data.newCount } : invite));
        }

        const handleDeletedInvite = (inviteId: number) => {
            setInvites(prev => prev.filter(invite => invite.id !== inviteId));
        }

        socket.on("receivedNewInvite", handleReceivedNewInvite);
        socket.on("inviteUpdated", handleUpdatedInvite);
        socket.on("inviteDeleted", handleDeletedInvite);

        return () => {
            socket.off("receivedNewInvite");
            socket.off("inviteUpdated");
            socket.off("inviteDeleted");
        }
    }, [socket, serverId]);

    // ** BANS **
    const fetchBans = useCallback(async () => {
        try {
            setBanLoading(true);
            const res: GetServerBanResponse = await api.get(`/servers/${serverId}/bans`).then(res => res.data);
            setBans(res.data);
        } catch (error) {
            throw getErrorMessage(error, "Failed to fetch bans.")
        } finally {
            setBanLoading(false);
        }
    }, [serverId]);

    useEffect(() => {
        if (!serverId) return;
        fetchBans();
    }, [fetchBans, serverId]);

    const refreshBans = async () => fetchBans();

    const revokeBan = async (banId: number) => {
        setBans(prev => prev.map(ban => ban.id === banId ? { ...ban, appealStatus: "REVOKED", revokedAt: new Date() } : ban));
        try {
            await api.patch(`/servers/${serverId}/bans/${banId}/revoke`);
        } catch (error) {
            await refreshBans();
            throw getErrorMessage(error, "Failed to revoke ban.");
        }
    };

    const decidePendingBan = async (decision: "ACCEPTED" | "REJECTED", banId: number, bannedUserId: number, duration?: string) => {

        setBans(prev => prev.map(ban => {
            if (ban.id === banId) {
                return {
                    ...ban,
                    appealStatus: decision,
                    expiresAt:
                        decision === "ACCEPTED"
                            ? !duration || duration === "permanent"
                                ? undefined
                                : new Date(Date.now() + Number(duration) * 24 * 60 * 60 * 1000)
                            : ban.expiresAt,
                };
            }

            if (decision === "ACCEPTED" && ban.userId === bannedUserId && ban.appealStatus === "PENDING") {
                return { ...ban, appealStatus: "SUPERSEDED" };
            }

            return ban;
        }));

        try {
            await api.patch(`/servers/${serverId}/bans/${banId}/review`, { decision, duration: duration === "permanent" ? null : Number(duration) });
        } catch (error) {
            console.error("Error deciding appeal:", error);
            await refreshBans();
            throw getErrorMessage(error, "Failed to decide appeal.");
        }
    };

    const deleteBan = async (banId: number) => {
        setBans(prev => prev.filter(ban => ban.id !== banId));
        try {
            await api.delete(`/servers/${serverId}/bans/${banId}`);
        } catch (error) {
            await refreshBans();
            throw getErrorMessage(error, "Failed to delete ban.");
        }
    }

    // ** BAN SOCKET LOGICS

    useEffect(() => {
        if (!serverId || !socket) return;

        const handleReceivedBan = (ban: ServerBan) => {
            setBans(prev => [...prev, ban]);
        }

        const handleUpdatedBan = (data: { banId: number; decision: string, bannedUserId: number }) => {
            setBans(prev => prev.map(ban => {
                if (ban.id === data.banId) {
                    return { ...ban, appealStatus: data.decision } as ServerBan;
                }

                if (data.decision === "ACCEPTED" && ban.userId === data.bannedUserId && ban.appealStatus === "PENDING") {
                    return { ...ban, appealStatus: "SUPERSEDED" };
                }

                return ban;
            }));
        };

        const handleDeletedBan = (data: {banId: number}) => {
            setBans(prev => prev.filter(ban => ban.id !== data.banId));
        }

        socket.on("receivedNewBan", handleReceivedBan);
        socket.on("banUpdated", handleUpdatedBan);
        socket.on("banDeleted", handleDeletedBan);

        return () => {
            socket.off("receivedNewBan");
            socket.off("banUpdated");
            socket.off("banDeleted");

        }
    }, [socket, serverId]);

    return (
        <ServerAdminContext.Provider value={{ invites, inviteLoading, refreshInvites, revokeInvite, createInvite, bans, banLoading, refreshBans, revokeBan, decidePendingBan, deleteBan }}>
        {children}
        </ServerAdminContext.Provider>
    );
};