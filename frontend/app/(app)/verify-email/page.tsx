"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from 'antd';

import { api } from "@/lib/api";

function VerifyEmailPage() {
    const [success, setSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const checkCookie = async () => {
            try {
                await api.get("/auth/verify-redirect-cookie"); // backend checks cookie
                setSuccess(true);
            } catch {
                setSuccess(false);
            }
        };
        checkCookie();
    }, []);

    // FIXME: skeleton only visible for a short time even succes is null
    if (success === null) {
        return (
            <div className="mx-auto w-full p-4 rounded-lg shadow-xl mt-10 text-center">
                <Skeleton.Node active style={{ width: "100%", height: 100, backgroundColor: "var(--muted-background)",  borderRadius: 6 }} />
            </div>
        )
    }

    return (
        <div className="mx-auto w-full p-4 rounded-lg shadow-xl mt-10 text-center">
            {success ? (
                <>
                    <h1 className="text-[40px]">Email Verified</h1>
                    <p>Your email has been verified successfully. You can now close this window.</p>
                </>
            ) : (
                <>
                    <h1 className="text-[40px]">Verification Failed</h1>
                    <p>Unable to verify your email. This link may be invalid, expired, or you might already be logged in. Please request a new verification email if needed.</p>
                </>
            )}
        </div>
    );
}

export default VerifyEmailPage;