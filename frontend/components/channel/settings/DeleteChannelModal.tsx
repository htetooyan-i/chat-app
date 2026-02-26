import React from 'react';
import { Modal, ModalProps } from 'antd';
import { X } from 'lucide-react';

import { useChannel } from '@/hooks/useChannel';

const modalStyles: ModalProps['styles'] = {
    mask: {
        backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
    },
  
    container: { 
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        borderRadius: '10px',
        border: '1px solid var(--muted-border)',
        overflow: 'hidden',
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

type DeleteChannelModalProps = {
    show: boolean;
    channelName: string;
    onClose: () => void;
    onConfirm: () => void;
};

function DeleteChannelModal({ show, channelName, onClose, onConfirm }: DeleteChannelModalProps) {

    return (
        <div>
            <Modal
            centered
            open={show}
            onCancel={onClose}
            width={"20%"}
            styles={modalStyles}
            footer={null}
            closable={false}
            title={
                <div className="flex items-center justify-between">
                    <span className="text-[23px] font-bold">Delete Channel</span>
                    <div
                        onClick={onClose}
                        className="flex items-center justify-center w-[32px] h-[32px] rounded-lg bg-transparent hover:bg-muted-background/30 transition-colors cursor-pointer"
                    >
                        <X />
                    </div>
                </div>
            }
            >
                <div className='flex flex-col items-center justify-center gap-5'>
                    <h2 className='text-sm font-medium text-muted-text'>Are you sure you want to delete #<span className='font-bold'>{channelName}</span>? This cannot be undone.</h2>
                    <div className='flex w-full gap-3'>
                        <button className='flex-1 font-bold bg-muted-background text-foreground px-4 py-2 rounded hover:bg-muted-background/30 transition-colors cursor-pointer' onClick={onClose}>Cancel</button>
                        <button className='flex-1 font-bold bg-error text-white px-4 py-2 rounded hover:bg-error/70 transition-colors cursor-pointer' onClick={onConfirm}>Delete Channel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default DeleteChannelModal;