"use client";
import React, { createContext, useCallback,useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/lib/api";
import { useSocket } from '@/hooks/useSocket';
import { MemberRole, ServerMember } from "@/types/ServerMember";
import {useAuth} from "@/hooks/useAuth";

type ServerMemberContextType = {

    me: ServerMember | null;
    members: ServerMember[];
    loading: boolean;
    setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;

    refreshMembers: () => Promise<void>;

    kickMember: (memberId: number) => Promise<void>;
    requestBanMember: (reason: string, duration?: number) => Promise<void>;
    changeMemberRole: (newRole: MemberRole) => Promise<void>;

};

export const ServerMemberContext = createContext<ServerMemberContextType | undefined>(undefined);

export const ServerMemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const params = useParams();
    const serverId = Array.isArray(params.serverId) ? params.serverId[0] : params.serverId;

    const { socket } = useSocket();

    const [ members, setMembers ] = useState<ServerMember[]>([]);

    const { user } = useAuth();
    const me = members.find(m => m.userId === user?.id) ?? null;

    const [ selectedUserId, setSelectedUserId ] = useState<number | null>(null); // for doing actions on a specific member (kick/ban/promote/demote)
    const [ loading, setLoading ] = useState(false);

    const fetchMembers = useCallback(async () => {
        if (!serverId) return;
        setLoading(true);
        try {
            const res = await api.get(`/servers/${serverId}/members`);
            setMembers(res.data.data);
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setLoading(false);
        }
    }, [serverId]);

    const refreshMembers = useCallback(() => fetchMembers(), [fetchMembers]);

    const kickMember = async (userId: number) => {
        if (!serverId) return;

        setMembers(prev => prev.filter(member => member.userId !== userId));

        try {
            await api.delete(`/servers/${serverId}/kick`, { data: { userId } });
        } catch (error) {
            await refreshMembers();
            throw error;
        }
    };

    const requestBanMember = async (reason: string, duration?: number) => {
        if (!serverId || !selectedUserId) return;
        await api.post(`/servers/${serverId}/bans/${selectedUserId}`, { reason, duration });
        await refreshMembers();
    }

    const changeMemberRole = async (newRole: MemberRole) => {
        if (!selectedUserId) return;

        const selectedMember = members.find(member => member.userId === selectedUserId);
        if (!selectedMember || selectedMember.role === newRole) {
            setSelectedUserId(null);
            return;
        }

        setMembers(prev => prev.map(m => m.userId === selectedUserId ? { ...m, role: newRole } : m));
        
        try {
            await api.patch(`/servers/${serverId}/members/${selectedUserId}`, { newRole });
        } catch (error) {
            await refreshMembers();
            throw error;
        }
    };

    // ** MEMBER SOCKET LOGICS
    useEffect(() => {
        if (!serverId || !socket) return;

        const handleRemoveUser = (userId: number)=> {
            setMembers(prev => prev.filter(member => member.userId !== userId))
        }

        // FIXME: if user have an authorize role but if they changed to unauthorize role while they are in setting view that view should close immediately with notification.
        const handleChangedRole = (data: { userId: number; newRole: MemberRole }) => {
            setMembers(prev => prev.map(member => member.userId === data.userId ? { ...member, role: data.newRole } : member));
        }

        const handleReceivedNewMember = (member: ServerMember) => {
            setMembers(prev => [...prev, member]);
        }

        const handleMemberUpdated = (updatedUser: {userId: number, username: string}) => {
            setMembers(prev =>
                prev.map(member =>
                    member.userId === updatedUser.userId
                        ?
                        {
                            ...member,
                            user: {
                                ...member.user,
                                username: updatedUser.username,
                            }
                        }
                        : member
                )
            );
        };

        socket.on("receivedUpdatedMember", handleMemberUpdated);
        socket.on("memberBanned", handleRemoveUser);
        socket.on("memberLeft", handleRemoveUser);
        socket.on("changedMemberRole", handleChangedRole);
        socket.on("receivedNewMember", handleReceivedNewMember);

        fetchMembers();

        return () => {
            socket.off("receivedMemberRole");
            socket.off("memberBanned");
            socket.off("memberLeft");
            socket.off("changedMemberRole");
            socket.off("receivedNewMember");
        }
    }, [fetchMembers, socket]);

  return (
    <ServerMemberContext.Provider value={{ 
        me,
        members, 
        loading, 
        setSelectedUserId,
        refreshMembers, 
        kickMember, 
        requestBanMember, 
        changeMemberRole 
    }}>
      {children}
    </ServerMemberContext.Provider>
  );
};