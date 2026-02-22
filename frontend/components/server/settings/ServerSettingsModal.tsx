import React from 'react';
import { Avatar, Layout, Modal, ModalProps } from 'antd';
import { CircleX } from 'lucide-react';

import api from '@/lib/api';
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
    },
};

type ServerSettingsModalProps = {
    show: boolean;
    onClose: () => void;
};

function ServerSettingsModal({ show, onClose }: ServerSettingsModalProps) {

    const { selectedServer, setSelectedServer, setServers, refreshServers } = useServer();
    const { contextHolder, showSuccess, showError } = useNotification();

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
                <Layout>
                    <Sider style={{
                        backgroundColor: "var(--sidebar)",
                        height: "100%",
                        paddingBlock: "20px",
                        paddingInline: "10px",
                    }}
                    width={"25%"}
                    >
                        <div className="flex flex-col justify-between items-center">
                            <div className="flex flex-col items-center">
                                <Avatar src='/server-img.jpg' size={80} shape="circle" />
                                <h3 className="text-[18px] font-bold mt-3">{selectedServer?.name}</h3>
                            </div>
                            <div className="flex flex-col items-center">
                                <button className="bg-green-500 text-white px-4 py-2 rounded mb-2">Invite People</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteServer}>Delete Server</button>
                            </div>
                        </div>
                    </Sider>
                    <Content style={{
                        backgroundColor: "var(--chat-panel)",
                        padding: "20px",
                        flex: 1,
                    }}>
                        <p>Server settings content goes here...</p>
                    </Content>
                </Layout>


            </Modal>
        </div>
    );
}

export default ServerSettingsModal;