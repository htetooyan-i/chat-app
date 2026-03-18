"use client";
import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { Ellipsis } from 'lucide-react';

import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import InviteServerModal from '../InviteServerModal';
import Spinner from '@/components/ui/Spinner';
import { formatDate } from '@/lib/helper';
import { useServerAdmin } from '@/hooks/useServerAdmin';
import { useNotification } from '@/hooks/useNotification';
import { Server } from '@/types/Server';

type InviteServerTabProps = {
    selectedServer: Server
};

function InviteServerTab({ selectedServer }: InviteServerTabProps) {
    const { invites, inviteLoading, fetchInvites, revokeInvite } = useServerAdmin();
    const [showInviteModal, setShowInviteModal] = useState(false);

    const { contextHolder, showSuccess, showError } = useNotification();

    useEffect(() => {
        if (!selectedServer?.id) return;
        fetchInvites(selectedServer.id);
    }, [selectedServer.id, fetchInvites]);

    const handleRevokeInvite = async (inviteId: number) => {
        try {
            await revokeInvite(inviteId);
            showSuccess("Invite revoked successfully.");
        } catch (error) {
            console.error("Failed to revoke invite:", error);
            showError("Failed to revoke invite.");
        }
    };

    const moreOptionItems = (inviteId: number): ButtonDropDownItem[] => [
        {
            label: "Revoke Invite",
            onClick: () => handleRevokeInvite(inviteId),
            type: "danger",
        }
    ];

    return (
        <div className="flex flex-col h-full">
            {contextHolder}
            <InviteServerModal
                show={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                fromSettings={true}
            />

            <p className="text-xl font-bold capitalize mb-4">Server Invites</p>
            <div className='w-full flex items-center justify-between mb-4'>
                <p className='uppercase text-[12px] font-bold'>Active invite codes</p>
                <div className='flex gap-2'>
                    <button
                        disabled
                        className='cursor-not-allowed text-[12px] px-2 py-1 bg-muted-background text-error border border-muted-border rounded hover:bg-muted-background/70 transition-colors font-semibold'
                    >
                        Pause Invites
                    </button>
                    <button
                        className='cursor-pointer text-[12px] px-2 py-1 bg-accent text-white rounded hover:bg-accent/80 transition-colors font-semibold'
                        onClick={() => setShowInviteModal(true)}
                    >
                        Create Invite
                    </button>
                </div>
            </div>

            <div className='mt-4 pb-2 w-full rounded-lg bg-muted-background overflow-y-auto flex-1 min-h-0'>
                <table className="w-full text-left">
                    <thead className='sticky top-0 bg-muted-background z-10'>
                        <tr>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Inviter</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Invite Code</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Uses</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Max Uses</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Expires</th>
                            <th className="px-4 py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {inviteLoading || !invites ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10">
                                    <Spinner size='large' />
                                </td>
                            </tr>
                        ) : invites.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center text-muted-text py-10">
                                    No invites found for this server.
                                </td>
                            </tr>
                        ) : (
                            invites.map(invite => (
                                <tr
                                    key={invite.id}
                                    className="hover:bg-chat-panel/50 cursor-pointer border-b border-muted-border text-[12px]"
                                >
                                    <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                        <Avatar size={40} src={invite.createdBy?.avatarUrl || "/logo.png"} />
                                        <span>{invite.createdBy?.username || 'Unknown User'}</span>
                                    </td>

                                    <td className="px-4 py-2 font-semibold">{invite.code}</td>
                                    <td className="px-4 py-2 font-semibold">{invite.currentUses}</td>
                                    <td className="px-4 py-2 font-semibold">{invite.maxUses ?? 'Unlimited'}</td>
                                    <td className="px-4 py-2 font-semibold">
                                        {invite.expiresAt === null ? 'Never' : formatDate(invite.expiresAt, true)}
                                    </td>

                                    <td className='px-4 py-2'>
                                        <ButtonDropDown items={moreOptionItems(invite.id)} removeStyles>
                                            <Ellipsis />
                                        </ButtonDropDown>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default InviteServerTab;