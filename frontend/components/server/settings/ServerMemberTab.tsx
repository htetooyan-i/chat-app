import React, { useState, useEffect } from 'react';
import { ArrowDownWideNarrow, Ellipsis } from 'lucide-react';
import { Avatar } from 'antd';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import api from '@/lib/api';
import { useServer } from '@/hooks/useServer';
import { formatDate } from '@/lib/helper';
import ButtonDropDown, { ButtonDropDownItem } from '@/components/ui/ButtonDropDown';

function ServerMemberTab() {

    const { selectedServer } = useServer();
    const [serverMembers, setServerMembers] = useState<any[]>([]);
    const [ memberfilter, setMemberFilter ] = useState("");
    const [ sortOption, setSortOption ] = useState<"asc" | "desc">("asc");
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

    const moreOptionItems: ButtonDropDownItem[] = [
        {
            label: "Kick Member",
            onClick: () => console.log("Kick Member"),
            type: "danger",
        },
        {
            label: "Ban Member",
            onClick: () => console.log("Ban Member"),
            type: "danger",
        }
    ];


    useEffect(() => {
        if (!selectedServer ) return;
        const fetchMembers = async () => {
        try {
            const res = await api.get(
            `/servers/${selectedServer.id}/members`
            );

            setServerMembers(res.data.data);
        } catch (error: any) {
            console.error("Error fetching server members:", error);
        }
        };

        fetchMembers();
    }, [selectedServer]);

    return (
        <div>
            <p className="text-xl font-bold capitalize mb-4">Server Members</p>
            <p className="text-md font-bold text-foreground capitalize">Show members in channel list.</p>
            <p className='text-[11px] text-muted-text mt-2'>Enabling this will show the members page in channel list, allowing you to quickly see who’s recently joined your server, and find any users flagged for unusual activity.</p>
            {/* Members List Table */}
            <div className='mt-10 w-full rounded-lg bg-muted-background'>
                <header className='pt-2 px-4 flex items-center justify-between'>
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
                <div className="w-full h-px bg-muted-border my-2" />
                {/* Members Table */}
                <table className="w-full text-left my-2">
                    <thead>
                        <tr>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Name</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Member Since</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Joined Discord</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Joined Method</th>
                            <th className="text-left text-sm font-semibold text-foreground px-4 py-2">Roles</th>

                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td className="text-left text-sm font-semibold text-muted-text px-4 py-2">Showing {serverMembers.length} members</td>
                        </tr>
                    </tfoot>
                    <tbody>
                        {
                            processedMembers.map(member => {
                                if (member.user.username.toLowerCase().includes(memberfilter.toLowerCase())) {
                                    return (
                                        <tr key={member.id} className="hover:bg-chat-panel/50 cursor-pointer border-b-1 border-muted-border text-[12px]">
                                            <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                                <Avatar
                                                size={40}
                                                src="/profile-img.jpg"
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
                                                <ButtonDropDown items={moreOptionItems} removeStyles><Ellipsis /></ButtonDropDown>
                                            </td>
                                        </tr>
                                    )
                                }   
                            })
                        }


                    </tbody>    
                </table>
            </div>
        </div>
    );
}

export default ServerMemberTab;