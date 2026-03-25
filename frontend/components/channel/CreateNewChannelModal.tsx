import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from "sonner";

import { useChannel } from '@/hooks/useChannel';
import { getErrorMessage } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from '../ui/Spinner';


type CreateNewChannelModalProps = {
    showCreateChannelModal: boolean;
    setShowCreateChannelModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateNewChannelModal({ showCreateChannelModal, setShowCreateChannelModal }: CreateNewChannelModalProps) {


    const router = useRouter();
    const params = useParams();
    const serverId = Array.isArray(params.serverId)
                    ? params.serverId[0]
                    : params.serverId;
    const [channelName, setChannelName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { createChannel } = useChannel();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const newChannel = await createChannel(channelName);
            if (newChannel) {
                router.push(`/channels/${serverId}/${newChannel.id}`);
                toast.success("Channel created successfully!");
                setChannelName("");
                setShowCreateChannelModal(false);
            }
        } catch (err) {
            toast.error("Failed to create channel.", {
                description: getErrorMessage(err, "An unexpected error occurred.")
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Dialog open={showCreateChannelModal} onOpenChange={(open) => {
                if (!open) {
                    setShowCreateChannelModal(false);
                    setChannelName("");
                }
            }}>
            
                <form>
                    <DialogContent className="sm:max-w-sm z-100">
                        <DialogHeader>
                            <DialogTitle>Customize your New Channel</DialogTitle>
                        </DialogHeader>
                        <main className="flex flex-col gap-2 items-center justify-center">
                            <p className='text-[12px] text-muted-text'>Give your new channel a personality with a name. You can always change it later.</p>
                            <div className='flex flex-col gap-1 w-full'>
                                <label htmlFor="newChannelName" className="text-[14px] font-bold">Channel Name <span className='text-error'>*</span></label>
                                <input 
                                    type="text" 
                                    id="newChannelName" 
                                    className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                    value={channelName}
                                    placeholder='Server Name'
                                    onChange={(e) => setChannelName(e.target.value)}
                                />
                            </div>
                        </main>
                        <div className="flex justify-end gap-2">
                            <button
                                disabled={isSubmitting}
                                className={`flex-1 px-4 py-2 bg-muted-background border border-muted-border font-semibold text-foreground rounded ${isSubmitting ? "cursor-not-allowed opacity-70" : "hover:opacity-80 cursor-pointer"}`}
                                onClick={() => {setShowCreateChannelModal(false), setChannelName("")}}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isSubmitting}
                                className={`flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-accent font-semibold text-foreground rounded ${isSubmitting ? "cursor-progress opacity-70" : "hover:opacity-80 cursor-pointer"}`}
                                onClick={handleSubmit}
                            >
                                {isSubmitting ? <Spinner /> : null}
                                {isSubmitting ? "Creating..." : "Create Channel"}
                            </button>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
}

export default CreateNewChannelModal;