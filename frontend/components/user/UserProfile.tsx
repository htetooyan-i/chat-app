import React, { useRef, useState} from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { Avatar } from 'antd';

import ProfilePreviewModal from '@/components/ui/ProfilePreviewModal';
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { isImage } from "@/lib/helper";
import { useAuth } from "@/hooks/useAuth";


function UserProfile() {
    const { user, updateAvatar } = useAuth();
    const { upload } = useMediaUpload();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const avatarUrl = user?.avatarUrl || null;
    const [modalOpen, setModalOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !isImage(file)) {
            e.target.value = '';
            return;
        }
        // Just set a local preview — don't upload yet
        setPreviewUrl(URL.createObjectURL(file));
        setModalOpen(true);
        e.target.value = '';
    };


    const handleConfirm = async (blob: Blob) => {

        const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
        const uploaded = await upload(file);
        await updateAvatar(uploaded.url);
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setPreviewUrl(null);
    };

    return (
        <>
            {/* Crop Modal */}
            <ProfilePreviewModal
                open={modalOpen}
                previewUrl={previewUrl}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

            {/* Profile Row */}
            <div className='flex justify-start items-center py-4 gap-4 w-full'>
                <div
                    className="relative group cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Avatar shape="circle" size={86}>
                        <Image
                            src={avatarUrl ?? '/logo.png'}
                            alt="avatar"
                            width={86}
                            height={86}
                            style={{ objectFit: "cover", borderRadius: "100%" }}
                        />
                    </Avatar>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <div className="absolute inset-0 bg-black/50 rounded-full
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300
                                    flex items-center justify-center">
                        <Camera style={{ color: "var(--accent)" }} />
                    </div>
                </div>

                <p className="text-lg font-semibold">{user?.username}</p>
            </div>
        </>
    );
}

export default UserProfile;