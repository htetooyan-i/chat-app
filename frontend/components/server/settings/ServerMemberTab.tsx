import React, { useState, useEffect } from 'react';
import { ArrowDownWideNarrow, Ellipsis } from 'lucide-react';
import { Avatar } from 'antd';
import { toast } from "sonner";
import { ColumnDef } from '@tanstack/react-table';

import { ServerDataTable } from '@/components/ui/ServerDataTable';
import ButtonDropDownDemo from '@/components/ui/ButtonDropDownDemo';
import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import BanMemberModal from './BanMemberModal';
import ChangeMemberRoleModal from './ChangeMemberRoleModal';
import Spinner from '@/components/ui/Loader';
import { formatDate } from '@/lib/helper';
import { useServerMember } from '@/hooks/useServerMember';
import { getErrorMessage } from '@/lib/api';
import { useServerLayout } from '@/hooks/useServerLayout';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';

import { MemberRole, ServerMember } from '@/types/ServerMember';
import { Server } from '@/types/Server';

type ServerMemberTabProps = {
    selectedServer: Server
}

function ServerMemberTab({ selectedServer }: ServerMemberTabProps) {

    const { setSettingTabCollapsed } = useServerLayout();
    const {
        kickMember,
        setSelectedUserId,
        changeMemberRole,
        members,
        loading,
        setPreviewServerId,
        clearPreviewServer,
        fetchMembers
    } = useServerMember();

    useEffect(() => {
        if (!selectedServer?.id) return;

        setPreviewServerId(selectedServer.id);

        // only fetch if not already loaded
        if (members.length === 0) {
            fetchMembers(selectedServer.id);
        }

        return () => {
            clearPreviewServer();
        };
    }, [selectedServer.id]);

    const [ memberFilter, setMemberFilter ] = useState("");
    const [ sortOption, setSortOption ] = useState<"asc" | "desc">("asc");

    const [ showChangeRoleModal, setShowChangeRoleModal ] = useState(false);
    const [ showBanMemberModal, setShowBanMemberModal ] = useState(false);

    const processedMembers = members
                                .filter(member =>
                                    member.user.username
                                    .toLowerCase()
                                    .includes(memberFilter.toLowerCase())
                                )
                                .sort((a, b) => {
                                    const dateA = new Date(a.joinedAt).getTime();
                                    const dateB = new Date(b.joinedAt).getTime();

                                    return sortOption === "asc"
                                    ? dateA - dateB
                                    : dateB - dateA;
                                });

    const moreOptionItems:(memberId: number) => ButtonDropDownItem[] = (memberId) => [
        {
            label: "Change Role",
            onClick: () => {
                setSelectedUserId(memberId);
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
                setSelectedUserId(memberId);
                setShowBanMemberModal(true);
            },
            type: "danger",
        }
    ];


    const columns: ColumnDef<ServerMember>[] = [
        {
            header: "Name",
            accessorKey: "user",
            cell: ({ row }) => {
                const user = row.original.user;
                return (
                    <div className="flex items-center gap-2">
                        <Avatar
                            size={40}
                            src={user.avatarUrl || "/logo.png"}
                            className="border-background"
                        />
                        <span>{user.username}</span>
                    </div>
                );
            }
        },
        {
            header: "Member Since",
            accessorKey: "joinedAt",
            cell: ({ row }) => formatDate(row.original.joinedAt, true)
        },
        {
            header: "Joined Konyat",
            accessorKey: "user.createdAt",
            cell: ({ row }) => formatDate(row.original.user.createdAt, true)
        },
        {
            header: "Role",
            accessorKey: "role",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const member = row.original;
                return (
                    <ButtonDropDownDemo items={moreOptionItems(member.userId)} removeStyles>
                        <Button variant="ghost" size="sm">
                            <Ellipsis size={16} />
                        </Button>
                    </ButtonDropDownDemo>
                );
            }
        }
    ];


    // Kick user from server and close the context menu
    const handleKickMember = async (memberId: number) => {
        try {
            await kickMember(memberId);
            toast.success("Member kicked successfully");
        } catch (error) {
            toast.error("Failed to kick member.", {
                description: getErrorMessage(error, "Failed to kick member")
            });
        }
    };

    const handleChangeMemberRole = async (newRole: MemberRole) => {
        console.log("Changing member role to:", newRole);
        try {
            await changeMemberRole(newRole);
            toast.success("Member role updated successfully");
        } catch (error) {
            toast.error("Failed to change member role.", {
                description: getErrorMessage(error, "Failed to change member role.")
            });
        }
    };
    
    return (
        <div className="flex-1 flex flex-col h-full w-full">
            <ChangeMemberRoleModal show={showChangeRoleModal} onClose={() => setShowChangeRoleModal(false)} changeMemberRole={handleChangeMemberRole}/>
            <BanMemberModal show={showBanMemberModal} onClose={() => setShowBanMemberModal(false)} byAuthority />
            <p className="text-xl font-bold capitalize my-4" onClick={() => setSettingTabCollapsed(prev => !prev)}>Server Members</p>
            <p className="text-md font-bold text-foreground capitalize">Show members in channel list.</p>
            <p className='text-[11px] text-muted-text mt-2'>Enabling this will show the members page in channel list, allowing you to quickly see who’s recently joined your server, and find any users flagged for unusual activity.</p>
            {/* Members List Table */}
            <div className="flex-1">
                <ServerDataTable 
                columns={columns} 
                data={processedMembers} 
                loading={loading} 
                className="mt-10"
                footer={
                    <TableCell colSpan={columns.length} className="px-4 py-2">
                        <p className="text-left text-sm font-semibold text-muted-text">
                            Showing {members.length} members
                        </p>
                    </TableCell>
                }
                />
            </div>
        </div>
    );
}

export default ServerMemberTab;

// <div className='mt-10 w-[50px] rounded-lg bg-muted-background flex flex-col flex-1 min-h-0 overflow-x-auto'>
//                 <header className='pt-2 px-4 flex items-center justify-between gap-1 flex-shrink-0'>
//                     <p className="text-[15px] font-bold text-foreground shrink-0">Recent Members</p>
//                     {/* Filter and Sort Options */}
//                     <div className="flex items-center gap-2">
//                         <input type="text" className="bg-chat-panel border border-muted-border rounded-md px-2 py-1 text-sm outline-none focus:ring-0 focus:border-accent" placeholder="Search members..." value={memberFilter} onChange={(e) => setMemberFilter(e.target.value)} />
//                         <ButtonDropDown items={sortItems}>
//                             <ArrowDownWideNarrow size={16} />
//                             <span>Sort</span>
//                         </ButtonDropDown>
//                         {/* <Popover placement="bottom" content={content} trigger="click">
                            
//                         </Popover> */}
//                     </div>
//                 </header>
//                 {/* Divider */}
//                 <div className="w-full h-px bg-muted-border my-2 flex-shrink-0" />
//                 {/* Members List */}
//                 <div className='overflow-y-auto flex-1 min-h-0 flex-shrink-0'>
//                     <table className="min-w-full w-max text-left">
//                         <thead className="sticky top-0 z-10">
//                             <tr>
//                                 <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Name</th>
//                                 <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Member Since</th>
//                                 <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Joined Konyat</th>
//                                 {/* // FUTURE: show how user joined the server, via invite link, or from server discovery, etc <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Joined Method</th> */}
//                                 <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Roles</th>
//                                 <th className="px-4 py-2" />
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 loading ? (
//                                     <tr>
//                                         <td colSpan={5} className="text-center py-10">
//                                             <Spinner size='large' />
//                                         </td>      
//                                     </tr>
//                                 ) : (
//                                     processedMembers.map(member => {
//                                         if (member.user.username.toLowerCase().includes(memberFilter.toLowerCase())) {
//                                             return (
//                                                 <tr key={member.id} className="hover:bg-chat-panel/50 cursor-pointer border-b-1 border-muted-border text-[12px]">
//                                                     <td className="px-4 py-2 flex items-center gap-2 font-semibold">
//                                                         <Avatar
//                                                         size={40}
//                                                         src={member.user.avatarUrl || "/logo.png"}
//                                                         className="border-background"
//                                                         />
//                                                         <span>{member.user.username}</span>
//                                                     </td>
//                                                     <td className="px-4 py-2 font-semibold">{formatDate(member.joinedAt, true)}</td>
//                                                     <td className="px-4 py-2 font-semibold">{formatDate(member.user.createdAt, true)}</td>
//                                                     {/* <td className="px-4 py-2 font-semibold">J2as8Hb</td> */}
//                                                     <td className="px-4 py-2 text-muted-text font-semibold">
//                                                         {member.role}
//                                                         {/* Want to use select in future */}
//                                                         {/* <Select
//                                                             mode="multiple"
//                                                             tagRender={tagRender}
//                                                             defaultValue={['gold', 'cyan']}
//                                                             style={{ width: '100%' }}
//                                                             options={options}
//                                                         /> */}
//                                                     </td>
//                                                     <td className='px-4 py-2'>
//                                                         <ButtonDropDown items={moreOptionItems(member.userId)} removeStyles><Ellipsis /></ButtonDropDown>
//                                                     </td>
//                                                 </tr>
//                                             )
//                                         }   
//                                     })
//                                 )
//                             }


//                         </tbody> 
//                     </table>
//                 </div>
//                 {/* Footer showing total members count */}
//                 <div className="px-4 py-2 flex-shrink-0 sticky bottom-0 z-10">
//                     <p className="text-left text-sm font-semibold text-muted-text">
//                         Showing {members.length} members
//                     </p>
//                 </div>
//             </div>