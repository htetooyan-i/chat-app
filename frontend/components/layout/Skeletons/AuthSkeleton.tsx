import React, {useEffect, useState} from 'react';
import Image from "next/image";

function AuthSkeleton() {

    const messages = [
        "Welcome to ChatApp!",
        "Your all-in-one communication platform.",
        "Create servers, join channels, and start chatting!",
        "Enjoy seamless real-time messaging with your friends.",
        "Get started by creating or joining a server!",
        "Waiting too long? Check out our documentation or contact support.",
        "Happy chatting! 🎉"
    ];

    const [messageIndex, setMessageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // start fade out
            setTimeout(() => {
                setMessageIndex((prev) => (prev + 1) % messages.length);
                setFade(true); // fade in new message
            }, 500); // match the fade-out duration
        }, 4000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="flex h-screen w-screen justify-center items-center bg-chat-panel">
            <div className='flex flex-col justify-center items-center'>
                <Image src="/logo.png" width={100} height={100} alt="Loading Logo" className="rounded-lg animate-float" />
                <p
                    className={`text-center mt-4 transition-all duration-500 ease-in-out ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    {messages[messageIndex]}
                </p>
            </div>
        </div>
    );
}

export default AuthSkeleton;