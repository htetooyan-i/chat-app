import React from 'react';
import { useRouter, useParams } from 'next/navigation';

import { useServer } from '@/hooks/useServer';
import { useChannel } from '@/hooks/useChannel';
import { useNotification } from '@/hooks/useNotification';
import {getErrorMessage} from "@/lib/api";
import { Server } from '@/types/Server';

type DeleteServerTabProps = {
    selectedServer: Server;
    onClose: () => void;
};

function DeleteServerTab({ selectedServer, onClose }: DeleteServerTabProps) {

    const router = useRouter();
    
    const { servers, deleteServer } = useServer();
    const { channelsByServer, clearServerCache } = useChannel();

    const { contextHolder, showSuccess, showError } = useNotification();

    const [ confirmationName, setConfirmationName ] = React.useState("");

    const handleDeleteServer = async () => {
        try {   
            await deleteServer(selectedServer.id!);
            clearServerCache(selectedServer.id);

            // navigate first before refreshing
            if (servers.length > 0) {
                const cached = channelsByServer[servers[0].id];
                if (cached?.[0]) {
                    router.push(`/servers/${servers[0].id}/channels/${cached[0].id}`);
                } else {
                    router.push(`/servers/${servers[0].id}/channels`);
                }
            } else {
                router.push("/servers");
            }

            showSuccess("Server deleted successfully");
            onClose();
        } catch (error) {
            showError(getErrorMessage(error, "Failed to delete server."));
        }
    };
    return (
        <div>
            {contextHolder}
            <p className="text-xl font-bold capitalize">Delete Server</p>
            <div className="py-4">
                {/* Description */}
                <div>
                    <p className='text-muted-text font-semibold text-[11px]'>Are you sure you want to delete <span className='uppercase'>{selectedServer.name}</span>?</p>
                    <p className="text-error mb-4 font-semibold text-[11px]">This action is irreversible. All data in this server will be permanently deleted.</p>
                </div>
                {/* Confirmation Input */}
                <div className='flex flex-col gap-1 w-1/2'>
                    <label htmlFor="serverName" className="text-[14px] font-bold">Server Name <span className='text-error'>*</span></label>
                    <input 
                        type="text" 
                        id="serverName" 
                        value={confirmationName}
                        onChange={(e) => setConfirmationName(e.target.value)}
                        className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                        placeholder='Enter your server name to confirm deletion'
                    />
                </div>
                {/* Action Buttons */}
                <div className='flex gap-2'>
                    <button 
                        onClick={() => {
                            setConfirmationName("");
                            onClose();
                        }}
                        className="bg-muted-background border border-muted-border text-foreground px-4 py-2 rounded-md disabled:opacity-50 mt-4 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            handleDeleteServer();
                            setConfirmationName("");
                        }}
                        disabled={confirmationName.toUpperCase() !== selectedServer.name.toUpperCase()}
                        className="bg-error hover:bg-error/70 text-foreground px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
                    >
                        Delete Server
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteServerTab;