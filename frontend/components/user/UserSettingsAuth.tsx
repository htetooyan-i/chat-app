import { toast } from "sonner";

import { api } from "@/lib/api";
import { handleMaintenanceRoute } from '@/lib/helper';
import { useUserSettingLayout } from '@/hooks/useUserSettingsLayout';
import { useAuth } from "@/hooks/useAuth";


function UserSettingsPassword() {

    const { setShowPasswordEditingModal } = useUserSettingLayout();
    const { user } = useAuth();

    const handleVerifyEmail = async () => {
        try {
            api.post("/auth/send-verification-email");
            toast.success("Verification email sent successfully", {
                description: `Please check your email ${user?.email} for further instructions.`
            });
        } catch (error) {
            toast.error("Failed to send verification email", {
                description: "An unexpected error occurred."
            });
        }
    }

    return (
        <>
            <div className='flex flex-col justify-start items-start gap-4 mx-auto my-2 py-5'>
                <p className='text-lg font-semibold mb-4'>Password and Authentication</p>

                <button onClick={() => setShowPasswordEditingModal(true)} className='bg-accent hover:opacity-80 text-foreground px-4 py-2 rounded-md cursor-pointer font-semibold transition-opacity'>Change Password</button>

                <div className={`${user?.verified ? "hidden" : "block"}`}>
                    <p className='text-lg font-semibold mb-4'>Email Verification</p>

                    <button onClick={handleVerifyEmail} className='bg-accent hover:opacity-80 text-foreground px-4 py-2 rounded-md cursor-pointer font-semibold transition-opacity'>Verify Email</button>
                </div>

                <div>
                    <div className='mb-4'>
                        <p className='text-lg font-semibold mb-1'>Authenticator App</p>
                        <p className='text-muted-text font-medium text-[12px]'>Protect your Discord account with an extra layer of security. Once configured, you&#39;ll be required to enter your password and complete one additional step in order to sign in.</p>
                    </div>
                    <button onClick={handleMaintenanceRoute} className='bg-accent hover:opacity-80 text-foreground px-4 py-2 rounded-md cursor-pointer font-semibold transition-opacity'>Enable Authenticator App</button>
                </div>
            </div>
        </>
    );
}

export default UserSettingsPassword;