"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function MaintenanceContent() {
    const searchParams = useSearchParams();
    const from = searchParams.get("from");
    const router = useRouter();

    const handleGoBack = () => {
        if (from) {
            router.replace(from);
        } else {
            window.history.back();
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-4 text-red-500">
                🚧 Under Construction
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                This page is currently being developed. Please check back later!
                </p>
                <button onClick={handleGoBack} className="bg-accent w-full text-white py-2 font-semibold rounded mb-4 flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors">Go Back</button>
            </div>
        </div>
    );
}

export default MaintenanceContent;