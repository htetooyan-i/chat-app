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

    return (
        <div>
            <Modal
            centered
            title={ isCreating ? "Customize Your Server" : "Join Server" }
            open={showServerCreationModal}
            onCancel={() => {
                        setShowServerCreationModal(false);
                        setIsCreating(true);
                    }}
            width={"25%"}
            styles={styles}
            closable={false}
            footer={null}
            >
                {
                    isCreating ? (
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