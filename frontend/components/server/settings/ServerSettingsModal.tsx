import { useState, useEffect } from 'react';

import BanServerTab from './BanServerTab';
import DeleteServerTab from '@/components/server/settings/DeleteServerTab';
import InviteServerTab from './InviteServerTab';
import SettingSidebar from './SettingSidebar';
import ServerMemberTab from './ServerMemberTab';
import ProfileServerTab from './ProfileServerTab';
import { useServerLayout } from '@/hooks/useServerLayout';
import { useServer } from '@/hooks/useServer';
import { useServerAdmin } from '@/hooks/useServerAdmin';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VisuallyHidden } from 'radix-ui';


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

    const { setSettingTabCollapsed } = useServerLayout();
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
                <DialogContent className="sm:max-w-[80%] z-100 min-h-[80vh] p-0 overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="px-2 pt-2">
                            <p className="text-xl font-bold capitalize mb-4" onClick={() => setSettingTabCollapsed(prev => !prev)}>
                                {tabTitles[activeTab]}
                            </p>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex h-full w-full">
                        <SettingSidebar selectedServerName={selectedServer.name} activeTab={activeTab} setActiveTab={setActiveTab} />
                        <ScrollArea className="flex-1 h-full bg-background text-foreground px-2 sm:px-5 md:px-[50px] pb-[20px]">
                            {renderTab()}
                        </ScrollArea>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default ServerSettingsModal;
