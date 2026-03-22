import React from 'react';
import { Modal, ModalProps } from 'antd';
import { toast } from "sonner";

import { useChannel } from '@/hooks/useChannel';
import { getErrorMessage } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type EditChannelModalProps = {
    show: boolean;
    onClose: () => void;
};

function EditChannelModal({ show, onClose }: EditChannelModalProps) {

    const [ newChannelName, setNewChannelName ] = React.useState("");
    const { editChannelName } = useChannel();

    const changeChannelName = async (name: string) => {
        if (name.trim() === "") {
            toast.error("Channel name cannot be empty.", {
                description: "Please enter a valid channel name."
            });
            return;
        }

        try {
            await editChannelName(name);
            toast.success("Channel name updated successfully!");
            setNewChannelName("");
            onClose();
        } catch (err) {
            toast.error("Failed to update channel name.", {
                description: getErrorMessage(err, "An unexpected error occurred.")
            });
        }
    }

    return (
        <div>
            <Dialog open={show} onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}>

                <form>
                    <DialogContent className="sm:max-w-sm z-100">
                        <DialogHeader>
                            <DialogTitle>Change your channel name</DialogTitle>
                        </DialogHeader>
                        <div>
                            <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a new channel name.</p>

                            <div className='flex flex-col gap-4 mb-6'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="newChannelName" className="text-[14px] font-bold">New Channel Name</label>
                                    <input 
                                        type="text" 
                                        id="newChannelName" 
                                        className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                        value={newChannelName}
                                        onChange={(e) => setNewChannelName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end gap-2'>
                                <button 
                                    type='button'
                                    onClick={() => {
                                        onClose();
                                        setNewChannelName("");
                                    }}
                                    className='flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border cursor-pointer'
                                >
                                    Cancel
                                </button>
                                <button 
                                    type='button'
                                    onClick={() => changeChannelName(newChannelName)}
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

export default EditChannelModal;