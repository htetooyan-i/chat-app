import React, {useRef, useState} from 'react';
import { CameraOutlined } from '@ant-design/icons';
import {isImage} from "@/lib/helper";
import {useMediaUpload} from "@/hooks/useMediaUpload";
import ProfilePreviewModal from "@/components/ui/ProfilePreviewModal";
import { Avatar } from "antd";
import { Camera, Plus } from "lucide-react";

type CreateServerModalProps = {
    isSucceed: boolean;
    serverName: string;
    setServerName: (name: string) => void;
    inviteCode: string;
    avatarUrl: string;
    setAvatarUrl: (url: string) => void;
}

function CreateServer({ isSucceed, serverName, setServerName, inviteCode, avatarUrl, setAvatarUrl }: CreateServerModalProps) {

    const [ copied, setCopied ] = React.useState(false);

    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(inviteCode)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy invite link:", err);
            });
    }

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { upload } = useMediaUpload();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !isImage(file)) {
            e.target.value = '';
            return;
        }
        setPreviewUrl(URL.createObjectURL(file));
        setModalOpen(true);
        e.target.value = '';
    };

    const handleConfirm = async (blob: Blob) => {

        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
        const uploaded = await upload(file);
        setAvatarUrl(uploaded.url);
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setPreviewUrl(null);
    };
    return (
        <div>
            <ProfilePreviewModal
                open={modalOpen}
                previewUrl={previewUrl}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            {!isSucceed ? (
                <main className="flex flex-col gap-10 items-center justify-center">
                    <p className='text-[12px] text-muted-text'>Give your new server a personality with a name and an icon. You can always change it later.</p>
                    <div className={`relative rounded-full text-muted-text cursor-pointer ${avatarUrl ? "" : "p-8 border-2 border-dashed border-muted-text "}`} onClick={() => fileInputRef.current?.click()}>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        {
                            avatarUrl ? (
                                <div className="relative group cursor-pointer" >
                                    <Avatar
                                        size={100}
                                        src={avatarUrl}
                                    />
                                    <div className="absolute inset-0 bg-black/50 rounded-full
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300
                                    flex items-center justify-center">
                                        <Camera style={{ color: "var(--accent)" }} />
                                    </div>
                                </div>
                            ): (
                                <CameraOutlined className="text-[40px]" />
                            )
                        }
                        <div className="absolute top-0 right-1 text-accent bg-accent/50 rounded-full flex items-center justify-center">
                            <Plus />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label htmlFor="serverName" className="text-[14px] font-bold">Server Name <span className='text-error'>*</span></label>
                        <input 
                            type="text" 
                            id="serverName" 
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            className="bg-chat-panel border border-muted-border rounded-lg p-2 text-[12px] outline-none focus:ring-0 focus:border-accent"
                        />
                    </div>
                </main>

            ) : (
                <main className='flex flex-col gap-4'>
                    <p className='text-[12px] text-muted-text'>Invite others to join your server using the link below.</p>

                    <button className={`w-full px-4 py-2 text-foreground rounded hover:opacity-80 cursor-pointer ${copied ? 'bg-green-500/10 border border-success' : 'bg-accent'}`} onClick={handleCopyInviteLink}>{copied ? "Copied!" : inviteCode}</button>
                </main>
            )
            }
        </div>
    );
}

export default CreateServer;