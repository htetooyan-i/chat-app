import React from 'react';
import { Modal, ModalProps, Select, SelectProps, ConfigProvider } from 'antd';
import { Input } from 'antd';

const { TextArea } = Input;

type BanMemberProps = {
    show: boolean;
    onClose: () => void;
    byAuthority?: boolean;
    banMember: (reason: string, duration?: string) => Promise<void>;
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

const selectStyles: SelectProps['styles'] = {
    root: {
        backgroundColor: 'var(--chat-panel)',
        color: 'var(--foreground)',
        borderRadius: '5px',
        border: '1px solid var(--muted-border)',
    },
    content: {
        color: 'var(--foreground)',
    },

    suffix: {
        color: 'var(--muted-text)',
    },

    placeholder: {
        color: 'var(--muted-text)',
    },
    item: {
        backgroundColor: 'var(--error-background)',
        fontWeight: '500',
        color: 'var(--error)',
    },
    itemRemove: {
        color: 'var(--error)',
    },
    popup: {
        root: {
            backgroundColor: 'var(--chat-panel)',
            color: 'var(--foreground)',
            borderRadius: '5px',
            border: '1px solid var(--muted-border)',
        },
        list: {
            backgroundColor: 'var(--chat-panel)',
            color: 'var(--foreground)',
        },
        listItem: {
            backgroundColor: 'var(--chat-panel)',
            color: 'var(--foreground)',
        },
    }
};

function BanMemberModal({ show, onClose, banMember, byAuthority }: BanMemberProps) {
    const [reason, setReason] = React.useState<string[]>([]);
    const [duration, setDuration] = React.useState<string>("7");
    const [customReason, setCustomReason] = React.useState("");
    const showTextArea = reason.includes("other");

    return (
        <div>
            <Modal
            centered
            footer={null}
            title="Ban Member"
            open={show}
            onCancel={() => {
                onClose();
                setReason([]);
                setCustomReason("");
            }}
            width={"30%"}
            styles={styles}
            closable={false}
            >
                <div>
                    <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a reason for banning the member.</p>
                    <div className='flex flex-col mb-6'>
                        <div className='flex flex-col gap-6'>
                            <ConfigProvider 
                            theme={{ 
                                components: { 
                                    Select: { 
                                        hoverBorderColor: 'var(--error)',
                                        optionSelectedBg: 'rgba(239, 68, 68, 0.2)',
                                        optionActiveBg: 'rgba(239, 68, 68, 0.1)',
                                        optionSelectedColor: 'var(--error)', 
                                    },
                                    Input: {
                                        colorBgContainer: 'var(--chat-panel)',
                                        colorText: 'var(--foreground)',
                                        colorBorder: 'var(--muted-border)',
                                        colorTextPlaceholder: 'var(--muted-text)',
                                        hoverBorderColor: 'var(--error)',
                                        activeBorderColor: 'var(--error)',
                                        colorTextDescription: 'var(--muted-text)', // count text color
                                    }
                                }                
                            }}>
                                <Select
                                styles={selectStyles}
                                mode='tags'
                                placeholder="Select or type a ban reason"
                                value={reason}
                                onChange={(val) => setReason(val)}
                                options={[
                                    { value: "spamming", label: "Spamming" },
                                    { value: "harassing", label: "Harassing" },
                                    { value: "inappropriate_content", label: "Inappropriate Content" },
                                    { value: "other", label: "Other" },
                                ]}
                                />

                                {showTextArea && (
                                    <TextArea
                                    rows={4}
                                    placeholder="Enter custom ban reason..."
                                    maxLength={200}
                                    showCount
                                    value={customReason}
                                    onChange={(e) => setCustomReason(e.target.value)}
                                    />
                                )}

                                
                            </ConfigProvider>
                            {
                                byAuthority && (
                                    <Select
                                    value={duration}
                                    defaultValue="7"
                                    styles={selectStyles}
                                    onChange={(value) => {
                                        setDuration(value);
                                    }}
                                    options={[
                                        { value: '7', label: '7 days' },
                                        { value: '30', label: '30 days' },
                                        { value: '90', label: '90 days' },
                                        { value: 'permanent', label: 'Permanent' },
                                    ]}
                                    />
                                )
                            }
                        </div>
                    </div>

                    <div className='flex justify-end gap-2'>
                        <button 
                            type='button'
                            onClick={() => {
                                onClose();
                                setReason([]);
                                setCustomReason("");
                            }}
                            className='flex-1 px-4 py-2 rounded-lg border bg-chat-panel font-semibold border-muted-border cursor-pointer'
                        >
                            Cancel
                        </button>
                        <button 
                            type='button'
                            onClick={() => {
                                const finalReason = showTextArea && customReason
                                    ? [...reason.filter(r => r !== "other"), customReason].join(", ")
                                    : reason.join(", ");
                                banMember(finalReason, duration);
                                setReason([]);
                                setCustomReason("");
                                onClose();
                            }}
                            className='flex-1 px-4 py-2 rounded-lg bg-error text-white font-semibold cursor-pointer hover:opacity-80 transition-opacity duration-200'
                        >
                            Ban Member
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default BanMemberModal;