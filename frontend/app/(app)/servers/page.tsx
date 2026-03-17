"use client";

import { useEffect } from "react";
import {useParams, useRouter} from "next/navigation";

import Skeletons from "@/components/layout/Skeletons";
import EmptyPage from "@/components/layout/EmptyPage";
import { useServer } from "@/hooks/useServer";
import { useAuth } from "@/hooks/useAuth";

export default function ServersIndexPage() {

    const { user } = useAuth();
    const { servers, loading: serverLoading } = useServer();
    const router = useRouter();

    useEffect(() => {
        if (serverLoading) return;
        if (servers.length === 0) return;

        router.replace(`/servers/${servers[0].id}/channels`);
    }, [serverLoading, servers, router]);

    if (serverLoading) return <Skeletons.FullPageSkeleton />;
    if (!user) return <Skeletons.AuthSkeleton />;

    if (servers.length === 0) {
        return (
            <EmptyPage username={user.username} page="server"/>
        );
    }

    return null;
}