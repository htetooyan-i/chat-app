import React, {useRef} from 'react';

import UserProfile from './UserProfile';
import { useAuth } from '@/hooks/useAuth';
import { useUserSettingLayout } from '@/hooks/useUserSettingsLayout';

function UserGeneralInfo() {

    const { user } = useAuth();
    const { setShowUsernameEditingModal, setShowEmailEditingModal } = useUserSettingLayout();

    return (
        <div className="flex flex-col items-center gap-4 mx-auto bg-sidebar mt-10 p-5 rounded-lg">

            {/* Profile Img */}
            <UserProfile />
            <div className='flex flex-col gap-4 bg-muted-background p-4 rounded-lg w-full'>
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
                {/*<div className='flex justify-between items-start'>*/}
                {/*    <div className='flex flex-col gap-1'>*/}
                {/*        <p className='font-bold text-[13px]'>Phone Number</p>*/}
                {/*        <p className='font-medium text-[12px]'>******093 </p>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <button disabled className="px-4 py-1 rounded-lg border border-muted-border cursor-not-allowed ">Edit</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default UserGeneralInfo;