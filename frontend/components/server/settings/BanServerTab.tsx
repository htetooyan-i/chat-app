import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Avatar } from 'antd';
import { Ellipsis } from 'lucide-react';

import api from '@/lib/api';
import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import { useServer } from '@/hooks/useServer';
import { formatDate, calculateDays } from '@/lib/helper';

type Ban = {
    id: string;
    userId: string;
    serverId: string;
    bannedByRole: string;
    reason?: string;
    expiresAt?: Date;
    createdAt: Date;
    revokedAt?: Date;
    appealStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "REVOKED";
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

    const items:(userId: string, serverId: string) => ButtonDropDownItem[] = (userId, serverId) => [
        {
            label: "Revoke Ban",
            onClick: () => handleRevokeBan(userId, serverId),
            type: "normal",
        },
    ];

    const handleRevokeBan = async (userId: string, serverId: string) => {
        try {
            await api.patch(`/servers/${serverId}/bans/${userId}/revoke`);
            setBans(prev => prev.map(ban => ban.userId === userId ? { ...ban, appealStatus: "REVOKED", revokedAt: new Date() } : ban));
        } catch (error) {
            console.error("Error revoking ban:", error);
        }
    };

    useEffect(() => {
        if (!selectedServer) return;
        const fetchBans = async () => {
            try {
                const res = await api.get(`/servers/${selectedServer.id}/bans`);
                setBans(res.data);
            } catch (error) {
                console.error("Error fetching bans:", error);
            }
        };

        fetchBans();
    }, [selectedServer]);

    return (
        <div>
            <p className="text-xl font-bold capitalize mb-4">Server Ban List</p>
            <p className='text-[11px] text-muted-text mt-2'>Bans by default are by account and IP. A user can circumvent an IP ban by using a proxy. Ban circumvention can be made very hard by enabling phone verification in Moderation.</p>
            <div className='w-full flex items-center justify-between mt-10 gap-4'>
                <input type="text" className="flex-1 bg-chat-panel border border-muted-border rounded-md px-2 py-1 text-sm outline-none focus:ring-0 focus:border-accent" placeholder="Search Bans by Username" />
                <div className='flex gap-2'>
                    <button className='cursor-pointer text-[12px] px-4 py-1 bg-accent border border-accent text-white rounded hover:bg-accent/80 transition-colors font-semibold'>Search</button>
                </div>
            </div>
            {/* Members List Table */}
            <div className='mt-4 py-2 w-full rounded-lg bg-muted-background'>
                {/* Members Table */}
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Name</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Banned By</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Banned Date</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Ban Reason</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Duration</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Appeal Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bans.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center text-muted-text py-10">No bans found for this server.</td>
                                </tr>
                            ) : (
                                bans.map(ban => (
                                    <tr key={ban.id} className="hover:bg-chat-panel/50 cursor-pointer border-b-1 border-muted-border text-[12px]">
                                        <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                            <Avatar
                                            size={40}
                                            src={ban.user.avatar || "/profile-img.jpg"}
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
                                                ) : (
                                                    <span className="text-success bg-success/20 px-2 py-1 rounded text-xs">Rejected</span>
                                                )

                                            }
                                        </td>
                                        <td className='px-4 py-2'>
                                            <ButtonDropDown items={items(ban.userId, ban.serverId)} removeStyles><Ellipsis /></ButtonDropDown>
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