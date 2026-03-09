import React from 'react';
import { Camera, User } from 'lucide-react';
import { Avatar, ModalProps } from 'antd';
import Image from 'next/image';

import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useUserSettingLayout } from '@/hooks/useUserSettingsLayout';

function UserGeneralInfo() {

    const { user, refreshUser } = useAuth();
    const { setShowUsernameEditingModal, setShowEmailEditingModal } = useUserSettingLayout();
    

    const handleChangeEmail = async (newEmail: string) => {
        try {
            const res = await api.patch('/users/me', { email: newEmail });
            console.log('Email updated successfully:', res.data);
            await refreshUser();
        } catch (error) {
            console.error('Error updating email:', error);
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 mx-auto bg-sidebar mt-10 p-5 rounded-lg">

            {/* Profile Img */}
            <div className='flex justify-start items-center py-4 gap-4 w-full'>
                <div className="relative group cursor-pointer">
                    <Avatar shape="circle" size={86}>
                        <Image
                        src="/logo.png"
                        alt="avatar"
                        width={86}
                        height={86}
                        style={{ objectFit: "cover", borderRadius: "100%" }}
                        />
                    </Avatar>

                    {/* Hover Mask */}
                    {/* ancher is for temporary just for maintenance */}
                    <a href="/maintenance" className="absolute inset-0 bg-transparent rounded-full 
                                        opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-300 
                                        flex items-center justify-center text-white">
                        <div className="absolute inset-0 bg-black/50 rounded-full 
                                        opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-300 
                                        flex items-center justify-center">
                            <Camera style={{color: "#c0c0c0"}}/>
                        </div>
                    </a>

                </div>
                <p className="text-lg font-semibold">{user?.username}</p>
            </div>
            <div className='flex flex-col gap-4 bg-muted-background p-4 rounded-lg w-full'>
                {/*<UserSettingsEditInput */}
                {/*    label="Username"*/}
                {/*    value={user?.username || ""}*/}
                {/*    changeValue={handleChangeUsername}*/}
                {/*/>*/}
                {/*<UserSettingsEditInput */}
                {/*    label="Email"*/}
                {/*    value={user?.email || ""}*/}
                {/*    changeValue={handleChangeEmail}*/}
                {/*/> */}

                {/* Username */}
                <div className='flex justify-between items-start gap-4'>
                    <div className='relative flex-1 flex flex-col gap-1'>
                        <p className='font-bold text-[14px]'>Username</p>
                        <p className='font-medium text-[12px]'>{user?.username}</p>
                    </div>
                    <div>
                        <button 
                            className="px-4 py-1 rounded-lg border border-muted-border cursor-pointer hover:border-accent hover:text-accent transition-colors duration-200"
                            onClick={() => setShowUsernameEditingModal(true)}
                        >
                            Edit
                        </button>
                    </div>
                </div>

                {/* Email */}
                <div className='flex justify-between items-start gap-4'>
                    <div className='relative flex-1 flex flex-col gap-1'>
                        <p className='font-bold text-[14px]'>Email</p>
                        <p className='font-medium text-[12px]'>{user?.email}</p>
                    </div>
                    <div>
                        <button 
                            className="px-4 py-1 rounded-lg border border-muted-border cursor-pointer hover:border-accent hover:text-accent transition-colors duration-200"
                            onClick={() => setShowEmailEditingModal(true)}
                        >
                            Edit
                        </button>
                    </div>
                </div>

                {/* FUTURE: phone number for verify account */}
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col gap-1'>
                        <p className='font-bold text-[13px]'>Phone Number <span className='text-error'>[/* You can&#39;t add phone number for now */]</span></p>
                        <p className='font-medium text-[12px]'>******093 </p>
                    </div>
                    <div>
                        <button disabled className="px-4 py-1 rounded-lg border border-muted-border cursor-not-allowed ">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserGeneralInfo;