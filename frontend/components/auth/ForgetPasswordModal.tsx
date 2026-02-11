// components/auth/ForgetPasswordModal.tsx
"use client";
import React, { useState } from 'react';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import axios, { AxiosError } from 'axios';

import { useNotification } from '@/hooks/useNotification';
import api from '@/lib/api';


interface ForgetPasswordModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ForgetPasswordModal({ open, onClose }: ForgetPasswordModalProps) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { contextHolder, showSuccess, showError } = useNotification();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post(
                '/auth/request-password-reset',
                { email },
                { withCredentials: true }
            );

            showSuccess(
                'Password reset email sent successfully!',
                'Please check your email for further instructions.'
            );

            // Add a short delay to allow users to read the success message before redirecting, OPTIONAL: can be removed if immediate redirect is preferred
            setTimeout(() => {
                onClose();
                setEmail(''); // Reset form
            }, 1500);

        } catch (error) {
            const axiosError = error as AxiosError<{ error: string }>;
            
            showError(
                'Failed to send reset email',
                axiosError.response?.data?.error || 'An unexpected error occurred'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Reset Password"
                centered
                open={open}
                onCancel={onClose}
                footer={null}
                closeIcon={<CloseOutlined style={{ color: 'var(--foreground)' }} />}
                classNames={{
                    header: 'border-b border-muted-border',
                }}
                styles={{
                    container: { backgroundColor: 'var(--background)' },
                    title: { color: 'var(--foreground)' },
                    body: { color: 'var(--foreground)' },
                }}
            >

                <form onSubmit={handleSubmit} className='mt-5 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='text-[14px] font-semibold'>
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent'
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-accent text-primary rounded-md py-2 mt-5 font-[14px] font-semibold cursor-pointer hover:opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Password Email'}
                    </button>
                </form>
            </Modal>
        </>
    );
}