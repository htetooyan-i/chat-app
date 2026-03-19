import React, { useState, useEffect } from 'react';
import { Layout, Modal, ModalProps } from 'antd';
import { CircleX } from 'lucide-react';

import BanServerTab from './BanServerTab';
import DeleteServerTab from '@/components/server/settings/DeleteServerTab';
import InviteServerTab from './InviteServerTab';
import ServerMemberTab from './ServerMemberTab';
import ProfileServerTab from './ProfileServerTab';
import { useServer } from '@/hooks/useServer';
import { useServerAdmin } from '@/hooks/useServerAdmin';


const { Content, Sider } = Layout;

const modalStyles: ModalProps['styles'] = {
    mask: {
        backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
    },
  
    container: { 
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        borderRadius: '10px',
        border: '1px solid var(--muted-border)',
        padding: 0,
        overflow: 'hidden',
        height: "70vh",
    },
    body: {
        padding: 0,
        height: "100%",
    }
};

type ServerSettingsModalProps = {
    show: boolean;
    serverId: number | null;
    onClose: () => void;
};

type SettingsTab = "profile" | "members" | "invites" | "bans" | "delete";

// const tabTitles: Record<SettingsTab, string> = {
//   profile: "Server Profile",
//   members: "Members",
//   invites: "Invites",
//   bans: "Member Ban List",
//   delete: "Delete Server",
// };

function ServerSettingsModal({ show, serverId, onClose }: ServerSettingsModalProps) {

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
        <div>
            <Modal
            centered
            title={null}
            open={show}
            onCancel={() => {
                setActiveTab("profile");
                setModalKey(k => k + 1);
                onClose();
            }}
            width={activeTab === "profile" ? "60%" : "80%"}
            styles={modalStyles}
            closeIcon={
                <CircleX color="#ffffff" width={32} height={32} />
            }
            
            >
                <Layout style={{ height: "100%" }}>
                    <Sider style={{
                        backgroundColor: "var(--normal-sidebar)",
                        height: "100%",
                        paddingBlock: "20px",
                        paddingInline: "10px",
                    }}
                    width={"15%"}
                    >
                        <div className="flex flex-col justify-start items-start h-full gap-4">
                            <header>
                                <p className='uppercase text-[11px] font-bold'>{selectedServer?.name}</p>
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
                    <Content style={{
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        paddingBlock: "20px",
                        paddingInline: "50px",
                        flex: 1,
                    }}>
                        {renderTab()}
                    </Content>
                </Layout>

            </Modal>
        </div>
    );
}

export default ServerSettingsModal;