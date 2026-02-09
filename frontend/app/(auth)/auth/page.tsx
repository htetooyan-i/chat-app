import React from 'react';
import Image from "next/image";

function AuthPage() {
    return (
        <div className="flex items-center justify-center h-screen py-10 gap-10">
            <div className="">
                <h1 className='text-[40px]'>Welcome to the Chat App!</h1>
                <p className='text-muted-text'>Please log in or register to access the chat app.</p>
            </div>
            <div className="relative w-1/3 h-full bg-accent rounded-3xl shadow-lg overflow-hidden">
            </div>
        </div>
    );
}

export default AuthPage;