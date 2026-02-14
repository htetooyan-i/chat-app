import React, { useState } from 'react';
import { X } from 'lucide-react';

type UserSettingsEditInputProps = {
    label: string;
    value: string;
    inputType?: string;
    changeValue: (newValue: string) => void;   
}

function UserSettingsEditInput({ label, value, inputType, changeValue }: UserSettingsEditInputProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedValue, setUpdatedValue] = useState(value);

    const onEdit = () => {
        setIsEditing(true);
        setUpdatedValue(value);
    }
    const onSave = () => {
        setIsEditing(false);
        changeValue(updatedValue);
    }
    const onCancel = () => {
        setIsEditing(false);
        setUpdatedValue(value);
    }
    return (
        <div className='flex justify-between items-start gap-4'>
            <div className='relative flex-1 flex flex-col gap-1'>
                <p className='font-bold text-[14px]'>{label}</p>
                {
                    isEditing ? (
                        <div className='relative w-full'>
                            <input 
                                type={inputType || "text"}
                                value={updatedValue}
                                onChange={(e) => setUpdatedValue(e.target.value)}
                                className='w-full p-2 pr-9 rounded-lg border border-muted-border focus:outline-none focus:ring-2 focus:ring-accent'
                            />
                            <X
                                onClick={onCancel}
                                className="absolute right-3 top-1/2 -translate-y-1/2 
                                        cursor-pointer text-muted-foreground hover:text-accent 
                                        transition-colors"
                                size={16}
                            />
                        </div>
                    ) : (
                        <p className='font-medium text-[12px]'>{value}</p>
                    )
                }
            </div>
            <div>
                {   isEditing ? (
                        <button 
                            onClick={onSave}
                            className="px-4 py-1 rounded-lg border border-muted-border cursor-pointer hover:border-accent hover:text-accent transition-colors duration-200"
                        >
                            Save
                        </button>
                    ) : (
                        <button 
                            onClick={onEdit}
                            className="px-4 py-1 rounded-lg border border-muted-border cursor-pointer hover:border-accent hover:text-accent transition-colors duration-200"
                        >
                            Edit
                        </button>
                    )
                }
            </div>
        </div>
    );
}

export default UserSettingsEditInput;