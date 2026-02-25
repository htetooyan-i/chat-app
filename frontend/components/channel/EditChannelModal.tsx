import React from 'react';
import { Modal, ModalProps } from 'antd';
import { on } from 'events';

type EditChannelModalProps = {
    show: boolean;
    onClose: () => void;
    changeChannelName: (newName: string, password: string) => Promise<void>;
};


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

function EditChannelModal({ show, onClose, changeChannelName }: EditChannelModalProps) {

    const [ newChannelName, setNewChannelName ] = React.useState("");
    const [ password, setPassword ] = React.useState("");

    return (
        <div>
            <Modal
            centered
            footer={null}
            title="Change your channel name"
            open={show}
            onCancel={onClose}
            width={"30%"}
            styles={styles}
            closable={false}
            >
                <div>
                    <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a new channel name and your existing password.</p>

                    <div className='flex flex-col gap-4 mb-6'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="newChannelName" className="text-[14px] font-bold">New Channel Name</label>
                            <input 
                                type="text" 
                                id="newChannelName" 
                                className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                value={newChannelName}
                                onChange={(e) => setNewChannelName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password" className="text-[14px] font-bold">Current Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end gap-2'>
                        <button 
                            type='button'
                            onClick={onClose}
                            className='flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border cursor-pointer'
                        >
                            Cancel
                        </button>
                        <button 
                            type='button'
                            onClick={() => changeChannelName(newChannelName, password)}
                            className='flex-1 px-4 py-2 rounded-lg bg-accent text-white font-semibold cursor-pointer hover:bg-accent-hover transition-colors duration-200'
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default EditChannelModal;