import React, { useEffect, useState, type SetStateAction } from 'react';
import { useParams } from 'next/navigation';
import { Layout, Modal, ModalProps } from 'antd';
import { CircleX } from 'lucide-react';

import BanServerTab from './BanServerTab';
import DeleteServerTab from '@/components/server/settings/DeleteServerTab';
import InviteServerTab from './InviteServerTab';
import ServerMemberTab from './ServerMemberTab';
import ProfileServerTab from './ProfileServerTab';
import {getErrorMessage} from '@/lib/api';
import { useServer } from '@/hooks/useServer';
import { useNotification } from '@/hooks/useNotification';

import type { Server } from '@/types/Server';

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

// const tabTitles: Record<SettingsTab, string> = {
//   profile: "Server Profile",
//   members: "Members",
//   invites: "Invites",
//   bans: "Member Ban List",
//   delete: "Delete Server",
// };

function ServerSettingsModal({ show, onClose }: ServerSettingsModalProps) {

    const params = useParams();
    const serverId = Array.isArray(params.serverId) ? Number(params.serverId[0]) : Number(params.serverId);

    const { servers, updateServer } = useServer();
    const selectedServer = servers.find(s => String(s.id) === String(serverId));

    const { contextHolder, showSuccess, showError } = useNotification();

    const [ activeTab, setActiveTab ] = useState<SettingsTab>("profile");
    const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState<boolean>(false);
    const [ profileForm, setProfileForm ] = useState<Server | null>(null);
    const setProfileFormSafe = (value: SetStateAction<Server>) => {
        setProfileForm(value as SetStateAction<Server | null>);
    };

    useEffect(() => {
        if (selectedServer) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProfileForm(selectedServer);
            setHasUnsavedChanges(false);
        }
    }, [selectedServer]);

    const renderTab = () => {
        switch (activeTab) {
            case "profile":
                return profileForm ? (
                    <ProfileServerTab
                        hasUnsavedChanges={hasUnsavedChanges}
                        onDirtyChange={setHasUnsavedChanges}
                        serverProfile={profileForm}
                        setServerProfile={setProfileFormSafe}
                    />
                ) : null;

            case "members":
                return <ServerMemberTab />;

            case "invites":
                return <InviteServerTab />;

            case "bans":
                return <BanServerTab />;

            case "delete":
                return (
                    <DeleteServerTab
                        serverName={selectedServer?.name || "Server"}
                        onClose={() => onClose()}
                    />
                );

            default:
                return null;
        }
    };

    const handleSaveProfileChanges = async () => {
        try {
            await updateServer(profileForm!);
            showSuccess("Server profile updated successfully");
            setHasUnsavedChanges(false);
        } catch (error) {
            showError(getErrorMessage(error, "Failed to update server profile."));
        }
    }

    return (
        <div>
            {contextHolder}
            <Modal
            centered
            title={null}
            open={show}
            onCancel={() => {
                setActiveTab("profile");
                setHasUnsavedChanges(false);
                onClose();
            }}
            width={activeTab === "profile" ? "60%" : "80%"}
            styles={modalStyles}
            footer={
                <div className={`absolute bottom-5 right-20 flex justify-between items-center gap-2 px-4 py-2 bg-chat-panel rounded-md w-[75%] shadow-lg shadow-accent/10 transition-all duration-500 ease-in-out ${hasUnsavedChanges ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                    <div>
                        <p className="text-md font-semibold text-foreground">Careful - you have unsaved changes!</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-muted-background text-error border border-muted-border hover:bg-muted-background/70 px-2 py-1 rounded-lg font-semibold cursor-pointer" onClick={() => { // TODO: This should be changed in future, this works but it's not ideal to reset the form like this
                            setHasUnsavedChanges(false);
                            setProfileForm(selectedServer!);
                        }}>Reset</button>
                        <button className="bg-accent text-foreground hover:bg-accent/70 px-2 py-1 rounded-lg font-semibold cursor-pointer" onClick={handleSaveProfileChanges}>Save Changes</button>
                    </div>
                </div>
            }
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