import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Modal, ModalProps } from 'antd';

import api from '@/lib/api';
import { useNotification } from '@/hooks/useNotification';
import { useServer } from '@/hooks/useServer';
import CreateServer from './CreateServer';
import JoinServer from './JoinServer';

const styles: ModalProps['styles'] = {
    mask: {
        backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
    },
  
    container: { 
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        borderRadius: '10px',
        border: '1px solid var(--muted-border)',
    },
    title: { 
        color: 'var(--foreground)',
        fontSize: '23px', 
        fontWeight: 'bold',
    },
    body: {
        color: 'var(--foreground)',
        overflowY: 'auto',
    },

};

type NewServerModalProps = {
    showServerCreationModal: boolean;
    setShowServerCreationModal: (show: boolean) => void;
}

function NewServerModal({ showServerCreationModal, setShowServerCreationModal }: NewServerModalProps) {

    const { refreshServers, addServer } = useServer();

    const [ isCreating, setIsCreating ] = useState(true);
    const [ isSuccessed, setIsSuccessed ] = useState(false);
    const [serverName, setServerName] = useState(""); 
    const [inviteCode, setInviteCode] = useState("");
    const { contextHolder, showSuccess, showError } = useNotification();


    const handleCreateNewServer = async () => {
        try {
            const res = await api.post('/servers', { name: serverName });
            const inviteRes = await api.post(`/servers/${res.data.server.id}/invites`);
            addServer(res.data.server);
            setInviteCode(inviteRes.data.code);
            showSuccess("Server created successfully!");
            refreshServers();
            setIsSuccessed(true);
        } catch (error: any) {
            console.error("Error creating server:", error.message);
            showError(error.response?.data?.message || "Failed to create server.");
        }
    }

    const handleJoinServer = async () => {
        let finalCode = inviteCode;

        // If the invite code is a URL, extract the code
        if (inviteCode.startsWith("http")) {
            const parts = inviteCode.split("/");
            finalCode = parts[parts.length - 1];
        }

        try {
            await api.post(`/invites/${finalCode}`);
            showSuccess("Joined server successfully!");
            refreshServers();
            setInviteCode("");
            setIsCreating(true);
            setShowServerCreationModal(false);
        } catch (error: any) {
            console.error("Error joining server:", error);
            const message =
                error.response?.data?.message || 
                error.message || 
                "Failed to join server.";

            showError(message);
        }
    };

    return (
        <div>
            {contextHolder}
            <Modal
            centered
            title={ isSuccessed ? "Your server is ready!" : "Customize Your Server" }
            open={showServerCreationModal}
            onCancel={() => {
                        setShowServerCreationModal(false);
                        setIsCreating(true);
                        setIsSuccessed(false);
                        setServerName("");
                    }}
            width={"25%"}
            styles={styles}
            closable={false}
            footer={
                isCreating ? (
                    <div className="flex justify-end gap-2">
                        <button
                            className="flex-1 px-4 py-2 bg-muted-background border border-muted-border font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                            onClick={() => {
                                setShowServerCreationModal(false);
                                setIsCreating(true);
                                setIsSuccessed(false);
                                setServerName("");
                            }}
                        >
                            Cancel
                        </button>
                        { !isSuccessed && ( 
                            <button
                                className="flex-1 px-4 py-2 bg-accent font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                                onClick={handleCreateNewServer}
                            >
                                Create
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex justify-end gap-2">
                        <button
                            className="flex-1 px-4 py-2 bg-muted-background border border-muted-border font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                            onClick={() => {
                                setShowServerCreationModal(false);
                                setIsCreating(true);
                                setIsSuccessed(false);
                                setInviteCode("");
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
                )
            }
            >
                {
                    isCreating ? (
                        <CreateServer isSuccessed={isSuccessed} serverName={serverName} setServerName={setServerName} inviteCode={inviteCode} />
                    ) : (
                        <JoinServer inviteCode={inviteCode} setInviteCode={setInviteCode} />
                    )   
                }

                {
                    !isSuccessed && <button type="button" onClick={() => setIsCreating(prev => !prev)} className="underline text-accent font-[11px] my-2">{ isCreating ? "Already have an invite?" : "Want to create a new server?" }</button>    
                }
            </Modal>
        </div>
    );
}

export default NewServerModal;