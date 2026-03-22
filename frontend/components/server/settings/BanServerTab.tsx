"use client";
import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { Ellipsis } from 'lucide-react';
import { toast } from "sonner";
import { ColumnDef } from '@tanstack/react-table';

import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import { formatDate, calculateDays } from '@/lib/helper';
import ReviewBanModal from './ReviewBanModal';
import { ServerBan } from '@/types/ServerBan';
import { useServerAdmin } from '@/hooks/useServerAdmin';
import type { Server } from '@/types/Server';
import { getErrorMessage } from '@/lib/api';
import { useServerLayout } from '@/hooks/useServerLayout';
import { BanDataTable } from './BanTable';
import { Checkbox } from "@/components/ui/checkbox"

type BanServerTabProps = {
    selectedServer: Server
}

function BanServerTab({ selectedServer }: BanServerTabProps) {


    const { setSettingTabCollapsed } = useServerLayout();
    const { bans, banLoading, refreshBans, revokeBan, decidePendingBan, deleteBan } = useServerAdmin();

    const [ showReviewModal, setShowReviewModal ] = useState(false);
    const [ selectedBan, setSelectedBan ] = useState<ServerBan | null>(null);

    // Preview-safe fetch: fetch bans when selectedServer changes
    useEffect(() => {
        if (!selectedServer?.id) return;
        refreshBans(selectedServer.id);
    }, [selectedServer.id, refreshBans]);

    const handleRevokeBan = async (banId: number) => {
        try {
            await revokeBan(banId);
            toast.success("Ban revoked successfully!");
        } catch (error) {
            console.error("Error revoking ban:", error);
            toast.error("Failed to revoke ban. Please try again.", {
                description: getErrorMessage(error, "Failed to revoke ban")
            });
        }
    };

    const handleDecideAppeal = async (decision: "ACCEPTED" | "REJECTED", duration?: string) => {
        if (!selectedBan) return;
        try {
            await decidePendingBan(decision, selectedBan.id, selectedBan.userId, duration);
            toast.success(`Ban appeal ${decision.toLowerCase()} successfully!`);
        } catch (error) {
            console.error("Error deciding appeal:", error);
            toast.error("Failed to decide appeal. Please try again.", {
                description: getErrorMessage(error, "Failed to decide appeal")
            });
        }
    };

    const handleDeleteBan = async (banId: number) => {
        try {
            await deleteBan(banId);
            toast.success("Deleted ban successfully!");
        } catch (error) {
            console.error("Error deleting ban:", error);
            toast.error("Failed to delete ban. Please try again.", {
                description: getErrorMessage(error, "Failed to delete ban")
            });
        }
    }

    const items = (ban: ServerBan): ButtonDropDownItem[] => {
        const actions: ButtonDropDownItem[] = [];

        if (ban.appealStatus === "PENDING") {
            actions.push({
                label: "Review Ban",
                onClick: () => {
                    setSelectedBan(ban);
                    setShowReviewModal(true);
                },
                type: "normal",
            });
        }

        if (ban.appealStatus === "ACCEPTED") {
            actions.push({
                label: "Revoke Ban",
                onClick: () => handleRevokeBan(ban.id),
                type: "danger",
            });
        }

        if (actions.length > 0) {
            actions.push({ label: "Divider", onClick: () => {}, type: "divider" });
        }

        actions.push({
            label: "Delete Ban",
            onClick: () => handleDeleteBan(ban.id),
            type: "danger",
        });

        return actions;
    };

    const columns: ColumnDef<ServerBan>[] = [
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
            header: "Name",
            accessorFn: (row) => row.user.username,
            id: "user",
            cell: ({ row }) => {
                const ban = row.original;
                return (
                    <div className="flex items-center gap-2 font-semibold">
                        <Avatar
                            size={40}
                            src={ban.user.avatar || "/logo.png"}
                            className="border-background"
                        />
                        <span>{ban.user.username}</span>
                    </div>
                );
            }
        },
        {
            header: "Banned By",
            accessorKey: "bannedByRole",
            cell: ({ row }) => <span className="font-semibold">{row.original.bannedByRole}</span>
        },
        {
            header: "Banned Date",
            accessorKey: "createdAt",
            cell: ({ row }) => <span className="font-semibold">{formatDate(row.original.createdAt, true)}</span>
        },
        {
            header: "Ban Reason",
            accessorKey: "reason",
            cell: ({ row }) => <span className="font-semibold">{row.original.reason || "No reason provided"}</span>
        },
        {
            header: "Duration",
            accessorKey: "expiresAt",
            cell: ({ row }) => {
                const ban = row.original;
                return (
                    <span className="font-semibold">
                        {ban.expiresAt ? `${calculateDays(ban.createdAt, ban.expiresAt)} days` : "Permanent"}
                    </span>
                );
            }
        },
        {
            header: "Appeal Status",
            accessorKey: "appealStatus",
            cell: ({ row }) => {
                const status = row.original.appealStatus;
                if (status === "REVOKED") return <span className="text-success bg-success/20 px-2 py-1 rounded text-xs">Revoked</span>;
                if (status === "PENDING") return <span className="text-warning bg-warning/20 px-2 py-1 rounded text-xs">Pending</span>;
                if (status === "ACCEPTED") return <span className="text-error bg-error/20 px-2 py-1 rounded text-xs">Accepted</span>;
                if (status === "SUPERSEDED") return <span className="text-warning bg-warning/20 px-2 py-1 rounded text-xs">Superseded</span>;
                return <span className="text-success bg-success/20 px-2 py-1 rounded text-xs">Rejected</span>;
            }
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <ButtonDropDown items={items(row.original)} removeStyles>
                    <Ellipsis />
                </ButtonDropDown>
            )
        }
    ];

    return (
        <div className="flex flex-col h-full">
            <ReviewBanModal
                show={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                makeDecision={handleDecideAppeal}
            />

            <p className="text-xl font-bold capitalize my-4" onClick={() => setSettingTabCollapsed(prev => !prev)}>Server Ban List</p>
            <p className='text-[11px] text-muted-text mb-4'>
                Bans are by account and IP. Users can circumvent an IP ban using a proxy.
                Enable phone verification to make ban circumvention harder.
            </p>

            <BanDataTable
                columns={columns}
                data={bans || []}
                loading={banLoading}
                noDataMessage='No bans found for this server.'
            />
        </div>
    );
}

export default BanServerTab;