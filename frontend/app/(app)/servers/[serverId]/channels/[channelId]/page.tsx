import React,{ use } from 'react';
import ChatPanel from "@/components/layout/ChatPanel";

function page({ params } : { params : Promise<{ serverId: string; channelId: string }>}) {
    const { serverId, channelId } = use(params);
    return (
        <div className="flex w-full">
            <ChatPanel/>
        </div>
    );
}

export default page;