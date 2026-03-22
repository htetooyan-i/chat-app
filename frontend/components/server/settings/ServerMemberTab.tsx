import { useState, useEffect } from 'react';
import { Ellipsis } from 'lucide-react';
import { Avatar } from 'antd';
import { toast } from "sonner";
import { ColumnDef } from '@tanstack/react-table';

import BanMemberModal from './BanMemberModal';
import ChangeMemberRoleModal from './ChangeMemberRoleModal';
import ButtonDropDownDemo from '@/components/ui/ButtonDropDownDemo';
import { ServerDataTable } from '@/components/server/settings/MemberTable';
import { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import { formatDate } from '@/lib/helper';
import { useServerMember } from '@/hooks/useServerMember';
import { getErrorMessage } from '@/lib/api';
import { useServerLayout } from '@/hooks/useServerLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"

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

    const [ showChangeRoleModal, setShowChangeRoleModal ] = useState(false);
    const [ showBanMemberModal, setShowBanMemberModal ] = useState(false);


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
                data={members} 
                loading={loading} 
                className="mt-10"
                />
            </div>
        </div>
    );
}

export default ServerMemberTab;