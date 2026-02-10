import React, { useState } from 'react';

type RegisterFormProps = {
  onSubmit: (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
};

function RegisterForm({ onSubmit }: RegisterFormProps) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent'/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="confirmPassword" className='text-[14px] font-semibold'>Confirm Password</label><br/>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='border border-muted-border rounded-md px-3 py-2 bg-chat-panel focus:border-accent focus:outline focus:outline-2 focus:outline-accent'/>
                </div>
                <button type="submit" className="bg-accent text-primary rounded-md py-2 mt-5 font-[14px] font-semibold cursor-pointer hover:opacity-80 transition-all">Sign Up</button>
            </form>
        </div>
    );
}

export default RegisterForm;