"use client";
import React, { useMemo, useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { Ellipsis } from 'lucide-react';

import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import { formatDate, calculateDays } from '@/lib/helper';
import Spinner from '@/components/ui/Spinner';
import ReviewBanModal from './ReviewBanModal';
import { ServerBan } from '@/types/ServerBan';
import { useServerAdmin } from '@/hooks/useServerAdmin';
import { useNotification } from '@/hooks/useNotification';
import type { Server } from '@/types/Server';

type BanServerTabProps = {
    selectedServer: Server
}

function BanServerTab({ selectedServer }: BanServerTabProps) {

    const { bans, banLoading, refreshBans, revokeBan, decidePendingBan, deleteBan } = useServerAdmin();
    const { contextHolder, showSuccess, showError } = useNotification();

    const [ filteredUsername, setFilteredUsername ] = useState("");
    const [ showReviewModal, setShowReviewModal ] = useState(false);
    const [ selectedBan, setSelectedBan ] = useState<ServerBan | null>(null);

    // Preview-safe fetch: fetch bans when selectedServer changes
    useEffect(() => {
        if (!selectedServer?.id) return;
        refreshBans(selectedServer.id);
    }, [selectedServer.id, refreshBans]);

    const filteredBans = useMemo(() => {
        if (!bans) return [];
        if (!filteredUsername.trim()) return bans;
        return bans.filter(ban =>
            ban.user.username.toLowerCase().includes(filteredUsername.toLowerCase())
        );
    }, [bans, filteredUsername]);

    const handleRevokeBan = async (banId: number) => {
        try {
            await revokeBan(banId);
            showSuccess("Ban revoked successfully!");
        } catch (error) {
            console.error("Error revoking ban:", error);
            showError("Failed to revoke ban. Please try again.");
        }
    };

    const handleDecideAppeal = async (decision: "ACCEPTED" | "REJECTED", duration?: string) => {
        if (!selectedBan) return;
        try {
            await decidePendingBan(decision, selectedBan.id, selectedBan.userId, duration);
            showSuccess(`Ban appeal ${decision.toLowerCase()} successfully!`);
        } catch (error) {
            console.error("Error deciding appeal:", error);
            showError("Failed to decide appeal. Please try again.");
        }
    };

    const handleDeleteBan = async (banId: number) => {
        try {
            await deleteBan(banId);
            showSuccess("Deleted ban successfully!");
        } catch (error) {
            console.error("Error deleting ban:", error);
            showError("Failed to delete ban. Please try again.");
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

    return (
        <div className="flex flex-col h-full">
            {contextHolder}
            <ReviewBanModal
                show={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                makeDecision={handleDecideAppeal}
            />

            <p className="text-xl font-bold capitalize mb-2">Server Ban List</p>
            <p className='text-[11px] text-muted-text mb-4'>
                Bans are by account and IP. Users can circumvent an IP ban using a proxy.
                Enable phone verification to make ban circumvention harder.
            </p>

            <div className='w-full flex items-center justify-between gap-4 mb-4'>
                <input
                    type="text"
                    className="flex-1 bg-chat-panel border border-muted-border rounded-md px-2 py-1 text-sm outline-none focus:ring-0 focus:border-accent"
                    placeholder="Search Bans by Username"
                    value={filteredUsername}
                    onChange={(e) => setFilteredUsername(e.target.value)}
                />
            </div>

            <div className='flex-1 w-full rounded-lg bg-muted-background overflow-y-auto min-h-0'>
                <table className="w-full text-left">
                    <thead className='sticky top-0 bg-muted-background z-10'>
                    <tr>
                        <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Name</th>
                        <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Banned By</th>
                        <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Banned Date</th>
                        <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Ban Reason</th>
                        <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Duration</th>
                        <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Appeal Status</th>
                        <th className="px-4 py-2" />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        banLoading ? (
                            <tr>
                                <td colSpan={7} className="text-center py-10">
                                    <Spinner size='large' />
                                </td>
                            </tr>
                        ) : (!bans || bans.length === 0) ? (
                            <tr>
                                <td colSpan={7} className="text-center text-muted-text py-10">
                                    No bans found for this server.
                                </td>
                            </tr>
                        ) : (
                            filteredBans.map(ban => (
                                <tr key={ban.id} className="hover:bg-chat-panel/50 cursor-pointer border-b border-muted-border text-[12px]">
                                    <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                        <Avatar
                                            size={40}
                                            src={ban.user.avatar || "/logo.png"}
                                            className="border-background"
                                        />
                                        <span>{ban.user.username}</span>
                                    </td>
                                    <td className="px-4 py-2 font-semibold">{ban.bannedByRole}</td>
                                    <td className="px-4 py-2 font-semibold">{formatDate(ban.createdAt, true)}</td>
                                    <td className="px-4 py-2 font-semibold">{ban.reason || "No reason provided"}</td>
                                    <td className="px-4 py-2 font-semibold">{ban.expiresAt ? `${calculateDays(ban.createdAt, ban.expiresAt)} days` : "Permanent"}</td>
                                    <td className="px-4 py-2 font-semibold">
                                        {ban.appealStatus === "REVOKED" && <span className="text-success bg-success/20 px-2 py-1 rounded text-xs">Revoked</span>}
                                        {ban.appealStatus === "PENDING" && <span className="text-warning bg-warning/20 px-2 py-1 rounded text-xs">Pending</span>}
                                        {ban.appealStatus === "ACCEPTED" && <span className="text-error bg-error/20 px-2 py-1 rounded text-xs">Accepted</span>}
                                        {ban.appealStatus === "SUPERSEDED" && <span className="text-warning bg-warning/20 px-2 py-1 rounded text-xs">Superseded</span>}
                                        {ban.appealStatus === "REJECTED" && <span className="text-success bg-success/20 px-2 py-1 rounded text-xs">Rejected</span>}
                                    </td>
                                    <td className='px-4 py-2'>
                                        <ButtonDropDown items={items(ban)} removeStyles><Ellipsis /></ButtonDropDown>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BanServerTab;