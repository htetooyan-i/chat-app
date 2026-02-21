import React, { useState    } from 'react';
import { Modal, ModalProps } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

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

    const [ isCreating, setIsCreating ] = useState(true);
    const [ isSuccessed, setIsSuccessed ] = useState(false);
    const [serverName, setServerName] = useState(""); 
    const [inviteCode, setInviteCode] = useState("");
    const { contextHolder, showSuccess, showError } = useNotification();
    const { refreshServers } = useServer();

    const handleCreateNewServer = async () => {
        try {
            await api.post('/servers', { name: serverName });
            showSuccess("Server created successfully!");
            refreshServers();
            setIsSuccessed(true);
        } catch (error: any) {
            console.error("Error creating server:", error.message);
            showError(error.response?.data?.message || "Failed to create server.");
        }
    }

    const handleJoinServer = async () => {
        try {
            await api.post(`/invites/${inviteCode}`);
            showSuccess("Joined server successfully!");
            refreshServers();
            setShowServerCreationModal(false);
        } catch (error: any) {
            console.error("Error joining server:", error.message);
            showError(error.response?.data?.message || "Failed to join server.");
        }
    }

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
                                setServerName("");
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
                        <CreateServer handleCreateNewServer={handleCreateNewServer} isSuccessed={isSuccessed} setIsSuccessed={setIsSuccessed} serverName={serverName} setServerName={setServerName} />
                    ) : (
                        <JoinServer handleJoinServer={handleJoinServer} inviteCode={inviteCode} setInviteCode={setInviteCode} />
                    )   
                }

                <button type="button" onClick={() => setIsCreating(prev => !prev)} className="underline text-accent font-[11px] my-2">{ isCreating ? "Already have an invite?" : "Want to create a new server?" }</button>
            </Modal>
        </div>
    );
}

export default NewServerModal;