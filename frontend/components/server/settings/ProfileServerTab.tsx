import React, {type SetStateAction, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import { Avatar } from 'antd';
import { toast } from "sonner"

import { useServer } from '@/hooks/useServer';
import {formatDate, isImage} from '@/lib/helper';
import type { Server } from '@/types/Server';
import {useMediaUpload} from "@/hooks/useMediaUpload";
import ProfilePreviewModal from "@/components/ui/ProfilePreviewModal";
import {getErrorMessage} from "@/lib/api";
import { useServerLayout } from '@/hooks/useServerLayout';

type ProfileServerTabProps = {
    selectedServer: Server;
}


function ProfileServerTab({ selectedServer }: ProfileServerTabProps) {


    const { setSettingTabCollapsed } = useServerLayout();
    const { updateServer } = useServer();

    const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState<boolean>(false);
    const [ profileForm, setProfileForm ] = useState<Server | null>(null);
    const setServerProfile = (value: SetStateAction<Server>) => {
        setProfileForm(value as SetStateAction<Server | null>);
    };

    useEffect(() => {
        if (selectedServer) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProfileForm(selectedServer);
            setHasUnsavedChanges(false);
        }
    }, [selectedServer]);

    const handleSaveProfileChanges = async () => {
        try {
            await updateServer(profileForm!);
            toast.success("Server profile updated successfully");
            setHasUnsavedChanges(false);
        } catch (error) {
            toast.error("Failed to update server profile.", {
                description: getErrorMessage(error, "Failed to update server profile.")
            });
        }
    }

    const handleResetAvatar = () => {
        setServerProfile(prev => ({ ...prev, avatarUrl: null }));
        if (!hasUnsavedChanges) {
            setHasUnsavedChanges(true);
        }
    }

    const { upload } = useMediaUpload();

    {/* FIXME: Combine preview in this page and user profile page*/}
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);
    const localAvatarUrl = croppedPreviewUrl || profileForm?.avatarUrl || "/server-img-default.png";
    const [modalOpen, setModalOpen] = useState(false);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !isImage(file)) {
            e.target.value = '';
            return;
        }
        // Just set a local preview — don't upload yet
        setPreviewUrl(URL.createObjectURL(file));
        setModalOpen(true);
        e.target.value = '';
    };

    const handleConfirm = async (blob: Blob) => {
        setCroppedPreviewUrl(URL.createObjectURL(blob)); // instant preview

        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
        const uploaded = await upload(file);
        setServerProfile(prev => ({ ...prev, avatarUrl: uploaded.url }));
        if (!hasUnsavedChanges) setHasUnsavedChanges(true);
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setPreviewUrl(null);
    };

    if (!profileForm) return null;
    return (
        <div>
            {/* Crop Modal */}
            <ProfilePreviewModal
                open={modalOpen}
                previewUrl={previewUrl}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <p className="text-xl font-bold capitalize my-4" onClick={() => setSettingTabCollapsed(prev => !prev)}>
                Server Profile
            </p>
            <div className='flex flex-col-reverse lg:flex-row items-start gap-8 w-full'>
                {/* Server Profile Data*/}
                <div className='flex flex-col gap-4 w-full lg:w-2/3'>
                    <p className="text-[11px] font-semibold text-muted-text">Let customize your server appears!</p>

                    {/* Server Name */}
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="server-name" className="text-[14px] font-semibold text-foreground">Server Name</label>
                        <input
                            type="text"
                            id="server-name"
                            value={profileForm.name || ''}
                            onChange={(e) => {
                                setServerProfile(prev => ({ ...prev, name: e.target.value }));
                                if (!hasUnsavedChanges) {
                                    setHasUnsavedChanges(true);
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
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <button className="bg-accent text-foreground hover:bg-accent/70 px-4 py-2 rounded-lg font-semibold cursor-pointer" onClick={() => fileInputRef.current?.click()}>Change Server Icon</button>
                            <button className="bg-error-background text-error border border-error hover:bg-error-background/70 px-4 py-2 rounded-lg font-semibold cursor-pointer" onClick={handleResetAvatar}>Reset Server Icon</button>
                        </div>
                    </div>
                </div>
                {/* Server Profile Card */}
                <div className="w-full lg:w-1/3 border border-muted-border rounded-lg overflow-hidden bg-chat-panel">
    
                    {/* Banner */}
                    <div className="relative h-24 w-full">
                        <Image
                        src="/logo.png"
                        alt="Server Icon"
                        fill
                        className="object-cover"
                        />
                        {/* Avatar */}
                        <Avatar
                        size={64}
                        src={localAvatarUrl}
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
            {/* Footer */}
            <div className={`absolute bottom-5 right-20 flex justify-between items-center gap-2 px-4 py-2 bg-chat-panel rounded-md w-[75%] shadow-lg shadow-accent/10 transition-all duration-500 ease-in-out ${hasUnsavedChanges ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* FIXME: Add thi to profile tab */}
                <div>
                    <p className="text-md font-semibold text-foreground">Careful - you have unsaved changes!</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-muted-background text-error border border-muted-border hover:bg-muted-background/70 px-2 py-1 rounded-lg font-semibold cursor-pointer" onClick={() => { // TODO: This should be changed in future, this works but it's not ideal to reset the form like this
                        setHasUnsavedChanges(false);
                        setCroppedPreviewUrl(null);
                        setProfileForm(selectedServer!);
                    }}>Reset</button>
                    <button className="bg-accent text-foreground hover:bg-accent/70 px-2 py-1 rounded-lg font-semibold cursor-pointer" onClick={handleSaveProfileChanges}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileServerTab;