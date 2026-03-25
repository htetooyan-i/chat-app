"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import Skeletons from "@/components/layout/Skeletons";

function AppIndexPage() {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const handler = () => {
            setShowAlert(true);
        };

        window.addEventListener("sessionExpired", handler);
        return () => window.removeEventListener("sessionExpired", handler);
    }, []);

    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/auth");
        } else if (!loading && user) {
            router.replace("/channels");
        }
    }, [user, loading, router]);

    if (loading) return <Skeletons.AuthSkeleton />;

    return null;
}

export default AppIndexPage;