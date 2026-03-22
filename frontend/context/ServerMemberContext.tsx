"use client";
import React, {
    createContext,
    useCallback,
    useEffect,
    useState,
    useMemo
} from "react";
import { useParams } from "next/navigation";

import { api } from "@/lib/api";
import { useSocket } from "@/hooks/useSocket";
import { MemberRole, ServerMember } from "@/types/ServerMember";
import { useAuth } from "@/hooks/useAuth";

type ServerMemberContextType = {
    me: ServerMember | null;
    members: ServerMember[];
    loading: boolean;

    setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;

    fetchMembers: (serverId: number) => Promise<void>;
    refreshMembers: () => Promise<void>;

    kickMember: (memberId: number) => Promise<void>;
    requestBanMember: (reason: string, duration?: number) => Promise<void>;
    changeMemberRole: (newRole: MemberRole) => Promise<void>;

    setPreviewServerId: (id: number | null) => void;
    clearPreviewServer: () => void;
};

export const ServerMemberContext =
    createContext<ServerMemberContextType | undefined>(undefined);

export const ServerMemberProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {

    const params = useParams();
    const serverIdParam = Array.isArray(params.serverId)
        ? params.serverId[0]
        : params.serverId;

    const serverId = serverIdParam ? Number(serverIdParam) : null;

    const { socket } = useSocket();
    const { user } = useAuth();

    // Cache members by server
    const [membersByServer, setMembersByServer] = useState<Record<number, ServerMember[]>>({});
    const [loadingByServer, setLoadingByServer] = useState<Record<number, boolean>>({});

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    // preview server (for modal)
    const [previewServerId, setPreviewServerId] = useState<number | null>(null);

    // ACTIVE SERVER (core idea)
    const activeServerId = previewServerId ?? serverId;

    const members = useMemo(() => {
        if (!activeServerId) return [];
        return membersByServer[activeServerId] || [];
    }, [membersByServer, activeServerId]);

    const loading = activeServerId
        ? loadingByServer[activeServerId] || false
        : false;

    const me = members.find(m => m.userId === user?.id) ?? null;

    const fetchMembers = useCallback(async (targetServerId: number) => {
        if (!targetServerId) return;

        setLoadingByServer(prev => ({
            ...prev,
            [targetServerId]: true
        }));

        try {
            const res = await api.get(`/servers/${targetServerId}/members`);

            setMembersByServer(prev => ({
                ...prev,
                [targetServerId]: res.data.data
            }));
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setLoadingByServer(prev => ({
                ...prev,
                [targetServerId]: false
            }));
        }
    }, []);

    const refreshMembers = useCallback(async () => {
        if (!activeServerId) return;
        await fetchMembers(activeServerId);
    }, [activeServerId, fetchMembers]);

    const updateMembers = (updater: (prev: ServerMember[]) => ServerMember[]) => {
        if (!activeServerId) return;

        setMembersByServer(prev => ({
            ...prev,
            [activeServerId]: updater(prev[activeServerId] || [])
        }));
    };

    const kickMember = async (userId: number) => {
        if (!activeServerId) return;

        updateMembers(prev => prev.filter(m => m.userId !== userId));

        try {
            await api.delete(`/servers/${activeServerId}/kick`, {
                data: { userId }
            });
        } catch (error) {
            await refreshMembers();
            throw error;
        }
    };

    const requestBanMember = async (reason: string, duration?: number) => {
        if (!activeServerId || !selectedUserId) return;

        await api.post(
            `/servers/${activeServerId}/bans/${selectedUserId}`,
            { reason, duration }
        );

        await refreshMembers();
    };

    const changeMemberRole = async (newRole: MemberRole) => {
        if (!activeServerId || !selectedUserId) return;

        const selectedMember = members.find(
            m => m.userId === selectedUserId
        );

        if (!selectedMember || selectedMember.role === newRole) {
            setSelectedUserId(null);
            return;
        }

        updateMembers(prev =>
            prev.map(m =>
                m.userId === selectedUserId
                    ? { ...m, role: newRole }
                    : m
            )
        );
        
        try {
            const response = await api.patch(
                `/servers/${activeServerId}/members/${selectedUserId}`,
                { newRole }
            );
        } catch (error) {
            await refreshMembers();
            throw error;
        }
    };

    useEffect(() => {
        if (!activeServerId || !socket) return;

        const updateMembersSafe = (fn: (prev: ServerMember[]) => ServerMember[]) => {
            setMembersByServer(prev => ({
                ...prev,
                [activeServerId]: fn(prev[activeServerId] || [])
            }));
        };

        const handleRemoveUser = (userId: number) => {
            updateMembersSafe(prev =>
                prev.filter(m => m.userId !== userId)
            );
        };

        const handleChangedRole = (data: { userId: number; newRole: MemberRole }) => {
            updateMembersSafe(prev =>
                prev.map(m =>
                    m.userId === data.userId
                        ? { ...m, role: data.newRole }
                        : m
                )
            );
        };

        const handleNewMember = (member: ServerMember) => {
            updateMembersSafe(prev => [...prev, member]);
        };

        const handleMemberUpdated = (updatedUser: {
            userId: number;
            username?: string;
            avatarUrl?: string;
        }) => {
            updateMembersSafe(prev =>
                prev.map(m =>
                    m.userId === updatedUser.userId
                        ? {
                            ...m,
                            user: {
                                ...m.user,
                                username:
                                    updatedUser.username ?? m.user.username,
                                avatarUrl:
                                    updatedUser.avatarUrl ?? m.user.avatarUrl
                            }
                        }
                        : m
                )
            );
        };

        socket.on("receivedUpdatedMember", handleMemberUpdated);
        socket.on("memberBanned", handleRemoveUser);
        socket.on("memberLeft", handleRemoveUser);
        socket.on("changedMemberRole", handleChangedRole);
        socket.on("receivedNewMember", handleNewMember);

        if (!membersByServer[activeServerId]) {
            fetchMembers(activeServerId);
        }

        return () => {
            socket.off("receivedUpdatedMember", handleMemberUpdated);
            socket.off("memberBanned", handleRemoveUser);
            socket.off("memberLeft", handleRemoveUser);
            socket.off("changedMemberRole", handleChangedRole);
            socket.off("receivedNewMember", handleNewMember);
        };
    }, [activeServerId, socket, fetchMembers, membersByServer]);

    return (
        <ServerMemberContext.Provider
            value={{
                me,
                members,
                loading,
                setSelectedUserId,
                fetchMembers,
                refreshMembers,
                kickMember,
                requestBanMember,
                changeMemberRole,

                setPreviewServerId,
                clearPreviewServer: () => setPreviewServerId(null)
            }}
        >
            {children}
        </ServerMemberContext.Provider>
    );
};