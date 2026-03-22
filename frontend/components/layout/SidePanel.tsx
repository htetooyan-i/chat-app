import React from 'react';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import SideBar from './SideBar';
import ChannelPanel from './ChannelPanel';
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useServerLayout } from '@/hooks/useServerLayout';

function SidePanel() {
    const { panelCollapsed, setPanelCollapsed } = useServerLayout();
    const isMobile = useIsMobile();

    return (
        <>
            <div className='hidden md:flex h-full overflow-hidden'>
                <SideBar siderStyle={{ height: "100%" }} />
                <ChannelPanel siderStyle={{ height: "100%" }} />
            </div>
            {isMobile && (
                <Drawer
                    direction="left"
                    modal={false}
                    open={!panelCollapsed}
                    onOpenChange={(open) => setPanelCollapsed(!open)}
                >
                <DrawerContent style={{ borderColor : "var(--muted-border)", borderRadius: 0, maxWidth: "380px", zIndex: 50 } as React.CSSProperties}>
                    <DrawerHeader>
                    <VisuallyHidden.Root>
                        <DrawerTitle>Info Panel</DrawerTitle>
                    </VisuallyHidden.Root>
                    </DrawerHeader>
                    <div className='flex h-full rounded-r-lg overflow-hidden'>
                        <SideBar siderStyle={{ height: "100%" }} />
                        <ChannelPanel siderStyle={{ height: "100%", flex: 1 }} />
                    </div>
                </DrawerContent>
                </Drawer>
            )}
        </>

    );
}

export default SidePanel;