"use client";
import { Suspense } from "react";
import ResetPasswordContent from "./ResetPasswordContent";

function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContent />
        </Suspense>
    );
    
}

export default ResetPasswordPage;