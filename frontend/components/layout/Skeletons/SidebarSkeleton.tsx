import React from 'react';
import { Skeleton } from "antd";

function SidebarSkeleton() {
    return (
        <div className="w-20 h-screen bg-normal-sidebar flex flex-col">

            {/* Header — user avatar */}
            <header className="h-16 flex justify-center items-center border-b border-muted-border shrink-0">
                <Skeleton.Avatar active size={50} shape="square" style={{ borderRadius: "10px", backgroundColor: "var(--muted-background)" }} />
            </header>

            {/* Server list */}
            <div className="flex flex-col items-center flex-1 overflow-hidden py-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton.Avatar key={i} active size={50} shape="circle" style={{ backgroundColor: "var(--muted-background)" }}/>
                ))}
            </div>

            {/* Footer — Add Server + Logout */}
            <footer className="flex flex-col items-center py-5 gap-4 border-t border-muted-border shrink-0">
                <Skeleton.Avatar active size={40} shape="circle"  style={{ backgroundColor: "var(--muted-background)" }}/>
                <Skeleton.Avatar active size={40} shape="square"  style={{ backgroundColor: "var(--muted-background)" }}/>
            </footer>
        </div>
    );
}

export default SidebarSkeleton;