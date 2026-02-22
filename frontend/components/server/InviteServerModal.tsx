import React, { useEffect, useState } from 'react';
import { ConfigProvider, Modal, ModalProps, Select, SelectProps } from 'antd';

import { useNotification } from '@/hooks/useNotification';
import api from '@/lib/api';
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

const selectStyles: SelectProps['styles'] = {
    root: {
        width: "100%", 
        backgroundColor: "var(--side-bar)", 
        borderColor: "var(--muted-border)", 
        color: "var(--foreground)", 
        fontWeight: "bold",
    },
    prefix: {
        color: "var(--foreground)",
    },
    content: {
        color: "var(--foreground)",
        fontWeight: "bold",
    },
    suffix: {
        color: "var(--foreground)",
    },
    popup: {
        root: {
            backgroundColor: "var(--chat-panel)",
            borderColor: "var(--muted-border)",
        },
        listItem: {
            color: "var(--foreground)",
        },
    },
};

type Invite = {
    id: number;
    code: string;
    expiresAt: string;
    uses: number;
    maxUses: number;
    currentUses: number;
}

type InviteServerModalProps = {
    showInviteServerModal: boolean;
    setShowInviteServerModal: (show: boolean) => void;
}

function InviteServerModal({ showInviteServerModal, setShowInviteServerModal }: InviteServerModalProps) {

    const { selectedServer } = useServer();
    const { contextHolder, showSuccess, showError } = useNotification();
    
    const [ copied, setCopied ] = useState(false);
    const [ inviteCode, setInviteCode ] = useState<Invite | null>(null);
    const [ createNewCode, setCreateNewCode ] = useState(false);

    const [ expireAfter, setExpireAfter ] = useState("7");
    const [ maxUses, setMaxUses ] = useState("No Limit");

    useEffect(() => {
        try {
            api.get(`/servers/${selectedServer?.id}/invites`).then((res) => {
                setInviteCode(res.data[0] || null);
            });
        } catch (error) {
            console.error("Error fetching invite codes:", error);
            showError("Failed to fetch invite codes. Please try again.");
        }
    }, []);
    
    const handleCopyInviteLink = () => {
        const inviteLink = `https://localhost:4000/invites/${inviteCode?.code}`;
        navigator.clipboard.writeText(inviteLink)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy invite link:", err);
                showError("Failed to copy invite link. Please try again.");
            });
    }

    const handleGenerateNewLink = async () => {
        try {
            const res = await api.post(`/servers/${selectedServer?.id}/invites`, {
                expiresInMinutes: expireAfter === "never" ? null : parseInt(expireAfter) * 24 * 60, // Convert days to minutes
                maxUses: maxUses === "No Limit" ? null : parseInt(maxUses),
            });
            setInviteCode(res.data);
            showSuccess("New invite link generated successfully!");
            setCreateNewCode(false);
            setExpireAfter("7");
            setMaxUses("No Limit");
        } catch (error) {
            console.error("Error generating new invite link:", error);
            showError("Failed to generate new invite link. Please try again.");
        }
    }
    return (
        <div>
            {contextHolder}
            <Modal
            centered
            title={ createNewCode ? "Server invite link settings" : "Invite People to Your Server" }
            open={showInviteServerModal}
            onCancel={() => {
                        setShowInviteServerModal(false);
                        setCreateNewCode(false);
                    }}
            width={"30%"}
            styles={styles}
            closable={false}
            footer={
                <div className="flex justify-end gap-2">
                    {
                        createNewCode ? (
                            <div className="flex gap-2 w-full">
                                <button
                                    className="flex-1 px-4 py-2 bg-muted-background border border-muted-border font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                                    onClick={() => {
                                        setCreateNewCode(false);
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    className="flex-1 px-4 py-2 bg-accent border border-accent font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                                    onClick={() => {
                                        handleGenerateNewLink();
                                        setCreateNewCode(false);
                                    }}
                                >
                                    Generate New Link
                                </button>
                            </div>
                        ) : (
                            <button
                                className="flex-1 px-4 py-2 bg-muted-background border border-muted-border font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                                onClick={() => {
                                    setShowInviteServerModal(false);
                                }}
                            >
                                Close
                            </button>
                        )
                    }
                </div>
            }
            >
                {
                    createNewCode ? (
                        <main className="flex flex-col gap-5 items-start justify-center">
                            <div className='flex flex-col gap-2 w-full'>
                                <label htmlFor="serverName" className="text-[15px] font-bold">Expire After</label>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Select: {
                                                optionSelectedBg: "var(--accent)",
                                            },
                                        },
                                    }}
                                >
                                    <Select
                                        defaultValue="7"
                                        styles={selectStyles}
                                        onChange={(value) => {
                                            setExpireAfter(value);
                                        }}
                                        options={[
                                            { value: '7', label: '7 days' },
                                            { value: '30', label: '30 days' },
                                            { value: '90', label: '90 days' },
                                            { value: 'never', label: 'Never' },
                                        ]}
                                    />
                                </ConfigProvider>
                                

                            </div>

                            <div className='flex flex-col gap-2 w-full'>
                                <label htmlFor="serverName" className="text-[15px] font-bold">Max Number of Uses</label>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Select: {
                                                optionSelectedBg: "var(--accent)",
                                            },
                                        },
                                    }}
                                >
                                    <Select
                                        defaultValue="No Limit"
                                        styles={selectStyles}
                                        onChange={(value) => {
                                            setMaxUses(value);
                                        }}
                                        options={[
                                            { value: 'No Limit', label: 'No Limit' },
                                            { value: '1', label: '1 use' },
                                            { value: '5', label: '5 uses' },
                                            { value: '10', label: '10 uses' },
                                        ]}
                                    />
                                </ConfigProvider>
                                

                            </div>
                        </main>
                    ) : (
                        <main className="flex flex-col gap-10 items-start justify-center">
                            {/* Need to check the expire date */}
                            <p className='text-[12px] text-muted-text'>Your Link expire in 7 days. <span className='text-accent hover:underline cursor-pointer' onClick={() => setCreateNewCode(true)}>Edit invite link</span></p>
                            <div className={`flex gap-1 w-full items-center border rounded-lg p-1 ps-2 ${copied ? "bg-green-300/10 border-success" : "bg-chat-panel border-muted-border"}`}>
                                <p>https://localhost:4000/invites/{inviteCode?.code}</p>
                                <button className={`ml-auto px-2 py-1 text-white rounded hover:opacity-80 cursor-pointer ${copied ? "bg-success" : "bg-accent"}`} onClick={handleCopyInviteLink}>{copied ? "Copied!" : "Copy"}</button>
                            </div>
                        </main>
                    )
                }


            </Modal>
        </div>
    );
}

export default InviteServerModal;