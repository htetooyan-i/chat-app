"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from 'lucide-react';
import { Skeleton } from 'antd';
import { useRouter } from 'next/navigation';

import { parsePasswordValidation } from '@/lib/helper';
import { api } from '@/lib/api';

function ResetPasswordPage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const [tokenValid, setTokenValid] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    const isPasswordInvalid = !parsePasswordValidation(password) || password !== confirmPassword;

    // Verify token on mount
    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                router.push("/");
                return;
            }
            try {
                await api.post(`/auth/verify-reset-token?token=${token}`);
                setTokenValid(true);
            } catch {
                setTokenValid(false);
            }
        };
        checkToken();
    }, [token]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token) return;

        setLoading(true);
        try {
            await api.post(`/auth/reset-password?token=${token}`, { newPassword: password });
            setSuccess(true);
        } catch (error) {
            console.error("Error resetting password:", error);
        } finally {
            setLoading(false);
        }
    };

    // Render while loading token verification
    if (tokenValid === null) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4 px-4 w-full">
                <div className="flex flex-col gap-4 mt-10">
                    <Skeleton.Node active style={{ width: "33%", height: 400, backgroundColor: "var(--muted-background)",  borderRadius: 6 }} />
                </div>
            </div>
        );
    }

    if (!tokenValid) {
        return (
            <div className="mx-auto w-full p-4 rounded-lg shadow-xl text-center mt-10">
                <header className="px-3">
                    <h1 className="text-[40px]">Password reset Failed</h1>
                    <p className="text-muted-text mb-4">
                        Your password reset link is invalid or has expired. Please request a new password reset link.
                    </p>
                </header>
            </div>
        );
    }

    // Token is valid → show form or success
    return (
        <div>
            {success ? (
                <div className="mx-auto w-full p-4 rounded-lg shadow-xl text-center mt-10">
                    <header className="px-3">
                        <h1 className="text-[40px]">Password reset successful</h1>
                        <p className="text-muted-text mb-4">
                            Your password has been reset successfully. You can now close this window and log in with your new password.
                        </p>
                        <a href="/auth" className='text-accent hover:text-accent/80'>Go back to login</a>
                    </header>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen px-4">
                    <div className="w-1/3 bg-sidebar p-4 rounded-lg shadow-xl">
                        <header className="px-3">
                            <h1 className="text-[40px]">Reset your password</h1>
                            <p className="text-muted-text">Enter your new password below.</p>
                        </header>

                        <div className="px-3">
                            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
                                {/* New Password */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="password" className="text-[14px] font-semibold">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={isPasswordVisible ? "text" : "password"}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent"
                                        />
                                        {isPasswordVisible ? (
                                            <EyeOff onClick={() => setIsPasswordVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-text" />
                                        ) : (
                                            <Eye onClick={() => setIsPasswordVisible(true)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-text" />
                                        )}
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="confirmPassword" className="text-[14px] font-semibold">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={isConfirmPasswordVisible ? "text" : "password"}
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent"
                                        />
                                        {isConfirmPasswordVisible ? (
                                            <EyeOff onClick={() => setIsConfirmPasswordVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-text" />
                                        ) : (
                                            <Eye onClick={() => setIsConfirmPasswordVisible(true)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-text" />
                                        )}
                                    </div>
                                </div>

                                {/* Validation messages */}
                                <div className="flex flex-col gap-0">
                                    <p
                                        className="text-red-500 text-[12px] mt-1"
                                        style={{ visibility: !parsePasswordValidation(password) && password ? "visible" : "hidden" }}
                                    >
                                        Password must be at least 8 characters with uppercase, lowercase, and a number
                                    </p>
                                    <p
                                        className="text-red-500 text-[12px] mt-1"
                                        style={{ visibility: parsePasswordValidation(password) && password !== confirmPassword && confirmPassword ? "visible" : "hidden" }}
                                    >
                                        Passwords do not match
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPasswordInvalid || loading}
                                    className={`${isPasswordInvalid || loading ? "bg-muted-background cursor-not-allowed" : "bg-accent hover:opacity-80"} text-primary rounded-md py-2 mt-5 font-[14px] font-semibold transition-all`}
                                >
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResetPasswordPage;