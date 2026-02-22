import React from 'react';
import { Modal, ModalProps } from 'antd';
import { CameraOutlined } from '@ant-design/icons';

import api from '@/lib/api';
import { useNotification } from '@/hooks/useNotification';
import { useServer } from '@/hooks/useServer';

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


type CreateServerModalProps = {
    isSuccessed: boolean;
    serverName: string;
    setServerName: (name: string) => void;
    inviteCode: string;
    
}

function CreateServer({ isSuccessed, serverName, setServerName, inviteCode }: CreateServerModalProps) {

    const [ copied, setCopied ] = React.useState(false);

    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(inviteCode)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy invite link:", err);
            });
    }
    return (
        <div>
            {!isSuccessed ? (
                <main className="flex flex-col gap-10 items-center justify-center">
                    <p className='text-[12px] text-muted-text'>Give your new server a personality with a name and an icon. You can always change it later.</p>
                    <div className="px-4 py-4 rounded-full text-muted-text cursor-pointer" style={{border: "2px dashed var(--muted-text)"}}>
                        <CameraOutlined className="text-[40px]" />
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="serverName" className="text-[14px] font-bold">Server Name <span className='text-error'>*</span></label>
                        <input 
                            type="text" 
                            id="serverName" 
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                        />
                    </div>
                </main>

            ) : (
                <main className='flex flex-col gap-4'>
                    <p className='text-[12px] text-muted-text'>Invite others to join your server using the link below.</p>

                    <button className={`w-full px-4 py-2 text-foreground rounded hover:opacity-80 cursor-pointer ${copied ? 'bg-green-500/10 border border-success' : 'bg-accent'}`} onClick={handleCopyInviteLink}>{copied ? "Copied!" : inviteCode}</button>
                </main>
            )
            }
        </div>
    );
}

export default CreateServer;