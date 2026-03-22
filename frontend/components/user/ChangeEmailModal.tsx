import React from 'react';
import { toast } from "sonner";

import { useAuth } from '@/hooks/useAuth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ChangeEmailModalProps = {
    showEmailEditingModal: boolean;
    setShowEmailEditingModal: (show: boolean) => void;
}

function ChangeEmailModal({ showEmailEditingModal, setShowEmailEditingModal }: ChangeEmailModalProps) {

    const { updateEmail } = useAuth();
    const [ newEmail, setNewEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");

    const handleChangeEmail = async () => {
        try {
            await updateEmail(newEmail, password);
            toast.success("Email changed successfully!");
        } catch (error) {
            console.error('Error updating email:', error);
            toast.error("Failed to change email.");
        }

        setNewEmail("");
        setPassword("");
        setShowEmailEditingModal(false);
    }

    const handleCancel = () => {
        setNewEmail("");
        setPassword("");
        setShowEmailEditingModal(false);
    }

    return (
        <Dialog open={showEmailEditingModal} onOpenChange={(open) => {
            if (!open) {
                setShowEmailEditingModal(false);
            }
        }}>

            <form>
                <DialogContent className="sm:max-w-sm z-100">
                    <DialogHeader>
                        <DialogTitle>Change your email address</DialogTitle>
                    </DialogHeader>
                    <div>
                        <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a new email and your existing password.</p>

                        <div className='flex flex-col gap-4 mb-6'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="newEmail" className="text-[14px] font-bold">New Email</label>
                                <input 
                                    type="text" 
                                    id="newEmail" 
                                    className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
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
                                type='button'
                                onClick={handleCancel}
                                className='flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border cursor-pointer'
                            >
                                Cancel
                            </button>
                            <button 
                                type='button'
                                onClick={handleChangeEmail}
                                className='flex-1 px-4 py-2 rounded-lg bg-accent text-white font-semibold cursor-pointer hover:bg-accent-hover transition-colors duration-200'
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default ChangeEmailModal;