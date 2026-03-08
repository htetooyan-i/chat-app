"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { X } from 'lucide-react';

import UserGeneralInfo from '@/components/user/UserGeneralInfo';
import UserSettingsPassword from '@/components/user/UserSettingsPassword';
import { useUserSettingLayout } from '@/hooks/useUserSettingsLayout';
import ChangeUsernameModal from '@/components/user/ChangeUsernameModal';
import ChangeEmailModal from '@/components/user/ChangeEmailModal';
import ChangePasswordModal from '@/components/user/ChangePasswordModal';
import AccountRemoval from '@/components/user/AccountRemoval';

function page() {

    const { showPasswordEditingModal, setShowPasswordEditingModal, showEmailEditingModal, setShowEmailEditingModal, showUsernameEditingModal, setShowUsernameEditingModal } = useUserSettingLayout();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const handleGoBack = () => {
        if (from) {
            router.replace(from);
        } else {
            window.history.back();
        }
    };



    return (
        <div className='bg-background'>
            
            <ChangeUsernameModal showUsernameEditingModal={showUsernameEditingModal} setShowUsernameEditingModal={setShowUsernameEditingModal} />
            <ChangeEmailModal showEmailEditingModal={showEmailEditingModal} setShowEmailEditingModal={setShowEmailEditingModal} />
            <ChangePasswordModal showPasswordEditingModal={showPasswordEditingModal} setShowPasswordEditingModal={setShowPasswordEditingModal} />

            <header className="w-2/3 mx-auto px-4 py-2">
                <div className="flex items-center justify-between gap-4">
                    <p className="font-bold" style={{fontSize: "23px"}}>My Account</p>
                    <X size={32} className="text-muted-text hover:text-foreground cursor-pointer transition-colors" onClick={handleGoBack} />
                </div>
            </header>
            <main className="w-2/3 mx-auto px-4 py-6">
                <UserGeneralInfo />
                <UserSettingsPassword />
                <hr className="border-muted-border" />
                <AccountRemoval />
            </main>
        </div>
    );
}

export default page;