import { Suspense } from "react";
import MaintenanceContent from "./MaintenanceContent";

export default function MaintenancePage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MaintenanceContent />
        </Suspense>
    )
}