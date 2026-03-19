import { useState } from 'react';
import { toast } from "sonner";

import { useServer } from '@/hooks/useServer';
import { getErrorMessage } from '@/lib/api';

type JoinServerProps = {
    onClose: () => void;
    changeView: () => void;
}

function JoinServer({ onClose, changeView }: JoinServerProps) {

    const { joinServer, refreshServers } = useServer();
    const [ inviteCode, setInviteCode ] = useState("");

    const handleJoinServer = async () => {
        let finalCode = inviteCode;

        // If the invite code is a URL, extract the code
        if (inviteCode.startsWith("http")) {
            const parts = inviteCode.split("/");
            finalCode = parts[parts.length - 1];
        }

        try {
            await joinServer(finalCode);
            await refreshServers();
            // queueMicrotask(() => {
            //     showSuccess("Server joined successfully!");
            // });
            setInviteCode("");
            onClose();
        } catch (error) {
            console.error("Failed to join server:", error);
            queueMicrotask(() => {
                toast.error("Failed to join server. Please check the invite code and try again.", {
                    description: getErrorMessage(error, "Failed to join server. Please check the invite code and try again.")
                });
            });
        }
    };

    return (
        <>
            <main className="flex flex-col gap-10 items-center justify-center">
                <p className='text-[12px] text-muted-text w-full'>Enter an invite code below to join a server.</p>
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="inviteCode" className="text-[14px] font-bold">Invite Code <span className='text-error'>*</span></label>
                    <input 
                        type="text" 
                        id="inviteCode" 
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                    />
                    <div className='my-2'>
                        <p className="text-[12px] text-muted-text">Invite code should like</p>
                        <div className="flex gap-1">
                            <span className="text-[9px] text-muted-text px-1 py-2 rounded-md bg-muted-background">h2Tvh3jk</span>
                            <span className="text-[9px] text-muted-text px-1 py-2 rounded-md bg-muted-background">https://localhost:4000/invites/h2Tvh3jk</span>
                        </div>
                    </div>
                </div>
            </main>
            <button type="button" onClick={changeView} className="underline text-accent font-[11px] my-2 cursor-pointer">Want to create a new server?</button>
            {/* Footer */}
            <div className="flex justify-end gap-2">
                <button
                    className="flex-1 px-4 py-2 bg-muted-background border border-muted-border font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                    onClick={() => {
                        setInviteCode("");
                        onClose();
                    }}
                >
                    Cancel
                </button>
                <button
                    className="flex-1 px-4 py-2 bg-accent font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                    onClick={handleJoinServer}
                >
                    Join
                </button>
            </div>
        </>
    );
}

export default JoinServer;