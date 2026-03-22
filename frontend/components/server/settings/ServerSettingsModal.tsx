import { useState, useEffect } from 'react';

import BanServerTab from './BanServerTab';
import DeleteServerTab from '@/components/server/settings/DeleteServerTab';
import InviteServerTab from './InviteServerTab';
import SettingSidebar from './SettingSidebar';
import ServerMemberTab from './ServerMemberTab';
import ProfileServerTab from './ProfileServerTab';
import { useServer } from '@/hooks/useServer';
import { useServerAdmin } from '@/hooks/useServerAdmin';
import {
  Dialog,
  DialogContent,
  DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { VisuallyHidden } from 'radix-ui';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useServerLayout } from '@/hooks/useServerLayout';


type ServerSettingsModalProps = {
    show: boolean;
    serverId: number | null;
    onClose: () => void;
};

export type SettingsTab = "profile" | "members" | "invites" | "bans" | "delete";

const tabTitles: Record<SettingsTab, string> = {
  profile: "Server Profile",
  members: "Members",
  invites: "Invites",
  bans: "Member Ban List",
  delete: "Delete Server",
};

function ServerSettingsModal({ show, serverId, onClose }: ServerSettingsModalProps) {

    const { settingTabCollapsed, setSettingTabCollapsed } = useServerLayout();
    const isMobile = useIsMobile();
    const { servers } = useServer();
    const { setPreviewServerId, clearPreviewServer } = useServerAdmin();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));

    useEffect(() => {
        if (show && selectedServer?.id) {
            setPreviewServerId(selectedServer.id);
        } else if (!show) {
            clearPreviewServer();
        }
    }, [show, selectedServer?.id, setPreviewServerId, clearPreviewServer]);

    useEffect(() => {
        if (show && !selectedServer) {
            onClose();
        }
    }, [show, selectedServer, onClose]);

    const [ activeTab, setActiveTab ] = useState<SettingsTab>("profile");
    const [modalKey, setModalKey] = useState(0); // FIXME: this is used to track tab changes but want to change this

    if (!selectedServer) return null; // FIXME: this should never happen because the modal should be closed if no server is selected, but just in case if happen, redirect to error page

    const renderTab = () => {
        if (!selectedServer) {
            return null;
        }

        switch (activeTab) {
            case "profile":
                return <ProfileServerTab key={modalKey} selectedServer={selectedServer}/>;

            case "members":
                return <ServerMemberTab selectedServer={selectedServer}/>;

            case "invites":
                return <InviteServerTab selectedServer={selectedServer}/>;

            case "bans":
                return <BanServerTab selectedServer={selectedServer}/>;

            case "delete":
                return (
                    <DeleteServerTab
                        selectedServer={selectedServer}
                        onClose={() => {setActiveTab("profile"); onClose()}}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={show} onOpenChange={(open) => {
            if (!open) {
                setActiveTab("profile");
                setModalKey(k => k + 1);
                onClose();
            }
        }}>

            <form>
                <DialogContent className="flex flex-col sm:max-w-[80%] z-100 h-[80dvh] max-h-[80dvh] min-h-0 p-0 overflow-hidden">
                    <VisuallyHidden.Root>
                        <DialogHeader>
                            <DialogTitle>{tabTitles[activeTab]}</DialogTitle>
                        </DialogHeader>
                    </VisuallyHidden.Root>
                    <div className="flex-1 flex h-full min-h-0 w-full">
                        <SettingSidebar selectedServerName={selectedServer.name} activeTab={activeTab} setActiveTab={setActiveTab} />

                        {/* Overlay when sidebar is open on mobile */}
                        {(isMobile && !settingTabCollapsed) && (
                            <div 
                                className="absolute inset-0 bg-black/20 z-40 backdrop-blur-sm"
                                onClick={() => setSettingTabCollapsed(true)}
                            />
                        )}

                        <div className="flex-1 h-full bg-background text-foreground px-2 sm:px-5 md:px-[50px] pb-[20px]">
                            {renderTab()}
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default ServerSettingsModal;
