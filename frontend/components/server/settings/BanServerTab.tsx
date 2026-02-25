import React from 'react';
import { Avatar } from 'antd';
import { Ellipsis } from 'lucide-react';

function BanServerTab() {
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
                        <tr className="hover:bg-chat-panel/50 cursor-pointer border-b-1 border-muted-border text-[12px]">
                            <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                <Avatar
                                size={40}
                                src="/profile-img.jpg"
                                className="border-background"
                                />
                                <span>Ashley</span>
                            </td>
                            <td className="px-4 py-2 font-semibold">Admin</td>
                            <td className="px-4 py-2 font-semibold">2024-01-01</td>
                            <td className="px-4 py-2 font-semibold">Spamming</td>
                            <td className="px-4 py-2 font-semibold">Permanent</td>
                            <td className="px-4 py-2 font-semibold">
                                <span className="text-warning bg-warning/20 px-2 py-1 rounded text-xs">Pending</span>
                            </td>
                            <td className='px-4 py-2'>
                                <Ellipsis />
                            </td>
                        </tr>
                        <tr className="hover:bg-chat-panel/50 cursor-pointer border-b-1 border-muted-border text-[12px]">
                            <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                <Avatar
                                size={40}
                                src="/profile-img.jpg"
                                className="border-background"
                                />
                                <span>Ashley</span>
                            </td>
                            <td className="px-4 py-2 font-semibold">Admin</td>
                            <td className="px-4 py-2 font-semibold">2024-01-01</td>
                            <td className="px-4 py-2 font-semibold">Spamming</td>
                            <td className="px-4 py-2 font-semibold">Permanent</td>
                            <td className="px-4 py-2 font-semibold">
                                <span className="text-error bg-error/20 px-2 py-1 rounded text-xs">Accepted</span>
                            </td>
                            <td className='px-4 py-2'>
                                <Ellipsis />
                            </td>
                        </tr>
                        <tr className="hover:bg-chat-panel/50 cursor-pointer border-b-1 border-muted-border text-[12px]">
                            <td className="px-4 py-2 flex items-center gap-2 font-semibold">
                                <Avatar
                                size={40}
                                src="/profile-img.jpg"
                                className="border-background"
                                />
                                <span>Ashley</span>
                            </td>
                            <td className="px-4 py-2 font-semibold">Admin</td>
                            <td className="px-4 py-2 font-semibold">2024-01-01</td>
                            <td className="px-4 py-2 font-semibold">Spamming</td>
                            <td className="px-4 py-2 font-semibold">Permanent</td>
                            <td className="px-4 py-2 font-semibold">
                                <span className="text-success bg-success/20 px-2 py-1 rounded text-xs">Rejected</span>
                            </td>
                            <td className='px-4 py-2'>
                                <Ellipsis />
                            </td>
                        </tr>
                    </tbody>    
                </table>
            </div>
        </div>
    );
}

export default BanServerTab;