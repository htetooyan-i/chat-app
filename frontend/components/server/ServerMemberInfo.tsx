"use client";
import { useState } from 'react';
import { UserRoundPlus } from "lucide-react";
import { Avatar, Badge } from 'antd';
import { toast } from "sonner";

import BanMemberModal from './settings/BanMemberModal';
import ContextDropdown, { ContextDropdownItem } from "@/components/ui/ContextDropdown";
import InviteServerModal from './InviteServerModal';
import { useServerMember } from '@/hooks/useServerMember';
import { getErrorMessage } from "@/lib/api";



function ServerMemberInfo() {

    const { members, kickMember, setSelectedUserId } = useServerMember();

    const [ showInviteServerModal, setShowInviteServerModal ] = useState(false);
    const [ showBanMemberModal, setShowBanMemberModal ] = useState(false);

    const getDropdownItems = (userId: number): ContextDropdownItem[] => [
    // {
    //     label: "Open in Mod View",
    //     onClick: () => console.log("View profile"),
    //     type: "normal",
    // },
    {
        label: "Ban Member",
        onClick: () => {
            setSelectedUserId(userId);
            setShowBanMemberModal(true);
        },
        type: "danger",
    },
    {
        label: "Kick Member",
        onClick: () => handleKickMember(userId),
        type: "danger",
    },
    // {
    //     label: "",
    //     onClick: () => {},
    //     type: "divider",
    // },
    // {
    //     label: "Copy Member ID",
    //     onClick: () => navigator.clipboard.writeText(memberId),
    //     type: "normal",
    //     icon: <IdCard width={20} height={20} />,
    // },
    ];


    // Kick user from server and close the context menu
    const handleKickMember = async (userId: number) => {
        try {
            await kickMember(userId);
            toast.success("Member kicked successfully");
        } catch (error) {
            toast.error("Failed to kick member.", {
                description: getErrorMessage(error, "Failed to kick member")
            });
        }
    };

    return (
        <div>
            <InviteServerModal show={showInviteServerModal} onClose={() => setShowInviteServerModal(false)} />
            <BanMemberModal show={showBanMemberModal} onClose={() => setShowBanMemberModal(false)} />
            <header className="p-4 flex justify-between items-center">
                <h2 className="text-[21px] font-bold py-2">Members</h2> 
                <div className="p-2 rounded-full cursor-pointer bg-accent " title="Invite People" onClick={() => setShowInviteServerModal(true)}>
                    <UserRoundPlus width={18} height={18} />
                </div>
            </header>
            { 
                members.map(member => (
                
                    <div key={member.id} className="px-2">
                        <ContextDropdown items={getDropdownItems(member.userId)}>
                            <div className={`w-full flex justify-between items-center gap-2 rounded cursor-pointer px-2 py-1 serverMember`}>
                                <div className="flex items-center gap-2">
                                    <Badge dot color="green" className="bottom-badge cursor-pointer" style={{}}>
                                    <Avatar
                                        shape="circle"
                                        size={32}
                                        src={member.user.avatarUrl || "/logo.png"}
                                    />
                                    </Badge>

                                    <span className="truncate font-medium" style={{fontSize: "12px", maxWidth: "160px"}}>{member.user.username}</span>
                                </div>
                                <span className="font-semibold" style={{fontSize: "12px"}}>{member.role}</span>
                            </div>
                        </ContextDropdown> 
                    </div>
                ))
            }
        </div>
    );
}

export default ServerMemberInfo;