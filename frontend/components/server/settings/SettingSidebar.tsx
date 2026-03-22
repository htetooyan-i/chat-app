import React from 'react';
import { Layout } from 'antd';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useServerLayout } from '@/hooks/useServerLayout';
import { SettingsTab } from './ServerSettingsModal';
import { VisuallyHidden } from 'radix-ui';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"


const { Sider } = Layout;

type SettingSidebarProps = {
    selectedServerName: string;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<SettingsTab>>;
};

function SiderSidebar({ selectedServerName, activeTab, setActiveTab }: SettingSidebarProps) {
    return (
        <Sider style={{
            backgroundColor: "var(--normal-sidebar)",
            height: "100%",
            paddingBlock: "20px",
            paddingInline: "10px",
        }}
        >
            <div className="flex flex-col justify-start items-start h-full gap-4">
                <header>
                    <p className='uppercase text-[11px] font-bold'>
                        {selectedServerName}
                    </p>
                </header>
                {/* Settings List */}
                <main className='flex flex-col w-full gap-4'>
                    <div className={`text-[15px] h-7.5 w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center ${activeTab === "profile" ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`} onClick={() => setActiveTab("profile")}>
                        <p className='capitalize truncate font-semibold'>Profile</p>
                    </div>
                    <div className={`text-[15px] h-7.5 w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center ${activeTab === "members" ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`} onClick={() => setActiveTab("members")}>
                        <p className='capitalize truncate font-semibold'>Members</p>
                    </div>
                    <div className={`text-[15px] h-7.5 w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center ${activeTab === "invites" ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`} onClick={() => setActiveTab("invites")}>
                        <p className='capitalize truncate font-semibold'>Invites</p>
                    </div>
                    <div className={`text-[15px] h-7.5 w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center ${activeTab === "bans" ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`} onClick={() => setActiveTab("bans")}>
                        <p className='capitalize truncate font-semibold'>Bans</p>
                    </div>
                    <div className={`text-[15px] h-7.5 w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center border-error ${activeTab === "delete" ? 'bg-error/20' : 'bg-transparent'}`} onClick={() => setActiveTab("delete")}>
                        <p className='capitalize truncate text-error font-semibold'>Delete Server</p>
                    </div>
                                                    
                </main>
            </div>
        </Sider>
    )
}

function SettingSidebar({ selectedServerName, activeTab, setActiveTab }: SettingSidebarProps) {
    const isMobile = useIsMobile();
    const { settingTabCollapsed, setSettingTabCollapsed } = useServerLayout();

    return (
        <div className="relative">
            <div className="flex h-full w-[15%] hidden md:flex">
                <SiderSidebar selectedServerName={selectedServerName} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            {/* {isMobile && (
                <Drawer
                    direction="left"
                    modal={false}
                    open={!settingTabCollapsed}
                    onOpenChange={(open) => setSettingTabCollapsed(!open)}
                >
                    <DrawerContent style={{ borderColor : "var(--muted-border)", borderRadius: 0, maxWidth: "380px", zIndex: 50 } as React.CSSProperties}>
                        <DrawerHeader>
                        <VisuallyHidden.Root>
                            <DrawerTitle>Info Panel</DrawerTitle>
                        </VisuallyHidden.Root>
                        </DrawerHeader>
                        <div className='flex h-full rounded-r-lg overflow-hidden'>
                            <SiderSidebar selectedServerName={selectedServerName} activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    </DrawerContent>
                </Drawer>
            )} */}
            {isMobile && (
                <div className={`absolute inset-y-0 left-0 z-50 transition-transform duration-300 ${settingTabCollapsed ? '-translate-x-full' : 'translate-x-0'}`}>
                    <SiderSidebar selectedServerName={selectedServerName} activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            )}
            
        </div>
    );
}

export default SettingSidebar;