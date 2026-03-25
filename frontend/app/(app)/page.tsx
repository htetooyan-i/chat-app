"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import Skeletons from "@/components/layout/Skeletons";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

    return (
        <>
            {showAlert && (
                <Alert>
                    <InfoIcon />
                    <AlertTitle>Session Expired</AlertTitle>
                    <AlertDescription>
                        Your session has expired. Please log in again.
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
}

export default AppIndexPage;