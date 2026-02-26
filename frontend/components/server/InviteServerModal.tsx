import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ConfigProvider, Modal, ModalProps, Select, SelectProps } from 'antd';

import { useNotification } from '@/hooks/useNotification';
import api from '@/lib/api';
import { useServer } from '@/hooks/useServer';
import CreateInviteCode from './CreateInviteCode';


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
    show: boolean;
    onClose: () => void;
    fromSettings?: boolean;
    refreshInvites?: () => void;
}

function InviteServerModal({ show, onClose, fromSettings, refreshInvites }: InviteServerModalProps) {

    const { serverId } = useParams();
    const { servers } = useServer();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));

    const { contextHolder, showSuccess, showError } = useNotification();
    
    const [ copied, setCopied ] = useState(false);
    const [ inviteCode, setInviteCode ] = useState<Invite | null>(null);
    const [ createNewCode, setCreateNewCode ] = useState(false);

    const [ expireAfter, setExpireAfter ] = useState("7");
    const [ maxUses, setMaxUses ] = useState("No Limit");

    useEffect(() => {
        if (show) {
            setCreateNewCode(!!fromSettings);
        }
    }, [show, fromSettings]);

    

    useEffect(() => { // FIX: this will fetch only when this modal is opened from member info, but not from settings, need to add a condition to check if it's from settings or not
        if (!selectedServer?.id) return;

        const fetchInvites = async () => {
            try {
                const res = await api.get(`/servers/${selectedServer.id}/invites`);
                setInviteCode(res.data[0] || null);
            } catch (error) {
                console.error("Error fetching invite codes:", error);
                showError("Failed to fetch invite codes. Please try again.");
            }
        };

        fetchInvites();
    }, [selectedServer?.id]);
    
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
            setExpireAfter("7");
            setMaxUses("No Limit");
            if (fromSettings) {
                refreshInvites?.();
                onClose();
            }else {
                setCreateNewCode(false);
            }
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
            open={show}
            onCancel={() => {
                        onClose();
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
                                        if (fromSettings) {
                                            onClose();
                                        } else {
                                            setCreateNewCode(false);
                                        }
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    className="flex-1 px-4 py-2 bg-accent border border-accent font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                                    onClick={() => {
                                        handleGenerateNewLink();
                                        if (fromSettings) {
                                            onClose();
                                        } else {
                                            setCreateNewCode(false);
                                        }
                                    }}
                                >
                                    Generate New Link
                                </button>
                            </div>
                        ) : (
                            <button
                                className="flex-1 px-4 py-2 bg-muted-background border border-muted-border font-semibold text-foreground rounded hover:opacity-80 cursor-pointer"
                                onClick={() => {
                                    onClose();
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
                        <CreateInviteCode expireAfter={expireAfter} setExpireAfter={setExpireAfter} maxUses={maxUses} setMaxUses={setMaxUses} />
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