import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowDownWideNarrow, Ellipsis } from 'lucide-react';
import { Avatar } from 'antd';

import api from '@/lib/api';
import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import BanMemberModal from './BanMemberModal';
import ChangeMemberRoleModal from './ChangeMemberRoleModal';
import Spinner from '@/components/ui/Spinner';
import { useServer } from '@/hooks/useServer';
import { formatDate } from '@/lib/helper';
import { useNotification } from '@/hooks/useNotification';


function ServerMemberTab() {

    const { serverId } = useParams();
    const { servers } = useServer();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));

    const [serverMembers, setServerMembers] = useState<any[]>([]);
    const [ loading, setLoading ] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [ memberfilter, setMemberFilter ] = useState("");
    const [ sortOption, setSortOption ] = useState<"asc" | "desc">("asc");

    const [ isUpdated, setIsUpdated ] = useState(false);
    const [ showChangeRoleModal, setShowChangeRoleModal ] = useState(false);
    const [ showBanMemberModal, setShowBanMemberModal ] = useState(false);
    
    const { contextHolder, showSuccess, showError } = useNotification();

    const processedMembers = serverMembers
                                .filter(member =>
                                    member.user.username
                                    .toLowerCase()
                                    .includes(memberfilter.toLowerCase())
                                )
                                .sort((a, b) => {
                                    const dateA = new Date(a.joinedAt).getTime();
                                    const dateB = new Date(b.joinedAt).getTime();

                                    return sortOption === "asc"
                                    ? dateA - dateB
                                    : dateB - dateA;
                                });

    const sortItems: ButtonDropDownItem[] = [
        {
            label: "Ascendings",
            onClick: () => setSortOption("asc"),
            type: "normal",
        },
        {
            label: "Descending",
            onClick: () => setSortOption("desc"),
            type: "normal",
        }
    ];

    const moreOptionItems:(memberId: string) => ButtonDropDownItem[] = (memberId) => [
        {
            label: "Change Role",
            onClick: () => {
                setSelectedMemberId(memberId);
                setShowChangeRoleModal(true);
            },
            type: "normal",
        },
        {
            label: "Divider",
            onClick: () => {},
            type: "divider",
        },
        {
            label: "Kick Member",
            onClick: () => handleKickMember(memberId),
            type: "danger",
        },
        {
            label: "Ban Member",
            onClick: () => {
                setSelectedMemberId(memberId);
                setShowBanMemberModal(true);
            },
            type: "danger",
        }
    ];


    useEffect(() => {
        if (!selectedServer ) return;
        const fetchMembers = async () => {
        try {
            setLoading(true);
            const res = await api.get(
            `/servers/${selectedServer.id}/members`
            );

            setServerMembers(res.data.data);
            setIsUpdated(false); // Reset the update flag after fetching members
        } catch (error: any) {
            console.error("Error fetching server members:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchMembers();
    }, [selectedServer, isUpdated]);

    // Kick user from server and close the context menu
    const handleKickMember = async (memberId: string) => {
        if (!selectedServer) return;
        try {
            await api.delete(`/servers/${selectedServer.id}/kick`, { data: { memberId } });
            setServerMembers(prev => prev.filter(member => member.userId !== memberId));
            setIsUpdated(prev => !prev);
            showSuccess("Member kicked successfully");
        } catch (error: any) {
            console.error(error.response?.data?.message || error.message);
            showError(error.response?.data?.message || "Failed to kick member.");
        }
    };

    const handleBanMember = async (reason: string, duration?: string) => {
        if (!selectedServer || !selectedMemberId) return;
        try {
            await api.post(`/servers/${selectedServer.id}/bans/${selectedMemberId}`, { reason, duration: duration === "permanent" ? null : Number(duration) });
            setServerMembers(prev => prev.filter(member => member.userId !== selectedMemberId));
            setIsUpdated(prev => !prev);
            showSuccess("Member banned successfully");
        } catch (error: any) {
            console.error(error.response?.data?.error || error.message);
            showError(error.response?.data?.error || "Failed to ban member.");
        }
    };

    const handleChangeMemberRole = async (newRole: string) => {
        if (!selectedServer || !selectedMemberId) return;

        const selectedMember = serverMembers.find(member => member.userId === selectedMemberId);
        if (!selectedMember || selectedMember.role === newRole) {
            setShowChangeRoleModal(false);
            setSelectedMemberId(null);
            return;
        }

        try {
            await api.patch(`/servers/${selectedServer.id}/members/${selectedMemberId}`, { newRole });
            setIsUpdated(prev => !prev);
            setShowChangeRoleModal(false);
            setSelectedMemberId(null);
            showSuccess("Member role updated successfully");
        } catch (error: any) {
            console.error(error.response?.data?.message || error.message);
            showError(error.response?.data?.message || "Failed to change member role.");
        }
    };
    return (
        <div className="flex flex-col h-full">
            {contextHolder}
            <ChangeMemberRoleModal show={showChangeRoleModal} onClose={() => setShowChangeRoleModal(false)} changeMemberRole={handleChangeMemberRole}/>
            <BanMemberModal show={showBanMemberModal} onClose={() => setShowBanMemberModal(false)} byAuthority banMember={handleBanMember} />
            <p className="text-xl font-bold capitalize mb-4">Server Members</p>
            <p className="text-md font-bold text-foreground capitalize">Show members in channel list.</p>
            <p className='text-[11px] text-muted-text mt-2'>Enabling this will show the members page in channel list, allowing you to quickly see who’s recently joined your server, and find any users flagged for unusual activity.</p>
            {/* Members List Table */}
            <div className='mt-10 w-full rounded-lg bg-muted-background flex flex-col flex-1 min-h-0'>
                <header className='pt-2 px-4 flex items-center justify-between flex-shrink-0'>
                    <p className="text-[15px] font-bold text-foreground">Recent Members</p>
                    {/* Filter and Sort Options */}
                    <div className="flex items-center gap-2">
                        <input type="text" className="bg-chat-panel border border-muted-border rounded-md px-2 py-1 text-sm outline-none focus:ring-0 focus:border-accent" placeholder="Search members..." value={memberfilter} onChange={(e) => setMemberFilter(e.target.value)} />
                        <ButtonDropDown items={sortItems}>
                            <ArrowDownWideNarrow size={16} />
                            <span>Sort</span>
                        </ButtonDropDown>
                        {/* <Popover placement="bottom" content={content} trigger="click">
                            
                        </Popover> */}
                    </div>
                </header>
                {/* Divider */}
                <div className="w-full h-px bg-muted-border my-2 flex-shrink-0" />
                {/* Members List */}
                <div className='overflow-y-auto flex-1 min-h-0'>
                    <table className="w-full text-left">
                        <thead className="sticky top-0 z-10">
                            <tr>
                                <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Name</th>
                                <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Member Since</th>
                                <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Joined Discord</th>
                                <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Joined Method</th>
                                <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Roles</th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10">
                                            <Spinner size='large' />
                                        </td>      
                                    </tr>
                                ) : (
                                    processedMembers.map(member => {
                                        if (member.user.username.toLowerCase().includes(memberfilter.toLowerCase())) {
                                            return (
                                                <tr key={member.id} className="hover:bg-chat-panel/50 cursor-pointer border-b-1 border-muted-border text-[12px]">
                                                    <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                                        <Avatar
                                                        size={40}
                                                        src="/profile-img-sec.jpg"
                                                        className="border-background"
                                                        />
                                                        <span>{member.user.username}</span>
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold">{formatDate(member.joinedAt, true)}</td>
                                                    <td className="px-4 py-2 font-semibold">{formatDate(member.user.createdAt, true)}</td>
                                                    <td className="px-4 py-2 font-semibold">J2as8Hb</td>
                                                    <td className="px-4 py-2 text-muted-text font-semibold">
                                                        {member.role}
                                                        {/* Want to use select in future */}
                                                        {/* <Select
                                                            mode="multiple"
                                                            tagRender={tagRender}
                                                            defaultValue={['gold', 'cyan']}
                                                            style={{ width: '100%' }}
                                                            options={options}
                                                        /> */}
                                                    </td>
                                                    <td className='px-4 py-2'>
                                                        <ButtonDropDown items={moreOptionItems(member.userId)} removeStyles><Ellipsis /></ButtonDropDown>
                                                    </td>
                                                </tr>
                                            )
                                        }   
                                    })
                                )
                            }


                        </tbody> 
                    </table>
                </div>
                {/* Footer showing total members count */}
                <div className="px-4 py-2 flex-shrink-0 sticky bottom-0 z-10">
                    <p className="text-left text-sm font-semibold text-muted-text">
                        Showing {serverMembers.length} members
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ServerMemberTab;