import React, { useState } from 'react';
import { Modal, ModalProps } from 'antd';

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

type CreateNewChannelModalProps = {
    showCreateChannelModal: boolean;
    setShowCreateChannelModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleCreateChannel: (channelName: string) => void;
};

function CreateNewChannelModal({ showCreateChannelModal, setShowCreateChannelModal, handleCreateChannel }: CreateNewChannelModalProps) {

    const [channelName, setChannelName] = useState("");

    const handleSubmit = () => {
        handleCreateChannel(channelName);
        setShowCreateChannelModal(false);
    };

    return (
        <div>
            <Modal
            centered
            title={ "Customize Your New Channel" }
            open={showCreateChannelModal}
            onCancel={() => {setShowCreateChannelModal(false), setChannelName("")}}
            width={"25%"}
            styles={styles}
            closable={false}
            footer={
                <div className="flex justify-end gap-2">
                    <button
                        className="flex-1 px-4 py-2 bg-muted-background border border-muted-border font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                        onClick={() => {setShowCreateChannelModal(false), setChannelName("")}}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 px-4 py-2 bg-accent font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                </div>
            }
            >
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

            </Modal>
        </div>
    );
}

export default CreateNewChannelModal;