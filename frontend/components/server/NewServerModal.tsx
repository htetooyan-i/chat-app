import React, { useState } from 'react';
import { Modal, ModalProps } from 'antd';

import CreateServer from './CreateServer';
import JoinServer from './JoinServer';
import { useNotification } from '@/hooks/useNotification';
import { useServer } from '@/hooks/useServer';
import {getErrorMessage} from "@/lib/api";

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

    const { createServer, joinServer } = useServer();

    const [ isCreating, setIsCreating ] = useState(true);
    const [ isSucceed, setIsSucceed ] = useState(false);
    const [ serverName, setServerName ] = useState("");
    const [ avatarUrl, setAvatarUrl ] = useState("");
    const [inviteCode, setInviteCode] = useState("");
    const { contextHolder, showSuccess, showError } = useNotification();


    const handleCreateNewServer = async () => {
        try {
            const invite = await createServer(serverName, avatarUrl);
            setInviteCode(invite);
            showSuccess("Server created successfully!");
            setIsSucceed(true);
        } catch (error) {
            showError(getErrorMessage(error, "Failed to create server"));
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
            await joinServer(finalCode);
            
            showSuccess("Joined server successfully!");
            setInviteCode("");
            setIsCreating(true);
            setShowServerCreationModal(false);
        } catch (error) {
            showError(getErrorMessage(error, "Failed to join server"));
        }
    };

    return (
        <div>
            {contextHolder}
            <Modal
            centered
            title={ isSucceed ? "Your server is ready!" : "Customize Your Server" }
            open={showServerCreationModal}
            onCancel={() => {
                        setShowServerCreationModal(false);
                        setIsCreating(true);
                        setIsSucceed(false);
                        setServerName("");
                        setAvatarUrl("");
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
                                setIsSucceed(false);
                                setServerName("");
                                setAvatarUrl("");
                            }}
                        >
                            Cancel
                        </button>
                        { !isSucceed && (
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
                                setIsSucceed(false);
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
                        <CreateServer isSucceed={isSucceed} serverName={serverName} setServerName={setServerName} inviteCode={inviteCode} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
                    ) : (
                        <JoinServer inviteCode={inviteCode} setInviteCode={setInviteCode} />
                    )   
                }

                {
                    !isSucceed && <button type="button" onClick={() => setIsCreating(prev => !prev)} className="underline text-accent font-[11px] my-2">{ isCreating ? "Already have an invite?" : "Want to create a new server?" }</button>
                }
            </Modal>
        </div>
    );
}

export default NewServerModal;