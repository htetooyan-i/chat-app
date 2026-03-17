"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import Skeletons from "@/components/layout/Skeletons";

function AppIndexPage() {

    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            // If the user is not authenticated, redirect to the auth page
            router.replace("/auth");
        } else if (!loading && user) {
            // If the user is authenticated, redirect to the servers page
            router.replace("/servers");
        }
    }, [user, loading, router]);

    if (loading) return <Skeletons.AuthSkeleton />;
    return null;
}

export default AppIndexPage;