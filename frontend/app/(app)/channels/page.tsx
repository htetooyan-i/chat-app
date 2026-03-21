"use client";

import { useEffect } from "react";
import {useParams, useRouter} from "next/navigation";

import Skeletons from "@/components/layout/Skeletons";
import EmptyPage from "@/components/layout/EmptyPage";
import { useServer } from "@/hooks/useServer";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {

    const { user } = useAuth();
    const { servers, loading: serverLoading } = useServer();
    const router = useRouter();

    useEffect(() => {
        if (serverLoading) return;
        if (servers.length === 0) return;

        router.replace(`/channels/${servers[0].id}/`);
    }, [serverLoading, servers, router]);

    if (!serverLoading && user && servers.length === 0) {
        return (
            <EmptyPage username={user.username} page="server"/>
        );
    }

    return (
        <div className="flex w-full h-full min-w-0">
            <Skeletons.ChatPanelSkeleton />
        </div>
    );
}