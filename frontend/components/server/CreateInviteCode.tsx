import React, { useEffect, useState } from 'react';
import { ConfigProvider, Modal, ModalProps, Select, SelectProps } from 'antd';

import { useNotification } from '@/hooks/useNotification';
import { api } from '@/lib/api';
import { useServer } from '@/hooks/useServer';


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

type InviteServerModalProps = {
    setExpireAfter: (value: string) => void;
    setMaxUses: (value: string) => void;
};

function CreateInviteCode({ setExpireAfter, setMaxUses }: InviteServerModalProps) {

    return (
        <div>
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
        </div>
    );
}

export default CreateInviteCode;