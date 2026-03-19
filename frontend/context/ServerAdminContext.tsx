"use client";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { api, getErrorMessage } from "@/lib/api";
import { useSocket } from "@/hooks/useSocket";

import type { GetServerInviteResponse, GetServerInvitesResponse, ServerInvite } from "@/types/ServerInvite";
import type { GetServerBanResponse, ServerBan } from "@/types/ServerBan";

type ServerAdminContextType = {
    invites: ServerInvite[] | null;
    inviteLoading: boolean;
    fetchInvites: (serverId: number) => Promise<void>;
    refreshInvites: (serverId?: number) => Promise<void>;
    revokeInvite: (inviteId: number) => Promise<void>;
    createInvite: (expireAfter: string, maxUses: string) => Promise<ServerInvite>;

    bans: ServerBan[] | null;
    banLoading: boolean;
    fetchBans: (serverId: number) => Promise<void>;
    refreshBans: (serverId?: number) => Promise<void>;
    revokeBan: (banId: number) => Promise<void>;
    decidePendingBan: (
        decision: "ACCEPTED" | "REJECTED",
        banId: number,
        bannedUserId: number,
        duration?: string
    ) => Promise<void>;
    deleteBan: (banId: number) => Promise<void>;

    setPreviewServerId: (id: number | null) => void;
    clearPreviewServer: () => void;
};

export const ServerAdminContext = createContext<ServerAdminContextType | undefined>(undefined);

export const ServerAdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { socket } = useSocket();
    const params = useParams();
    const serverIdParam = Array.isArray(params.serverId) ? params.serverId[0] : params.serverId;
    const serverId = serverIdParam ? Number(serverIdParam) : null;

    const [previewServerId, setPreviewServerId] = useState<number | null>(null);
    const activeServerId = previewServerId ?? serverId;

    const [invitesByServer, setInvitesByServer] = useState<Record<number, ServerInvite[] | null>>({});
    const [bansByServer, setBansByServer] = useState<Record<number, ServerBan[] | null>>({});
    const [inviteLoadingByServer, setInviteLoadingByServer] = useState<Record<number, boolean>>({});
    const [banLoadingByServer, setBanLoadingByServer] = useState<Record<number, boolean>>({});
    const [hasFetchedInvitesByServer, setHasFetchedInvitesByServer] = useState<Record<number, boolean>>({});
    const [hasFetchedBansByServer, setHasFetchedBansByServer] = useState<Record<number, boolean>>({});

    const invites = useMemo(() => {
        if (!activeServerId) return null;
        return invitesByServer[activeServerId] ?? null;
    }, [activeServerId, invitesByServer]);

    const bans = useMemo(() => {
        if (!activeServerId) return null;
        return bansByServer[activeServerId] ?? null;
    }, [activeServerId, bansByServer]);

    const inviteLoading = activeServerId ? inviteLoadingByServer[activeServerId] : false;
    const banLoading = activeServerId ? banLoadingByServer[activeServerId] : false;

    const fetchInvites = useCallback(async (targetServerId: number) => {
        if (!targetServerId) return;

        setInviteLoadingByServer(prev => ({ ...prev, [targetServerId]: true }));

        try {
            const res: GetServerInvitesResponse = await api
                .get(`/servers/${targetServerId}/invites/`)
                .then(r => r.data);

            setInvitesByServer(prev => ({
                ...prev,
                [targetServerId]: res.data,
            }));
            setHasFetchedInvitesByServer(prev => ({
                ...prev,
                [targetServerId]: true,
            }));
        } catch (error) {
            getErrorMessage(error, "Failed to fetch invite codes.");
        } finally {
            setInviteLoadingByServer(prev => ({ ...prev, [targetServerId]: false }));
        }
    }, []);

    const refreshInvites = useCallback(async (serverId?: number) => {
        const targetServerId = serverId ?? activeServerId;
        if (!targetServerId) return;
        await fetchInvites(targetServerId);
    }, [activeServerId, fetchInvites]);

    const createInvite = useCallback(async (expireAfter: string, maxUses: string) => {
        if (!activeServerId) throw new Error("Server ID not available");

        const res: GetServerInviteResponse = await api.post(`/servers/${activeServerId}/invites`, {
            expiresInMinutes: expireAfter === "never" ? null : parseInt(expireAfter) * 24 * 60,
            maxUses: maxUses === "No Limit" ? null : parseInt(maxUses),
        }).then(r => r.data);

        return res.data;
    }, [activeServerId]);

    const revokeInvite = useCallback(async (inviteId: number) => {
        if (!activeServerId) throw new Error("Server ID not available");

        setInvitesByServer(prev => ({
            ...prev,
            [activeServerId]: (prev[activeServerId] ?? []).filter(i => i.id !== inviteId),
        }));

        try {
            await api.delete(`/servers/${activeServerId}/invites/${inviteId}`);
        } catch (error) {
            await fetchInvites(activeServerId);
            throw getErrorMessage(error, "Failed to revoke invite.");
        }
    }, [activeServerId, fetchInvites]);

    const fetchBans = useCallback(async (targetServerId: number) => {
        if (!targetServerId) return;

        setBanLoadingByServer(prev => ({ ...prev, [targetServerId]: true }));

        try {
            const res: GetServerBanResponse = await api
                .get(`/servers/${targetServerId}/bans`)
                .then(r => r.data);

            setBansByServer(prev => ({
                ...prev,
                [targetServerId]: res.data,
            }));
            setHasFetchedBansByServer(prev => ({
                ...prev,
                [targetServerId]: true,
            }));
        } catch (error) {
            getErrorMessage(error, "Failed to fetch bans.");
        } finally {
            setBanLoadingByServer(prev => ({ ...prev, [targetServerId]: false }));
        }
    }, []);

    const refreshBans = useCallback(async (serverId?: number) => {
        const targetServerId = serverId ?? activeServerId;
        if (!targetServerId) return;
        await fetchBans(targetServerId);
    }, [activeServerId, fetchBans]);

    const revokeBan = useCallback(async (banId: number) => {
        if (!activeServerId) throw new Error("Server ID not available");

        setBansByServer(prev => ({
            ...prev,
            [activeServerId]: (prev[activeServerId] ?? []).map(b =>
                b.id === banId ? { ...b, appealStatus: "REVOKED" } : b
            ),
        }));

        try {
            await api.patch(`/servers/${activeServerId}/bans/${banId}/revoke`);
        } catch (error) {
            await fetchBans(activeServerId);
            throw getErrorMessage(error, "Failed to revoke ban.");
        }
    }, [activeServerId, fetchBans]);

    const decidePendingBan = useCallback(async (
        decision: "ACCEPTED" | "REJECTED",
        banId: number,
        bannedUserId: number,
        duration?: string
    ) => {
        if (!activeServerId) throw new Error("Server ID not available");

        setBansByServer(prev => ({
            ...prev,
            [activeServerId]: (prev[activeServerId] ?? []).map(b => {
                if (b.id === banId) return { ...b, appealStatus: decision };
                if (decision === "ACCEPTED" && b.userId === bannedUserId && b.appealStatus === "PENDING") {
                    return { ...b, appealStatus: "SUPERSEDED" };
                }
                return b;
            }),
        }));

        try {
            await api.patch(`/servers/${activeServerId}/bans/${banId}/review`, {
                decision,
                duration: duration === "permanent" ? null : Number(duration),
            });
        } catch (error) {
            await fetchBans(activeServerId);
            throw getErrorMessage(error, "Failed to decide appeal.");
        }
    }, [activeServerId, fetchBans]);

    const deleteBan = useCallback(async (banId: number) => {
        if (!activeServerId) throw new Error("Server ID not available");

        setBansByServer(prev => ({
            ...prev,
            [activeServerId]: (prev[activeServerId] ?? []).filter(b => b.id !== banId),
        }));

        try {
            await api.delete(`/servers/${activeServerId}/bans/${banId}`);
        } catch (error) {
            await fetchBans(activeServerId);
            throw getErrorMessage(error, "Failed to delete ban.");
        }
    }, [activeServerId, fetchBans]);

    // ***** Socket listeners for real-time updates *****
    useEffect(() => {
        if (!socket || !activeServerId) return;

        const receivedNewInvite = (invite: ServerInvite) => {
            setInvitesByServer(prev => ({
                ...prev,
                [activeServerId]: [...(prev[activeServerId] ?? []), invite],
            }));
        };

        const inviteUpdated = (data: { inviteId: number; newCount: number }) => {
            setInvitesByServer(prev => ({
                ...prev,
                [activeServerId]: (prev[activeServerId] ?? []).map(i =>
                    i.id === data.inviteId ? { ...i, currentUses: data.newCount } : i
                ),
            }));
        };

        const inviteDeleted = (inviteId: number) => {
            setInvitesByServer(prev => ({
                ...prev,
                [activeServerId]: (prev[activeServerId] ?? []).filter(i => i.id !== inviteId),
            }));
        };

        const receivedNewBan = (ban: ServerBan) => {
            setBansByServer(prev => ({
                ...prev,
                [activeServerId]: [...(prev[activeServerId] ?? []), ban],
            }));
        };

        const banUpdated = (data: { banId: number; decision: string, bannedUserId: number }) => {
            const newStatus = data.decision as ServerBan["appealStatus"];
            setBansByServer(prev => ({
                ...prev,
                [activeServerId]: (prev[activeServerId] ?? []).map(b =>{
                    if (b.id === data.banId) return { ...b, appealStatus: newStatus };
                    if (data.decision === "ACCEPTED" && b.userId === data.bannedUserId && b.appealStatus === "PENDING") {
                        return { ...b, appealStatus: "SUPERSEDED" };
                    }
                    return b;
                }),
            }));
        };

        const banDeleted = ({ banId }: { banId: number }) => {
            setBansByServer(prev => ({
                ...prev,
                [activeServerId]: (prev[activeServerId] ?? []).filter(b => b.id !== banId),
            }));
        };

        socket.on("receivedNewInvite", receivedNewInvite);
        socket.on("inviteUpdated", inviteUpdated);
        socket.on("inviteDeleted", inviteDeleted);

        socket.on("receivedNewBan", receivedNewBan);
        socket.on("banUpdated", banUpdated);
        socket.on("banDeleted", banDeleted);

        if (!hasFetchedInvitesByServer[activeServerId]) {
            fetchInvites(activeServerId);
        }
        if (!hasFetchedBansByServer[activeServerId]) {
            fetchBans(activeServerId);
        }

        return () => {
            socket.off("receivedNewInvite", receivedNewInvite);
            socket.off("inviteUpdated", inviteUpdated);
            socket.off("inviteDeleted", inviteDeleted);

            socket.off("receivedNewBan", receivedNewBan);
            socket.off("banUpdated", banUpdated);
            socket.off("banDeleted", banDeleted);
        };
    }, [socket, activeServerId, fetchInvites, fetchBans, hasFetchedInvitesByServer, hasFetchedBansByServer]);

    const clearPreviewServer = useCallback(() => {
        setPreviewServerId(null);
    }, []);

    return (
        <ServerAdminContext.Provider
            value={{
                invites,
                inviteLoading,
                fetchInvites,
                refreshInvites,
                revokeInvite,
                createInvite,

                bans,
                banLoading,
                fetchBans,
                refreshBans,
                revokeBan,
                decidePendingBan,
                deleteBan,

                setPreviewServerId,
                clearPreviewServer,
            }}
        >
            {children}
        </ServerAdminContext.Provider>
    );
};