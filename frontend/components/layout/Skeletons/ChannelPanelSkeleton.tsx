import React from 'react';
import {Skeleton} from "antd";

function ChannelPanelSkeleton() {
    return (
        <div className="w-[300px] h-full flex flex-col bg-background shrink-0 overflow-hidden">
            <div className="h-[64px] flex items-end pb-1 px-5 shrink-0">
                <Skeleton.Button active block style={{ height: "40px", width: "100%", backgroundColor: "var(--muted-background)", borderRadius: "5px" }} />
            </div>
            <div className="flex flex-col gap-3 p-5 overflow-y-auto">
                {[...Array(5)].map((_, i) => (
                    <Skeleton.Node key={i} active style={{ height: "45px", width: "100%", backgroundColor: "var(--muted-background)", borderLeft: "4px solid var(--muted-border)", borderRadius: '0', borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }} />
                ))}
            </div>
        </div>
    );
}

export default ChannelPanelSkeleton;