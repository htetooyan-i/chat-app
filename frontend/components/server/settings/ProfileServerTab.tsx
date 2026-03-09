import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Avatar, Upload, ButtonProps } from 'antd';
import Textarea from '@mui/joy/Textarea';

import { useServer } from '@/hooks/useServer';
import { formatDate } from '@/lib/helper';
import type { Server } from '@/types/Server';

type ProfileServerTabProps = {
    hasUnsavedChanges: boolean;
    onDirtyChange: (dirty: boolean) => void;
    serverProfile: Server;
    setServerProfile: React.Dispatch<React.SetStateAction<Server>>;
};

function ProfileServerTab({ hasUnsavedChanges, onDirtyChange, serverProfile, setServerProfile }: ProfileServerTabProps) {

    const { serverId } = useParams();
    const { servers } = useServer();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));

    return (
        <div>
            <p className="text-xl font-bold capitalize mb-4">Server Profile</p>
            <div className='flex items-start gap-8 w-full'>
                {/* Server Profile Data*/}
                <div className='flex flex-col gap-4 w-2/3'>
                    <p className="text-[11px] font-semibold text-muted-text">Let customize your server appears!</p>

                    {/* Server Name */}
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="server-name" className="text-[14px] font-semibold text-foreground">Server Name</label>
                        <input
                            type="text"
                            id="server-name"
                            value={serverProfile.name || ''}
                            onChange={(e) => {
                                setServerProfile(prev => ({ ...prev, name: e.target.value }));
                                if (!hasUnsavedChanges) {
                                    onDirtyChange(true);
                                }
                            }}
                            className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent w-full"
                            placeholder='Enter your server name'
                        />
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-muted-border my-4" />

                    {/* FUTURE: Need to add more fields in server database */}
                    {/* Server Description */}
                    {/*<div className='flex flex-col gap-2 w-full'>*/}
                    {/*    <label htmlFor="server-name" className="text-[14px] font-semibold text-foreground">Description</label>*/}
                    {/*    <Textarea */}
                    {/*    placeholder="Write a description for your server..." */}
                    {/*    minRows={4}*/}
                    {/*    sx={{*/}
                    {/*        '--Textarea-focusedThickness': '0',*/}
                    {/*        backgroundColor: "var(--chat-panel)",*/}
                    {/*        border: "1px solid var(--muted-border)",*/}
                    {/*        color: "var(--foreground)",*/}
                    {/*        fontSize: "12px",*/}
                    {/*        '&:focus-within': {*/}
                    {/*            borderColor: 'var(--accent)',*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*    */}
                    {/*    />*/}
                    {/*</div>*/}

                    {/* Divider */}
                    {/*<div className="w-full h-px bg-muted-border my-4" />*/}

                    {/* Server Icon */}
                    <div className='flex flex-col gap-6 w-full'>
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="server-icon" className="text-[14px] font-semibold text-foreground">Icon</label>
                            <p className="text-[11px] font-semibold text-muted-text">We recommend an image of at least 512x512 pixels.</p>
                        </div>
                        <div className='flex gap-4'>
                            <Upload
                                name="avatar"
                                listType="picture"
                                showUploadList={false}
                                action="/upload.do"
                            >
                                <button className="bg-accent text-foreground hover:bg-accent/70 px-4 py-2 rounded-lg font-semibold cursor-pointer">Change Server Icon</button>
                            </Upload>
                            <button className="bg-muted-background text-error border border-muted-border hover:bg-muted-background/70 px-4 py-2 rounded-lg font-semibold cursor-pointer">Change Server Icon</button>
                        </div>
                    </div>
                </div>
                {/* Server Profile Card */}
                <div className="w-1/3 border border-muted-border rounded-lg overflow-hidden bg-chat-panel">
    
                    {/* Banner */}
                    <div className="relative h-24 w-full">
                        <Image
                        src="/server-img-default.png"
                        alt="Server Icon"
                        fill
                        className="object-cover"
                        />
                        {/* Avatar */}
                        <Avatar
                        size={64}
                        src="/logo.png"
                        className="absolute -bottom-16 left-4 border-4 border-background"
                        />
                    </div>
                    {/* Content Wrapper */}
                    <div className="relative pb-4 flex flex-col mt-10 gap-2 px-4">
                        {/* Server Name and Status */}
                        <div>
                            <p
                            className="text-[14px] font-bold"
                            >
                            {selectedServer?.name || "Server Name"}
                            </p>
                            <div className="flex items-center gap-4">
                                {/* FUTURE: Need online fields or something to show the number of onlines */}
                                {/*<div className="flex items-center gap-1">*/}
                                {/*    /!* Badge for online status *!/*/}
                                {/*    <div className="w-2 h-2 bg-success rounded-full"></div>*/}
                                {/*    <span className="text-[11px] font-semibold text-muted-text">5 Online</span>*/}
                                {/*</div>*/}
                                <div className="flex items-center gap-1">
                                    {/* Badge for online status */}
                                    <div className="w-2 h-2 bg-muted-background rounded-full"></div>
                                    <span className="text-[11px] font-semibold text-muted-text">{selectedServer?.memberCount || 0} Members</span>
                                </div>
                            </div>
                        </div>
                        {/* Creation Date */}
                        <p className="text-[11px] text-muted-text font-semibold">
                            EST. {formatDate(new Date(selectedServer?.createdAt || ''))}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileServerTab;