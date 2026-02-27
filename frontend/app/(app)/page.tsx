"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

function page() {

    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            // If user is not authenticated, redirect to auth page
            router.replace("/auth");
        } else if (!loading && user) {
            // If user is authenticated, redirect to servers page
            router.replace("/servers");
        }
    }, [user, loading]);

    return (
        <div className="flex h-screen w-screen">
            {/* Sidebar skeleton */}
            <div className="w-[80px] h-screen bg-sidebar animate-pulse" />
            {/* Channel panel skeleton */}
            <div className="w-[300px] h-screen bg-background animate-pulse" />
            {/* Chat panel skeleton */}
            <div className="flex-1 h-screen bg-chat-panel animate-pulse" />
        </div>
    );
}

export default page;