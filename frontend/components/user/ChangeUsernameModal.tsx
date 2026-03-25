import React from 'react';
import { toast } from "sonner";

import { useAuth } from '@/hooks/useAuth';
import {User} from "@/types/User";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from '../ui/Spinner';

type ChangeUsernameModalProps = {
    showUsernameEditingModal: boolean;
    setShowUsernameEditingModal: (show: boolean) => void;
}


function ChangeUsernameModal({ showUsernameEditingModal, setShowUsernameEditingModal }: ChangeUsernameModalProps) {

    const { updateUserInfo } = useAuth();
    const [ newUsername, setNewUsername ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const [isSaving, setIsSaving] = React.useState(false);

    const handleChangeUsername = async () => {
        setIsSaving(true);
        try {
            const updatedUserData:Partial<User> = {username: newUsername};
            await updateUserInfo(updatedUserData, password);
            setNewUsername("");
            setPassword("");
            setShowUsernameEditingModal(false);
            toast.success("Username changed successfully!");
        } catch (error) {
            console.error('Error updating username:', error);
            toast.error("Failed to change username.", {
                description: "Please ensure your password is correct and try again."
            });
        } finally {
            setIsSaving(false);
        }
    }

    const handleCancel = () => {
        setNewUsername("");
        setPassword("");
        setShowUsernameEditingModal(false);
    }

    return (
        <Dialog open={showUsernameEditingModal} onOpenChange={(open) => {
            if (!open) {
                setShowUsernameEditingModal(false);
            }
        }}>

            <form>
                <DialogContent className="sm:max-w-sm z-100">
                    <DialogHeader>
                        <DialogTitle>Change your username</DialogTitle>
                    </DialogHeader>
                    <div>
                        {/* Content */}
                        <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a new username and your existing password.</p>

                        <div className='flex flex-col gap-4 mb-6'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="newUsername" className="text-[14px] font-bold">New Username</label>
                                <input 
                                    type="text" 
                                    id="newUsername" 
                                    className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="password" className="text-[14px] font-bold">Current Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='flex justify-end gap-2'>
                            <button 
                                disabled={isSaving}
                                type='button'
                                onClick={handleCancel}
                                className='flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border cursor-pointer disabled:cursor-not-allowed disabled:opacity-70'
                            >
                                Cancel
                            </button>
                            <button 
                                disabled={isSaving}
                                type='button'
                                onClick={handleChangeUsername}
                                className='flex-1 flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white font-semibold cursor-pointer hover:bg-accent-hover transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70'
                            >
                                {isSaving && <Spinner />}
                                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default ChangeUsernameModal;