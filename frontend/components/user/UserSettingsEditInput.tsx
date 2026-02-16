import React, { useState } from 'react';
import { X } from 'lucide-react';

type UserSettingsEditInputProps = {
    label: string;
    value: string;
    inputType?: string;
    changeValue: (newValue: string) => void;   
}

function UserSettingsEditInput({ label, value, inputType, changeValue }: UserSettingsEditInputProps) {

    return (
        <div className='flex justify-between items-start gap-4'>
            <div className='relative flex-1 flex flex-col gap-1'>
                <p className='font-bold text-[14px]'>{label}</p>
                <p className='font-medium text-[12px]'>{value}</p>
            </div>
            <div>
                <button 
                    className="px-4 py-1 rounded-lg border border-muted-border cursor-pointer hover:border-accent hover:text-accent transition-colors duration-200"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default UserSettingsEditInput;