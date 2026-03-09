import React, { useState } from 'react';
import { Modal, ModalProps } from 'antd';

import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

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

function AccountRemoval() {

    const { deleteAccount } = useAuth();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            await deleteAccount();
        } catch (error) {
            console.error("Error deleting account:", error);
        } finally {
            setConfirmLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div className='flex flex-col justify-start items-start gap-4 mx-auto my-2 py-5'>

            <Modal
                centered
                title="Confirm Account Deletion"
                open={showModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setShowModal(false)}
                okText="Delete"
                cancelText="Cancel"
                closable={false}
                styles={styles}
                okButtonProps={{
                    style: {
                        backgroundColor: 'var(--error)',
                        borderColor: 'var(--error)',
                        color: 'var(--foreground)',
                        borderRadius: '5px',
                        padding: '6px 16px',
                        fontWeight: 'bold',
                    }
                }}  
                cancelButtonProps={{
                    style: {
                        backgroundColor: 'transparent',
                        borderColor: 'var(--muted-border)',
                        color: 'var(--foreground)',
                        borderRadius: '5px',
                        padding: '6px 16px',
                    }
                }}  
            >
                <p className='text-error'>Are you sure you want to remove your account?</p>
            </Modal>

            <header>
                <p className='text-lg font-semibold'>Account Removal</p>
                <p className="text-[12px] text-muted-text">Disabling your account means you can recover it at any time after taking this action.</p>
            </header>
            {/* FIX: color styes with tailwaind is not working */}
            <main className="flex gap-4">
                <button onClick={() => alert("Account deletion is currently unavailable. Please try again later.")} className=' hover:opacity-80 px-4 py-2 rounded-md cursor-pointer font-semibold transition-opacity' style={{ background: "var(--sidebar)", color: "var(--error)", border: "1px solid var(--error)"}}>Disable Account</button>
                <button onClick={() => setShowModal(true)} className='hover:opacity-80 text-foreground px-4 py-2 rounded-md cursor-pointer font-semibold transition-opacity' style={{ background: "var(--error)"}}>Delete Account</button>
            </main>
        </div>
    );
}

export default AccountRemoval;