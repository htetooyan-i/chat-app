import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";

import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { parsePasswordValidation } from '@/lib/helper';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ChangePasswordModalProps = {
    showPasswordEditingModal: boolean;
    setShowPasswordEditingModal: (show: boolean) => void;
}

function ChangePasswordModal({ showPasswordEditingModal, setShowPasswordEditingModal }: ChangePasswordModalProps) {

    const { updatePassword, user } = useAuth();
    const [ currentPassword, setCurrentPassword ] = React.useState("");
    const [ newPassword, setNewPassword ] = React.useState("");
    const [ confirmPassword, setConfirmPassword ] = React.useState("");
    const [ isConfirmPasswordVisible, setIsConfirmPasswordVisible ] = React.useState(false);
    const [ isNewPasswordVisible, setIsNewPasswordVisible ] = React.useState(false);
    const [ isCurrentPasswordVisible, setIsCurrentPasswordVisible ] = React.useState(false);

    const isPasswordInvalid = !parsePasswordValidation(newPassword) || newPassword !== confirmPassword;

    const handleChangePassword = async () => {
        try {
            await updatePassword(newPassword, currentPassword);
            toast.success("Password changed successfully!");
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error("Failed to change password.", {
                description: "Please ensure your current password is correct and try again."
            });
        }

        setNewPassword("");
        setCurrentPassword("");
        setConfirmPassword("");
        setShowPasswordEditingModal(false);
    }

    const handleResetPassword = async () => {
        if (!user) return;
        try {
            await api.post('/auth/request-password-reset', { email: user.email });
            toast.success("Password reset email sent successfully!", {
                description: `Please check your email ${user.email} for further instructions.`
            });
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error("Failed to reset password.");
        }
    }
    const handleCancel = () => {
        setNewPassword("");
        setCurrentPassword("");
        setConfirmPassword("");
        setShowPasswordEditingModal(false);
    }

    return (
        <div>
            <Dialog open={showPasswordEditingModal} onOpenChange={(open) => {
                        if (!open) {
                            setShowPasswordEditingModal(false);
                        }
                    }}>
            
                <form>
                    <DialogContent className="sm:max-w-sm z-100">
                        <DialogHeader>
                            <DialogTitle>Change your password</DialogTitle>
                        </DialogHeader>
                        <div>
                            <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a new password and your existing password.</p>

                            <div className='flex flex-col gap-4 mb-6'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="newPassword" className="text-[14px] font-bold">Current Password <span className="text-error">*</span></label>
                                    <div className='relative'>
                                        <input 
                                            type={isCurrentPasswordVisible ? "text" : "password"} 
                                            id="currentPassword" 
                                            className="w-full bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                        {
                                            isCurrentPasswordVisible ? (
                                                <EyeOff type="button" onClick={() => setIsCurrentPasswordVisible(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                                            ) : (
                                                <Eye type="button" onClick={() => setIsCurrentPasswordVisible(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="password" className="text-[14px] font-bold">New Password <span className="text-error">*</span></label>
                                    <div className='relative'>
                                        <input 
                                            type={isNewPasswordVisible ? "text" : "password"} 
                                            id="newPassword" 
                                            className="w-full bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        {
                                            isNewPasswordVisible ? (
                                                <EyeOff type="button" onClick={() => setIsNewPasswordVisible(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                                            ) : (
                                                <Eye type="button" onClick={() => setIsNewPasswordVisible(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="confirmPassword" className="text-[14px] font-bold">Confirm New Password <span className="text-error">*</span></label>
                                    <div className='relative'>
                                        <input 
                                            type={isConfirmPasswordVisible ? "text" : "password"} 
                                            id="confirmPassword" 
                                            className="w-full bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        {
                                            isConfirmPasswordVisible ? (
                                                <EyeOff type="button" onClick={() => setIsConfirmPasswordVisible(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                                            ) : (
                                                <Eye type="button" onClick={() => setIsConfirmPasswordVisible(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={'text-xs underline text-accent cursor-pointer'} onClick={handleResetPassword}> Forget password?</div>
                            </div>
                            <div className='mb-4'>
                                {!parsePasswordValidation(newPassword) && newPassword && <p className="text-red-500 text-[12px] mt-1">Password must be at least 8 characters with uppercase, lowercase, and a number</p>}
                                {parsePasswordValidation(newPassword) && isPasswordInvalid && <p className="text-red-500 text-[12px] mt-1">Passwords do not match</p>}
                            </div>

                            <div className='flex justify-end gap-2'>
                                <button 
                                    type='button'
                                    onClick={handleCancel}
                                    className='flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border cursor-pointer'
                                >
                                    Cancel
                                </button>
                                <button 
                                    type='button'
                                    disabled={isPasswordInvalid}
                                    onClick={handleChangePassword}
                                    className='flex-1 px-4 py-2 rounded-lg bg-accent text-white font-semibold cursor-pointer hover:bg-accent-hover transition-colors duration-200'
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default ChangePasswordModal;