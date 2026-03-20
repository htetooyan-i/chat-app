"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from "next/image";
import { toast } from "sonner";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from '@/components/auth/RegisterForm';
import ForgetPasswordModal from '@/components/auth/ForgetPasswordModal';
import {api, getErrorMessage} from '@/lib/api';

function AuthPage() {
    const [isLogin, setIsLogin] = React.useState(true);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [showForgetPassword, setShowForgetPassword] = useState(false);
    const router = useRouter();

    const handleFormSubmit = async (data: { username?: string; email: string; password: string; confirmPassword?: string }) => {
        setIsSubmitting(true);
        try {
            
            await api.post(
                `/auth/${isLogin ? "login" : "register"}`,
                data,
                { withCredentials: true }
            );
            
            toast.success(`${isLogin ? "Login" : "Registration"} successful!`, {
                description: isLogin ? "Redirecting to dashboard..." : "Please check your email to verify."
            });
        } catch (error) {
            console.error(`${isLogin ? "Login" : "Registration"} failed:`, error);
            toast.error(getErrorMessage(error, `${isLogin ? "Login" : "Registration"} failed. Please try again.`));
        } finally {
            setIsSubmitting(false);
        }

        router.push(isLogin ? "/channels" : "/");
    };

    const handleSocialMediaLogin = () => {
        // Placeholder for social media login logic
        toast.info("This feature is coming soon!");

    };
  
    return (
        <div className="flex items-center justify-center h-screen py-10 gap-25">
            {showForgetPassword && (
                <ForgetPasswordModal 
                    open={showForgetPassword} 
                    onClose={() => setShowForgetPassword(false)} 
                />
            )}
            <div>
                {/* Title and navigation */}
                <header className='px-3'>
                    <h1 className='text-[40px]'>Welcome to the Chat App!</h1>
                    <p className='text-muted-text'>Please log in or register to access the chat app.</p>
                </header>
                <nav className='px-3'>
                    <ul className='flex gap-10'>
                        <li className={`border-b-4 transition-all ${isLogin ? "border-accent" : "border-transparent"}`}>
                            <button onClick={() => setIsLogin(true)} type='button' className={`${isLogin ? "text-foreground" : "text-muted-text"} block w-full text-center pt-5 text-[25px] font-bold`}>Login</button>
                        </li>
                        <li className={`border-b-4 transition-all ${!isLogin ? "border-accent" : "border-transparent"}`}>
                            <button onClick={() => setIsLogin(false)} type='button' className={`${!isLogin ? "text-foreground" : "text-muted-text"} block w-full text-center pt-5 text-[25px] font-bold`}>Sign Up</button>
                        </li>
                    </ul>
                </nav>
            
                {/* Form container*/}
                <div className="relative overflow-hidden px-3">
                    <div 
                        className={`transition-all duration-500 ease-in-out ${
                        isLogin 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 -translate-x-full absolute top-0 left-0 w-full pointer-events-none'
                        }`}
                    >
                        <LoginForm onSubmit={handleFormSubmit} showForgetPassword={() => setShowForgetPassword(true)} isSubmitting={isSubmitting} />
                    </div>
                    
                    <div 
                        className={`transition-all duration-500 ease-in-out ${
                        !isLogin 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 translate-x-full absolute top-0 left-0 w-full pointer-events-none'
                        }`}
                    >
                        <RegisterForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting}/>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative flex items-center mt-10">
                    <div className="w-full border-t border-muted-border"></div>
                    <span className="absolute left-1/2 -translate-x-1/2 bg-background px-2 text-sm text-muted-text">
                        or
                    </span>
                </div>

                {/* Social login options */}
                {/* <div className="flex items-center justify-center gap-5 mt-10">
                    <button onClick={() => handleSocialMediaLogin()}><Image src="/google-logo.png" alt="Google Sign-In" width={40} height={40} className="cursor-pointer p-1"/></button>
                    <button onClick={() => handleSocialMediaLogin()}><Image src="/facebook-logo.png" alt="Facebook Sign-In" width={40} height={40} className="cursor-pointer p-1"/></button>
                    <button onClick={() => handleSocialMediaLogin()}><Image src="/github-logo.png" alt="GitHub Sign-In" width={40} height={40} className="cursor-pointer p-1"/></button>
                </div> */}
            </div>
            {/* Decorative image or illustration */}
            <div className="relative w-1/3 h-full bg-accent rounded-3xl shadow-lg overflow-hidden">
            </div>
        </div>
    );
}

export default AuthPage;