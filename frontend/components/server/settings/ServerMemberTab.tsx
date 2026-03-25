import { useState, useEffect } from 'react';
import { Ellipsis } from 'lucide-react';
import { Avatar } from 'antd';
import { toast } from "sonner";
import { ColumnDef } from '@tanstack/react-table';

import BanMemberModal from './BanMemberModal';
import ChangeMemberRoleModal from './ChangeMemberRoleModal';
import { ServerDataTable } from '@/components/server/settings/MemberTable';
import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';
import { formatDate } from '@/lib/helper';
import { useServerMember } from '@/hooks/useServerMember';
import { getErrorMessage } from '@/lib/api';
import { useServerLayout } from '@/hooks/useServerLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/Spinner";

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

    const [ selectedMembers, setSelectedMembers ] = useState<ServerMember[]>([]);
    const [ isKicking, setIsKicking ] = useState(false);
    
    const handleKickSelectedMembers = async () => {
        setIsKicking(true);

        try {
            await Promise.all(selectedMembers.map(member => kickMember(member.userId)));
            toast.success("Selected members kicked successfully");
            setSelectedMembers([]);
        } catch (error) {
            toast.error("Failed to kick selected members.", {
                description: getErrorMessage(error, "Failed to kick selected members")
            });
        } finally {
            setIsKicking(false);
        }
    }

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
                    <ButtonDropDown items={moreOptionItems(member.userId)} removeStyles>
                        <Button variant="ghost" size="sm">
                            <Ellipsis size={16} />
                        </Button>
                    </ButtonDropDown>
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
                setSelectedMembers={setSelectedMembers}   
                footer={
                    <div className={`absolute bottom-5 right-20 flex justify-between items-center gap-2 px-4 py-2 bg-chat-panel rounded-md w-[75%] shadow-lg shadow-accent/10 transition-all duration-500 ease-in-out ${selectedMembers.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                        <div>
                            <p className="text-md font-semibold text-foreground">You've selected {selectedMembers.length} member(s).</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                disabled={isKicking}
                                variant={"outline"}
                                className={`bg-error-background text-error hover:text-error border border-error px-2 py-1 rounded-lg font-semibold flex items-center justify-center gap-2 ${isKicking ? "cursor-progress opacity-70 hover:bg-error-background/70" : "cursor-pointer hover:bg-error-background/70"}`}
                                onClick={handleKickSelectedMembers}
                            >
                                {isKicking && <Spinner />}
                                <span>{isKicking ? "Kicking..." : "Kick Members"}</span>
                            </Button>
                        </div>
                    </div>
                }
                />
            </div>
        </div>
    );
}

export default ServerMemberTab;