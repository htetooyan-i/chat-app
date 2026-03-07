"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/lib/api";
import { ServerInvite } from "@/types/ServerInvite";
import type { ServerBan } from "@/types/ServerBan";

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
    decidePendingBan: (decision: "ACCEPTED" | "REJECTED", banId: number, duration?: string) => Promise<void>;
    deleteBan: (banId: number) => Promise<void>;
};

export const ServerAdminContext = createContext<ServerAdminContextType | undefined>(undefined);
  
export const ServerAdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const params = useParams();
    const serverId = Array.isArray(params.serverId) ? Number(params.serverId[0]) : Number(params.serverId);

    const [ invites, setInvites ] = useState<ServerInvite[]>([]);
    const [ bans, setBans ] = useState<ServerBan[]>([]);
    const [ inviteLoading, setInviteLoading ] = useState(false);
    const [ banLoading, setBanLoading ] = useState(false); 

    const fetchInvites = useCallback(async () => {
        try {
            setInviteLoading(true);
            const res = await api.get(`/servers/${serverId}/invites/`);
            setInvites(res.data || []);
        } catch (error) {
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
        const res = await api.post(`/servers/${serverId}/invites`, {
            expiresInMinutes: expireAfter === "never" ? null : parseInt(expireAfter) * 24 * 60, // Convert days to minutes
            maxUses: maxUses === "No Limit" ? null : parseInt(maxUses),
        });
        await refreshInvites();
        return res.data;
    }
    
    const revokeInvite = async (inviteId: number) => {
        try {
            setInvites(prev => prev.filter(invite => invite.id !== inviteId));
            try {
                await api.delete(`/servers/${serverId}/invites/${inviteId}`);
            } catch (error) {
                await fetchInvites();
                throw error;
            }
            
        } catch (error) {
            console.error("Error revoking invite:", error);
        }
    }
    
    const fetchBans = useCallback(async () => {
        try {
            setBanLoading(true);
            const res = await api.get(`/servers/${serverId}/bans`);
            setBans(res.data);
        } catch (error) {
            console.error("Error fetching bans:", error);
        } finally {
            setBanLoading(false);
        }
    }, [serverId]);

    useEffect(() => {
        if (!serverId) return;
        fetchBans();
    }, [fetchBans]);

    const refreshBans = async () => fetchBans();

    const revokeBan = async (banId: number) => {
        setBans(prev => prev.map(ban => ban.id === banId ? { ...ban, appealStatus: "REVOKED", revokedAt: new Date() } : ban));
        try {
            await api.patch(`/servers/${serverId}/bans/${banId}/revoke`);
        } catch (error) {
            console.error("Error revoking ban:", error);
            throw error;
        }
    };

    const decidePendingBan = async (decision: "ACCEPTED" | "REJECTED", banId: number, duration?: string) => {

        setBans(prev => prev.map(ban => {
            if (ban.id !== banId) return ban;
            return {
                ...ban,
                appealStatus: decision,
                expiresAt: !duration || duration === "permanent"
                    ? undefined
                    : new Date(Date.now() + Number(duration) * 24 * 60 * 60 * 1000),
            };
        }));

        try {
            await api.patch(`/servers/${serverId}/bans/${banId}/review`, { decision, duration: duration === "permanent" ? null : Number(duration) });
        } catch (error) {
            console.error("Error deciding appeal:", error);
            await refreshBans();
            throw error;
        }
    };

    const deleteBan = async (banId: number) => {
        setBans(prev => prev.filter(ban => ban.id !== banId));
        try {
            await api.delete(`/servers/${serverId}/bans/${banId}`);
        } catch (error) {
            await refreshBans();
            throw error;
        }
    }

    return (
        <ServerAdminContext.Provider value={{ invites, inviteLoading, refreshInvites, revokeInvite, createInvite, bans, banLoading, refreshBans, revokeBan, decidePendingBan, deleteBan }}>
        {children}
        </ServerAdminContext.Provider>
    );
};