"use client";
import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { Ellipsis } from 'lucide-react';
import { toast } from "sonner";
import { ColumnDef } from '@tanstack/react-table';

import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import InviteServerModal from '../InviteServerModal';
import { formatDate } from '@/lib/helper';
import { useServerAdmin } from '@/hooks/useServerAdmin';
import { Server } from '@/types/Server';
import { getErrorMessage } from '@/lib/api';
import { useServerLayout } from '@/hooks/useServerLayout';
import { InviteTable } from './InviteTable';
import { ServerInvite } from '@/types/ServerInvite';
import { Checkbox } from "@/components/ui/checkbox"

type InviteServerTabProps = {
    selectedServer: Server
};

function InviteServerTab({ selectedServer }: InviteServerTabProps) {

    const { setSettingTabCollapsed } = useServerLayout();
    const { invites, inviteLoading, fetchInvites, revokeInvite } = useServerAdmin();
    const [showInviteModal, setShowInviteModal] = useState(false);

    useEffect(() => {
        if (!selectedServer?.id) return;
        fetchInvites(selectedServer.id);
    }, [selectedServer.id, fetchInvites]);

    const handleRevokeInvite = async (inviteId: number) => {
        try {
            await revokeInvite(inviteId);
            toast.success("Invite revoked successfully.");
        } catch (error) {
            console.error("Failed to revoke invite:", error);
            toast.error("Failed to revoke invite. Please try again.", {
                description: getErrorMessage(error, "Failed to revoke invite")
            });
        }
    };

    const moreOptionItems = (inviteId: number): ButtonDropDownItem[] => [
        {
            label: "Revoke Invite",
            onClick: () => handleRevokeInvite(inviteId),
            type: "danger",
        }
    ];


    const columns: ColumnDef<ServerInvite>[] = [
        {
            id: "select",
            header: ({ table }) => (
            <Checkbox
                checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
            ),
            cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            header: "Inviter",
            accessorKey: "createdBy",
            cell: ({ row }) => {
                const inviter = row.original.createdBy;
                return (
                    <div className="flex items-center gap-2 font-semibold">
                        <Avatar size={40} src={inviter?.avatarUrl || "/logo.png"} />
                        <span>{inviter?.username || 'Unknown User'}</span>
                    </div>
                );
            }
        },
        {
            header: "Invite Code",
            accessorKey: "code",
            cell: ({ row }) => <span className="font-semibold">{row.original.code}</span>
        },
        {
            header: "Uses",
            accessorKey: "currentUses",
            cell: ({ row }) => <span className="font-semibold">{row.original.currentUses}</span>
        },
        {
            header: "Max Uses",
            accessorKey: "maxUses",
            cell: ({ row }) => <span className="font-semibold">{row.original.maxUses ?? 'Unlimited'}</span>
        },
        {
            header: "Expires",  
            accessorKey: "expiresAt",
            cell: ({ row }) => <span className="font-semibold">{row.original.expiresAt === null ? 'Never' : formatDate(row.original.expiresAt, true)}</span>
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const inviteId = row.original.id;
                return (
                    <ButtonDropDown items={moreOptionItems(inviteId)} removeStyles>
                        <Ellipsis />
                    </ButtonDropDown>
                );
            }  
        }     

    ];

    return (
        <div className="flex flex-col h-full">
            <InviteServerModal
                show={showInviteModal}
                onClose={() => setShowInviteModal(false)}
                fromSettings={true}
            />

            <p className="text-xl font-bold capitalize my-4" onClick={() => setSettingTabCollapsed(prev => !prev)}>Server Invites</p>
            <InviteTable
                columns={columns}
                data={invites || []}
                loading={inviteLoading}
                noDataMessage='No invites found for this server.'

            />
        </div>
    );
}

export default InviteServerTab;