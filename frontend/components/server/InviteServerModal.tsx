import { useEffect, useState } from 'react';
import { Modal, ModalProps, SelectProps } from 'antd';
import { toast } from "sonner";

import { useServerAdmin } from '@/hooks/useServerAdmin'; 
import CreateInviteCode from './CreateInviteCode';
import type { ServerInvite } from '@/types/ServerInvite';


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
        backgroundColor: "var(--normal-sidebar)", 
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

type InviteServerModalProps = {
    show: boolean;
    onClose: () => void;
    fromSettings?: boolean;
}

function InviteServerModal({ show, onClose, fromSettings }: InviteServerModalProps) {

    const { invites, createInvite } = useServerAdmin();
    
    const [ copied, setCopied ] = useState(false);
    const [ inviteCode, setInviteCode ] = useState<ServerInvite | null>(null);
    const [ createNewCode, setCreateNewCode ] = useState(false);

    const [ expireAfter, setExpireAfter ] = useState("7");
    const [ maxUses, setMaxUses ] = useState("No Limit");

    useEffect(() => {
        if (show && invites) {
            setCreateNewCode(!!fromSettings);
            setInviteCode(invites.length > 0 ? invites[0] : null);
        }
    }, [show, fromSettings]);

    
    const handleCopyInviteLink = () => {
        const inviteLink = `${process.env.NEXT_PUBLIC_API_URL}/invites/${inviteCode?.code}`;
        
        navigator.clipboard.writeText(inviteLink)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy invite link:", err);
                toast.error("Failed to copy invite link. Please try again.");
            });
    }

    const handleGenerateNewLink = async () => {
        try {
            const invite = await createInvite(expireAfter, maxUses);
            setInviteCode(invite);
            toast.success("New invite link generated successfully!");
            setExpireAfter("7");
            setMaxUses("No Limit");
            if (fromSettings) {
                onClose();
            }else {
                setCreateNewCode(false);
            }
        } catch (error) {
            console.error("Error generating new invite link:", error);
            toast.error("Failed to create new invite link.", {
                description: "Please try again later."
            });
        }
    }

    return (
        <div>
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
                        <CreateInviteCode setExpireAfter={setExpireAfter} setMaxUses={setMaxUses} />
                    ) : (
                        <main className="flex flex-col gap-10 items-start justify-center">
                            {/* Need to check the expire date */}
                            <p className='text-[12px] text-muted-text'>Your Link expire in 7 days. <span className='text-accent hover:underline cursor-pointer' onClick={() => setCreateNewCode(true)}>Edit invite link</span></p>
                            <div className={`flex gap-1 w-full items-center border rounded-lg p-1 ps-2 ${copied ? "bg-green-300/10 border-success" : "bg-chat-panel border-muted-border"}`}>
                                <p>{process.env.NEXT_PUBLIC_API_URL}/invites/{inviteCode?.code}</p>
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