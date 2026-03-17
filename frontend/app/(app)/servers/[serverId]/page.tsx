"use client";
import {useEffect} from 'react';
import { useParams, useRouter } from "next/navigation";

import {useServer} from "@/hooks/useServer";
import Skeletons from "@/components/layout/Skeletons";

function Page() {

    const { servers, loading } = useServer();
    const router = useRouter();
    const params = useParams();
    const serverId = Array.isArray(params.serverId) ? Number(params.serverId[0]) : Number(params.serverId);

    useEffect(() => {
        if (loading) return;
        if (!serverId) return;

        const exists = servers.some(s => s.id === serverId);

        if (!exists) {
            if (servers.length > 0) {
                router.replace(`/servers/${servers[0].id}/channels`);
            } else {
                router.replace("/servers");
            }
        }
    }, [serverId, servers, loading, router]);

    if (loading) return <Skeletons.FullPageSkeleton />;

    return null;
}

export default Page;