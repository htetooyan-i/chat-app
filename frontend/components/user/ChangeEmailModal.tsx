import React from 'react';
import { toast } from "sonner";

import { useAuth } from '@/hooks/useAuth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from '../ui/Spinner';

type ChangeEmailModalProps = {
    showEmailEditingModal: boolean;
    setShowEmailEditingModal: (show: boolean) => void;
}

function ChangeEmailModal({ showEmailEditingModal, setShowEmailEditingModal }: ChangeEmailModalProps) {

    const { updateEmail } = useAuth();
    const [ newEmail, setNewEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const [isSaving, setIsSaving] = React.useState(false);

    const handleChangeEmail = async () => {
        setIsSaving(true);
        try {
            await updateEmail(newEmail, password);
            toast.success("Email changed successfully!");
            setNewEmail("");
            setPassword("");
            setShowEmailEditingModal(false);
        } catch (error) {
            console.error('Error updating email:', error);
            toast.error("Failed to change email.");
        } finally {
            setIsSaving(false);
        }
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
                                disabled={isSaving}
                                onClick={handleCancel}
                                className='flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border cursor-pointer disabled:cursor-not-allowed disabled:opacity-70'
                            >
                                Cancel
                            </button>
                            <button 
                                type='button'
                                disabled={isSaving}
                                onClick={handleChangeEmail}
                                className='flex-1 flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white font-semibold cursor-pointer hover:bg-accent-hover transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2'
                            >
                                {isSaving && <Spinner />}
                                <span>{isSaving ? "Saving..." : "Save"}</span>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default ChangeEmailModal;