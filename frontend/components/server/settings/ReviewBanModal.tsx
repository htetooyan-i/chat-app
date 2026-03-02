import React from 'react';
import { Modal, ModalProps, Select, SelectProps, ConfigProvider } from 'antd';
import { Input } from 'antd';

const { TextArea } = Input;

type ReviewBanModalProps = {
    show: boolean;
    onClose: () => void;
    makeDecision: (decision: "ACCEPTED" | "REJECTED", duration?: string) => Promise<void>;
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

function ReviewBanModal({ show, onClose, makeDecision }: ReviewBanModalProps) {
    const [ duration, setDuration ] = React.useState<string>("7");

    return (
        <div>
            <Modal
            centered
            footer={null}
            title="Review Ban"
            open={show}
            onCancel={() => {
                onClose();
                setDuration("7");
            }}
            width={"30%"}
            styles={styles}
            closable={false}
            >
                <div>
                    <p className='text-[11px] text-muted-text font-medium mt-0 mb-4'>Enter a duration for the ban.</p>
                    <div className='flex flex-col gap-4 mb-6'>
                        <div className='flex flex-col gap-3'>
                            <ConfigProvider 
                            theme={{ 
                                components: {
                                    Select: {
                                        optionSelectedBg: "var(--accent)",
                                    },
                                },               
                            }}>
                                <Select
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
                            </ConfigProvider>
                        </div>
                    </div>

                    <div className='flex justify-end gap-2'>
                        <button 
                            type='button'
                            onClick={() => {
                                makeDecision("REJECTED");
                                setDuration("7");
                                onClose();

                            }}
                            className='flex-1 px-4 py-2 rounded-lg text-success bg-success/20 font-semibold cursor-pointer'
                        >
                            Reject Request
                        </button>
                        <button 
                            type='button'
                            onClick={() => {
                                makeDecision("ACCEPTED" , duration);
                                setDuration("7");
                                onClose();
                            }}
                            className='flex-1 px-4 py-2 rounded-lg bg-error text-white font-semibold cursor-pointer hover:opacity-80 transition-opacity duration-200'
                        >
                            Accept Request
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ReviewBanModal;