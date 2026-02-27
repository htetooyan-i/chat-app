"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UserRoundPlus, IdCard } from "lucide-react";
import { Avatar, Badge } from 'antd';

import api from "@/lib/api";
import InviteServerModal from './InviteServerModal';
import ContextDropdownComponent, { ContextDropdownItem } from "@/components/ui/ContextDropdown";
import { useServer } from '@/hooks/useServer';
import { useNotification } from '@/hooks/useNotification';
import BanMemberModal from './settings/BanMemberModal';

type ServerMemberInfoProps = {
    type: "settings" | "files" | "users" | "none";
}

function ServerMemberInfo({ type }: ServerMemberInfoProps) {

    const { contextHolder, showSuccess, showError } = useNotification();

    const { serverId } = useParams();
    const { servers } = useServer();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));
    
    const [serverMembers, setServerMembers] = useState<any[]>([]);
    const [ selectedMemberId, setSelectedMemberId ] = useState<String>("");

    const [ showInviteServerModal, setShowInviteServerModal ] = useState(false);
    const [ showBanMemberModal, setShowBanMemberModal ] = useState(false);
    const [ isUpdated, setIsUpdated ] = useState(false);


    useEffect(() => {
        if (type !== "users" || !selectedServer ) return;
        const fetchMembers = async () => {
        try {
            const res = await api.get(
            `/servers/${selectedServer.id}/members`
            );

            setServerMembers(res.data.data);
            setIsUpdated(false); // Reset the update flag after fetching members
        } catch (error: any) {
            console.error("Error fetching server members:", error);
        }
        };

        fetchMembers();
    }, [type, selectedServer, isUpdated]);

    const getDropdownItems = (memberId: string): ContextDropdownItem[] => [
    {
        label: "Open in Mod View",
        onClick: () => console.log("View profile"),
        type: "normal",
    },
    {
        label: "Ban Member",
        onClick: () => {
            setSelectedMemberId(memberId);
            setShowBanMemberModal(true);
        },
        type: "danger",
    },
    {
        label: "Kick Member",
        onClick: () => handleKickMember(memberId),
        type: "danger",
    },
    {
        label: "",
        onClick: () => {},
        type: "divider",
    },
    {
        label: "Copy Member ID",
        onClick: () => navigator.clipboard.writeText(memberId),
        type: "normal",
        icon: <IdCard width={20} height={20} />,
    },
    ];


    // Kick user from server and close the context menu
    const handleKickMember = async (memberId: string) => {
        if (!selectedServer) return;
        try {
            await api.delete(`/servers/${selectedServer.id}/kick`, { data: { memberId } });
            setServerMembers(prev => prev.filter(member => member.userId !== memberId));
            showSuccess("Member kicked successfully");
            setIsUpdated(prev => !prev); // Trigger a re-fetch of members after kicking
        } catch (error: any) {
        showError(error.response?.data?.message || error.message);
        }
    };

    const handleBanMember = async (reason: string) => {
        if (!selectedServer || !selectedMemberId) return;
        try {
            await api.post(`/servers/${selectedServer.id}/bans/${selectedMemberId}`, { reason });
            setServerMembers(prev => prev.filter(member => member.userId !== selectedMemberId));
            showSuccess("Member banned successfully");
            setIsUpdated(prev => !prev); // Trigger a re-fetch of members after banning
        } catch (error: any) {
            showError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            {contextHolder}
            <InviteServerModal show={showInviteServerModal} onClose={() => setShowInviteServerModal(false)} />
            <BanMemberModal show={showBanMemberModal} onClose={() => setShowBanMemberModal(false)} banMember={handleBanMember} />
            <header className="p-4 flex justify-between items-center">
                <h2 className="text-[21px] font-bold py-2">Members</h2> 
                <div className="p-2 rounded-full cursor-pointer bg-accent " title="Invite People" onClick={() => setShowInviteServerModal(true)}>
                    <UserRoundPlus width={18} height={18} />
                </div>
            </header>
            { 
                serverMembers.map(member => (
                
                    <div key={member.id} className="px-2">
                        <ContextDropdownComponent items={getDropdownItems(member.userId)}>
                            <div className={`w-full flex justify-between items-center gap-2 rounded cursor-pointer px-2 py-1 serverMember`}>
                                <div className="flex items-center gap-2">
                                    <Badge dot color="green" className="bottom-badge cursor-pointer" style={{}}>
                                    <Avatar
                                        shape="circle"
                                        size={32}
                                        src="/profile-img.jpg"
                                    />
                                    </Badge>

                                    <span className="truncate font-medium" style={{fontSize: "12px", maxWidth: "160px"}}>{member.user.username}</span>
                                </div>
                                <span className="font-semibold" style={{fontSize: "12px"}}>{member.role}</span>
                            </div>
                        </ContextDropdownComponent> 
                    </div>
                ))
            }
        </div>
    );
}

export default ServerMemberInfo;