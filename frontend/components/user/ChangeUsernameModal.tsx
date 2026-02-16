import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Modal, ModalProps } from 'antd';


import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';

type ChangeUsernameModalProps = {
    showUsernameEditingModal: boolean;
    setShowUsernameEditingModal: (show: boolean) => void;
}

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

function ChangeUsernameModal({ showUsernameEditingModal, setShowUsernameEditingModal }: ChangeUsernameModalProps) {

    const { refreshUser } = useAuth();
    const [ newUsername, setNewUsername ] = React.useState("");
    const [ password, setPassword ] = React.useState("");
    const { contextHolder, showSuccess, showError } = useNotification();

    const handleChangeUsername = async () => {
        try {
            await api.patch('/users/me', { username: newUsername, password });
            showSuccess("Username changed successfully!");
            await refreshUser();
        } catch (error) {
            console.error('Error updating username:', error);
            showError("Failed to change username.");
        }

        setNewUsername("");
        setPassword("");
        setShowUsernameEditingModal(false);
    }

    const handleCancel = () => {
        setNewUsername("");
        setPassword("");
        setShowUsernameEditingModal(false);
    }

    return (
        <div>
            {contextHolder}
            <Modal
            centered
            footer={null}
            title="Change your username"
            open={showUsernameEditingModal}
            onCancel={() => setShowUsernameEditingModal(false)}
            width={"30%"}
            styles={styles}
            closable={false}
            >
                <div>
                    <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a new username and your existing password.</p>

                    <div className='flex flex-col gap-4 mb-6'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="newUsername" className="text-[14px] font-bold">New Username</label>
                            <input 
                                type="text" 
                                id="newUsername" 
                                className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
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
                            onClick={handleCancel}
                            className='flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border cursor-pointer'
                        >
                            Cancel
                        </button>
                        <button 
                            type='button'
                            onClick={handleChangeUsername}
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

export default ChangeUsernameModal;