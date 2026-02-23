import React, { useState } from 'react';
import { Layout, Modal, ModalProps } from 'antd';
import { CircleX } from 'lucide-react';

import api from '@/lib/api';
import DeleteServerTab from '@/components/server/settings/DeleteServerTab';
import { useServer } from '@/hooks/useServer';
import { useNotification } from '@/hooks/useNotification';

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
    onClose: () => void;
};

type SettingsTab = "profile" | "members" | "invites" | "bans" | "delete";

const tabTitles: Record<SettingsTab, string> = {
  profile: "Server Profile",
  members: "Members",
  invites: "Invites",
  bans: "Member Ban List",
  delete: "Delete Server",
};

function ServerSettingsModal({ show, onClose }: ServerSettingsModalProps) {

    const { selectedServer, setSelectedServer, setServers, refreshServers } = useServer();
    const { contextHolder, showSuccess, showError } = useNotification();
    const [ activeTab, setActiveTab ] = useState<SettingsTab>("profile");

    const handleDeleteServer = async () => {
        try {
            await api.delete(`/servers/${selectedServer?.id}`);
            showSuccess("Server deleted successfully");
            setServers(prev => prev.filter(server => server.id !== selectedServer?.id));
            setSelectedServer(null);
            refreshServers();
            onClose();
        } catch (error: any) {
            console.error("Error deleting server:", error.message);
            showError(error.error || "Failed to delete server.");
        }   
    }
    return (
        <div>
            {contextHolder}
            <Modal
            centered
            title={null}
            open={show}
            onCancel={onClose}
            width={"70%"}
            styles={modalStyles}
            footer={null}
            closeIcon={
                <CircleX color="#ffffff" width={32} height={32} />
            }
            
            >
                <Layout style={{ height: "100%" }}>
                    <Sider style={{
                        backgroundColor: "var(--sidebar)",
                        height: "100%",
                        paddingBlock: "20px",
                        paddingInline: "10px",
                    }}
                    width={"25%"}
                    >
                        <div className="flex flex-col justify-start items-start h-full gap-4">
                            <header>
                                <p className='uppercase text-[11px] font-bold'>{selectedServer?.name}</p>
                            </header>
                            {/* Settings List */}
                            <main className='flex flex-col w-full gap-4'>
                                <div className={`text-[15px] h-[30px] w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center ${activeTab === "profile" ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`} onClick={() => setActiveTab("profile")}>
                                    <p className='capitalize truncate font-semibold'>Profile</p>
                                </div>
                                <div className={`text-[15px] h-[30px] w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center ${activeTab === "members" ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`} onClick={() => setActiveTab("members")}>
                                    <p className='capitalize truncate font-semibold'>Members</p>
                                </div>
                                <div className={`text-[15px] h-[30px] w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center ${activeTab === "invites" ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`} onClick={() => setActiveTab("invites")}>
                                    <p className='capitalize truncate font-semibold'>Invites</p>
                                </div>
                                <div className={`text-[15px] h-[30px] w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center ${activeTab === "bans" ? 'border-accent  bg-chat-panel' : 'border-muted-border'}`} onClick={() => setActiveTab("bans")}>
                                    <p className='capitalize truncate font-semibold'>Bans</p>
                                </div>
                                <div className={`text-[15px] h-[30px] w-full p-2 border-s-3 rounded-r-sm cursor-pointer flex items-center ${activeTab === "delete" ? 'border-error  bg-chat-panel' : 'border-muted-border'}`} onClick={() => setActiveTab("delete")}>
                                    <p className='capitalize truncate text-error font-semibold'>Delete Server</p>
                                </div>

                            </main>
                        </div>
                    </Sider>
                    <Content style={{
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        padding: "20px",
                        flex: 1,
                    }}>
                        <header>
                            <p className="text-xl font-bold capitalize">{tabTitles[activeTab]}</p>
                            { activeTab === "delete" && <DeleteServerTab deleteServer={handleDeleteServer} serverName={selectedServer?.name || "Server"} onclose={() => onClose()} /> }
                        </header>
                    </Content>
                </Layout>


            </Modal>
        </div>
    );
}

export default ServerSettingsModal;