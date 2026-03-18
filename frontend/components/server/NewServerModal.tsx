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


    const [ isCreating, setIsCreating ] = useState(true);
    const [ isSucceed, setIsSucceed ] = useState(false);


    return (
        <div>
            <Modal
            centered
            title={ isSucceed ? "Your server is ready!" : "Customize Your Server" }
            open={showServerCreationModal}
            onCancel={() => {
                        setShowServerCreationModal(false);
                        setIsCreating(true);
                        setIsSucceed(false);
                    }}
            width={"25%"}
            styles={styles}
            closable={false}
            footer={null}
            >
                {
                    isSucceed ? (
                        <div className="flex flex-col items-center justify-center gap-4">
                            {/* <p className="text-center text-muted-text">Share this invite code with your friends to join the server:</p>
                            <div className="flex items-center gap-2">
                                <code className="bg-muted-background px-4 py-2 rounded font-mono text-accent">{inviteCode}</code>
                                <button
                                    className="px-3 py-2 bg-accent text-white rounded hover:bg-accent/80 cursor-pointer text-sm font-semibold"
                                    onClick={() => {
                                        navigator.clipboard.writeText(inviteCode);
                                        showSuccess("Invite code copied!");
                                    }}
                                >
                                    Copy
                                </button>
                            </div> */}
                        </div>
                    ) : isCreating ? (
                        <CreateServer onClose={() => {setShowServerCreationModal(false)}} changeView={() => setIsCreating(false)} />
                    ) : (
                        <JoinServer onClose={() => {setShowServerCreationModal(false)}} changeView={() => setIsCreating(true)} />
                    )   
                }
            </Modal>
        </div>
    );
}

export default NewServerModal;