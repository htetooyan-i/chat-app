import React, { useState } from 'react';
import { Modal, ModalProps, Avatar, Badge } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { useAuth } from '@/hooks/useAuth';
import UserGeneralInfo from '@/components/user/UserGeneralInfo';
import UserSettingsPassword from './UserSettingsPassword';

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
        height: '70vh',
        overflowY: 'auto',
    },

};

type UserSettingsModalProps = {
    showUserSettings: boolean;
    setShowUserSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserSettingsModal({ showUserSettings, setShowUserSettings }: UserSettingsModalProps) {

    const { user } = useAuth();
    
    return (
        <div>
            <Modal
            centered
            footer={null}
            title="My Account"
            styles={styles}
            closeIcon={<CloseOutlined style={{ color: 'var(--foreground)' }} />}
            open={showUserSettings}
            onCancel={() => setShowUserSettings(false)}
            width={"80%"}
            >
                {/* Avatar, username, email, phone number(optional) */}
                <UserGeneralInfo />
                
                {/* Password */}

                <UserSettingsPassword />

            </Modal>
        </div>
    );
}

export default UserSettingsModal;