import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Spinner } from "@/components/ui/spinner"

import { parsePasswordValidation } from '@/lib/helper';

type RegisterFormProps = {
    isSubmitting: boolean;
    onSubmit: (data: {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => void;
};

function RegisterForm({ onSubmit, isSubmitting }: RegisterFormProps) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const isPasswordInvalid = !parsePasswordValidation(password) || password !== confirmPassword;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value,
        };

        onSubmit(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} method='POST' className='mt-5 flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="username" className='text-[14px] font-semibold'>Username</label><br/>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className='border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent'/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='text-[14px] font-semibold'>Email</label><br/>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent'/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='text-[14px] font-semibold'>Password</label><br/>
                    <div className="relative">
                        <input type={isPasswordVisible ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent'/>
                        {
                            isPasswordVisible ? (
                                <EyeOff type="button" onClick={() => setIsPasswordVisible(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                            ) : (
                                <Eye type="button" onClick={() => setIsPasswordVisible(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="confirmPassword" className='text-[14px] font-semibold'>Confirm Password</label><br/>
                    <div className="relative">
                        <input type={isConfirmPasswordVisible ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='w-full border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent'/>
                        {
                            isConfirmPasswordVisible ? (
                                <EyeOff type="button" onClick={() => setIsConfirmPasswordVisible(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                            ) : (
                                <Eye type="button" onClick={() => setIsConfirmPasswordVisible(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
                            )
                        }
                    </div>
                </div>
                    <div className='flex flex-col gap-0'>

                    <p className={`text-red-500 text-[12px] mt-1`} style={{ visibility: !parsePasswordValidation(password) && password ? "visible" : "hidden" }}>Password must be at least 8 characters with uppercase, lowercase, and a number</p>
                    <p className={` text-red-500 text-[12px] mt-1`} style={{ visibility: parsePasswordValidation(password) && isPasswordInvalid ? "visible" : "hidden" }}>Passwords do not match</p>
                </div>
                <button type="submit" disabled={isPasswordInvalid || isSubmitting} className={`${isPasswordInvalid || isSubmitting ? "bg-muted-background cursor-not-allowed" : "bg-accent cursor-pointer hover:opacity-80"} flex items-center justify-center gap-2 text-primary rounded-md py-2 mt-5 font-[14px] font-semibold transition-all`}>
                    {isSubmitting && <Spinner />}
                    <span>{isSubmitting ? "Registering..." : "Register"}</span>
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;