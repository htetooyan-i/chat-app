import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Avatar } from 'antd';
import { Ellipsis } from 'lucide-react';

import api from '@/lib/api';
import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import { useServer } from '@/hooks/useServer';
import { formatDate, calculateDays } from '@/lib/helper';
import Spinner from '@/components/ui/Spinner';
import ReviewBanModal from './ReviewBanModal';

type Ban = {
    id: string;
    userId: string;
    serverId: string;
    bannedByRole: string;
    reason?: string;
    expiresAt?: Date;
    createdAt: Date;
    revokedAt?: Date;
    appealStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "REVOKED" | "SUPERSEDED";
    user: {
        username: string;
        avatar?: string;
    }
}

function BanServerTab() {

    const { serverId } = useParams();
    const { servers } = useServer();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));
    
    const [ bans, setBans ] = React.useState<Ban[]>([]);
    const [ loading, setLoading ] = React.useState(false);

    const [ showReviewModal, setShowReviewModal ] = React.useState(false);
    const [ selectedBan, setSelectedBan ] = React.useState<Ban | null>(null);

    const [ filteredUsername, setFilteredUsername ] = React.useState("");

    const handleSearch = async () => {
        setLoading(true);
        setBans(prev => prev.filter(ban => ban.user.username.toLowerCase().includes(filteredUsername.toLowerCase())));
        setLoading(false);
    }

    const items = (ban: Ban): ButtonDropDownItem[] => {
        const actions: ButtonDropDownItem[] = [];

        
        if (ban.appealStatus === "PENDING") {
            actions.push(
                {
                    label: "Review Ban",
                    onClick: () => {
                        setSelectedBan(ban);
                        setShowReviewModal(true);
                    },
                    type: "normal",
                },
            );
        }
        
        if (ban.appealStatus === "ACCEPTED") {
            actions.push({
                label: "Revoke Ban",
                onClick: () => handleRevokeBan(ban.id),
                type: "danger",
            });
        }
        if (actions.length > 0) {
            actions.push({
                label: "Divider",
                onClick: () => {},
                type: "divider",
            });
        }

        actions.push({
            label: "Delete Ban",
            onClick: () => handleDeleteBan(ban.id),
            type: "danger",
        });

        return actions;
    };

    const handleRevokeBan = async (banId: string) => {
        try {
            await api.patch(`/servers/${serverId}/bans/${banId}/revoke`);
            setBans(prev => prev.map(ban => ban.id === banId ? { ...ban, appealStatus: "REVOKED", revokedAt: new Date() } : ban));
        } catch (error) {
            console.error("Error revoking ban:", error);
        }
    };

    const handleDecideAppeal = async (decision: "ACCEPTED" | "REJECTED", duration?: string) => {
        if (!selectedBan) return;
        const banId = selectedBan.id;
        try {
            await api.patch(`/servers/${serverId}/bans/${banId}/review`, { decision, duration: duration === "permanent" ? null : Number(duration) });
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
        } catch (error) {
            console.error("Error deciding appeal:", error);
        }
    };

    const handleDeleteBan = async (banId: string) => {
        try {
            await api.delete(`/servers/${serverId}/bans/${banId}`);
            setBans(prev => prev.filter(ban => ban.id !== banId));
        } catch (error) {
            console.error("Error deleting ban:", error);
        }
    }

    useEffect(() => {
        if (!selectedServer) return;
        const fetchBans = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/servers/${selectedServer.id}/bans`);
                setBans(res.data);
            } catch (error) {
                console.error("Error fetching bans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBans();
    }, [selectedServer]);

    return (
        <div className="flex flex-col h-full">
            <ReviewBanModal 
                show={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                makeDecision={handleDecideAppeal}
            />
            <p className="text-xl font-bold capitalize mb-4">Server Ban List</p>
            <p className='text-[11px] text-muted-text mt-2'>Bans by default are by account and IP. A user can circumvent an IP ban by using a proxy. Ban circumvention can be made very hard by enabling phone verification in Moderation.</p>
            <div className='w-full flex items-center justify-between mt-10 gap-4'>
                <input type="text" className="flex-1 bg-chat-panel border border-muted-border rounded-md px-2 py-1 text-sm outline-none focus:ring-0 focus:border-accent" placeholder="Search Bans by Username" value={filteredUsername} onChange={(e) => setFilteredUsername(e.target.value)} />
                <div className='flex gap-2'>
                    <button className='cursor-pointer text-[12px] px-4 py-1 bg-accent border border-accent text-white rounded hover:bg-accent/80 transition-colors font-semibold' onClick={() => {
                        console.log("Searching for:", filteredUsername);
                        if (filteredUsername.trim() != "") {
                            handleSearch();
                        }
                    }}>Search</button>
                </div>
            </div>
            {/* Members List Table */}
            <div className='mt-4 pb-2 w-full rounded-lg bg-muted-background overflow-y-auto flex-1 min-h-0'>
                {/* Members Table */}
                <table className="w-full text-left">
                    <thead className='sticky top-0 bg-muted-background z-10 w-full'>
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
                            loading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-10">
                                        <Spinner size='large' />
                                    </td>
                                </tr>
                            ) : bans.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center text-muted-text py-10">No bans found for this server.</td>
                                </tr>
                            ) : (
                                bans.map(ban => (
                                    <tr key={ban.id} className="hover:bg-chat-panel/50 cursor-pointer border-b-1 border-muted-border text-[12px]">
                                        <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                            <Avatar
                                            size={40}
                                            src={ban.user.avatar || "/profile-img-sec.jpg"}
                                            className="border-background"
                                            />
                                            <span>{ban.user.username}</span>
                                        </td>
                                        <td className="px-4 py-2 font-semibold">{ban.bannedByRole}</td>
                                        <td className="px-4 py-2 font-semibold">{formatDate(ban.createdAt, true)}</td>
                                        <td className="px-4 py-2 font-semibold">{ban.reason || "No reason provided"}</td>
                                        <td className="px-4 py-2 font-semibold">{ban.expiresAt ? `${calculateDays(ban.createdAt, ban.expiresAt)} days` : "Permanent"}</td>
                                        <td className="px-4 py-2 font-semibold">

                                            {
                                                ban.appealStatus === "REVOKED" ? (
                                                    <span className="text-success bg-success/20 px-2 py-1 rounded text-xs">Revoked</span>
                                                ) : ban.appealStatus === "PENDING" ? (
                                                    <span className="text-warning bg-warning/20 px-2 py-1 rounded text-xs">Pending</span>
                                                ) : ban.appealStatus === "ACCEPTED" ? (
                                                    <span className="text-error bg-error/20 px-2 py-1 rounded text-xs">Accepted</span>
                                                ) : ban.appealStatus === "SUPERSEDED" ? (
                                                    <span className="text-warning bg-error/20 px-2 py-1 rounded text-xs">Superseded</span>
                                                ) : (
                                                    <span className="text-success bg-success/20 px-2 py-1 rounded text-xs">Rejected</span>
                                                )

                                            }
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