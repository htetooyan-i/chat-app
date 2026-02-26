import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import InviteServerModal from '../InviteServerModal';
import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import { useServer } from '@/hooks/useServer';
import { Avatar } from 'antd';
import { Ellipsis } from 'lucide-react';
import { formatDate } from '@/lib/helper';

function InviteServerTab() {

    const { serverId } = useParams();
    const { servers } = useServer();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));
    
    const [ inviteCodes, setInviteCodes ] = useState<any[]>([]);
    const [ showInviteModal, setShowInviteModal ] = useState(false);

    const moreOptionItems:(serverId: string, inviteId: string) => ButtonDropDownItem[] = (serverId, inviteId) => [
        {
            label: "Revoke Invite",
            onClick: () => handleRevokeInvite(serverId, inviteId),
            type: "danger",
        }
    ];

    const fetchInvites = async (serverId: string) => {
        try {
            const res = await api.get(`/servers/${serverId}/invites/`);
            setInviteCodes(res.data || []);
        } catch (error: any) {
            console.error("Error fetching invite codes:", error);
        }   
    };

    const handleRevokeInvite = async (serverId: string, inviteId: string) => {
        try {
            await api.delete(`/servers/${serverId}/invites/${inviteId}`);
            setInviteCodes(prevInvites => prevInvites.filter(invite => invite.id !== inviteId)); // Optimistically update the UI by removing the revoked invite
            if (selectedServer?.id) { // Refresh the invite list after revocation
                fetchInvites(selectedServer.id);
            }
        } catch (error: any) {
            console.error("Error revoking invite:", error);
        }
    }

    useEffect(() => {
        if (selectedServer?.id) {
            fetchInvites(selectedServer.id);
        }
    }, [selectedServer?.id]);
    return (
        <div>
            <InviteServerModal 
            show={showInviteModal} 
            onClose={() => setShowInviteModal(false)} 
            fromSettings={true} 
            refreshInvites={() => {
                if (selectedServer?.id) {
                    fetchInvites(selectedServer.id);
                }
            }} />
            <p className="text-xl font-bold capitalize mb-4">Server Invites</p>
            <div className='w-full flex items-center justify-between'>
                <p className='uppercase text-[12px] font-bold'>Active invite codes</p>
                <div className='flex gap-2'>
                    <button disabled className='cursor-not-allowed text-[12px] px-2 py-1 bg-muted-background text-error border border-muted-border rounded hover:bg-muted-background/70 transition-colors font-semibold'>Pause Invites</button> {/* FUTURE: This btn will be used to pause all invites */}
                    <button className='cursor-pointer text-[12px] px-2 py-1 bg-accent text-white rounded hover:bg-accent/80 transition-colors font-semibold' onClick={() => setShowInviteModal(true)}>Create Invite</button>
                </div>
            </div>
            {/* Members List Table */}
            <div className='mt-10 py-2 w-full rounded-lg bg-muted-background'>
                {/* Members Table */}
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Inviter</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Invite Code</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Uses</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Max Uses</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Expires</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            inviteCodes.map(invite => (
                                <tr key={invite.id} className="hover:bg-chat-panel/50 cursor-pointer border-b-1 border-muted-border text-[12px]">
                                    <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                        <Avatar
                                        size={40}
                                        src="/profile-img.jpg"
                                        className="border-background"
                                        />
                                        <span>{invite.createdBy?.username || 'Unknown User'}</span>
                                    </td>
                                    <td className="px-4 py-2 font-semibold">{invite.code}</td>
                                    <td className="px-4 py-2 font-semibold">{invite.currentUses}</td>
                                    <td className="px-4 py-2 font-semibold">{invite.maxUses ?? 'Unlimited'}</td>
                                    <td className="px-4 py-2 font-semibold">{invite.expiresAt === null ? 'Never' : formatDate(invite.expiresAt)}</td>
                                    <td className='px-4 py-2'>
                                        <ButtonDropDown items={moreOptionItems(invite.serverId, invite.id)} removeStyles><Ellipsis /></ButtonDropDown>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>    
                </table>
            </div>
        </div>
    );
}

export default InviteServerTab;