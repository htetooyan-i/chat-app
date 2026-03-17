import React from 'react';
import {Skeleton} from "antd";

function ChannelPanelSkeleton() {
    return (
        <div>
            <div className="flex w-full">
                {/* Channel panel skeleton */}
                <div className="w-[300px] h-screen flex flex-col bg-background shrink-0">
                    <div className="h-[64px] flex items-end pb-1 px-5">
                        <Skeleton.Button active block style={{ height: "40px", width: "100%", backgroundColor: "var(--muted-background)", borderRadius: "5px" }} />
                    </div>
                    <div className="flex flex-col gap-3 p-5">
                        {[...Array(5)].map((_, i) => (
                            // <div key={i} className="h-[45px] w-full bg-gray-700 rounded-r-sm border-l-4 border-gray-600" />
                            <Skeleton.Node key={i} active style={{ height: "45px", width: "100%", backgroundColor: "var(--muted-background)", borderLeft: "4px solid var(--muted-border)", borderRadius: '0', borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChannelPanelSkeleton;