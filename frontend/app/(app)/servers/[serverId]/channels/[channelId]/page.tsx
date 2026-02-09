import React,{ use } from 'react';

function page({ params } : { params : Promise<{ serverId: string; channelId: string }>}) {
    const { serverId, channelId } = use(params);
    return (
        <div>
            <h1>{`Server ID: ${serverId}, Channel ID: ${channelId}`}</h1>
        </div>
    );
}

export default page;