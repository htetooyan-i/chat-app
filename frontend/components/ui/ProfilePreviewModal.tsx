import { useState, useCallback } from 'react';
import {Modal, ModalProps, Slider} from "antd";
import {X} from "lucide-react";
import Cropper, { Area } from "react-easy-crop";
import { toast } from "sonner";

// Converts crop area to a blob using canvas
async function getCroppedBlob(imageSrc: string, croppedAreaPixels: Area): Promise<Blob> {
    const image = await createImageBitmap(await (await fetch(imageSrc)).blob());
    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(
        image,
        croppedAreaPixels.x, croppedAreaPixels.y,
        croppedAreaPixels.width, croppedAreaPixels.height,
        0, 0,
        croppedAreaPixels.width, croppedAreaPixels.height
    );
    return new Promise(res => canvas.toBlob(blob => res(blob!), 'image/jpeg'));
}

// Modal styles
const modalStyles: ModalProps['styles'] = {
    mask: {
        backgroundImage: `linear-gradient(to top, #18181b 0, rgba(21, 21, 22, 0.2) 100%)`,
    },
    container: {
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        borderRadius: '10px',
        border: '1px solid var(--muted-border)',
    },
    title: {
        color: 'var(--foreground)',
        fontSize: '23px',
        fontWeight: 'bold',
    },
    body: {
        color: 'var(--foreground)',
        overflowY: 'auto',
    },
    footer: {
        backgroundColor: 'var(--background)',
    },
};

// Button styles
const okButtonProps = {
    style: {
        backgroundColor: 'var(--accent)',
        borderColor: 'var(--accent)',
        color: '#fff',
    },
};

const cancelButtonProps = {
    style: {
        backgroundColor: 'var(--muted-background)',
        borderColor: 'var(--muted-border)',
        color: 'var(--muted-text)',
    },
};

export type ProfilePreviewModalProps = {
    open: boolean;
    previewUrl: string | null;
    onConfirm: (blob: Blob) => void;
    onCancel: () => void;
}

function ProfilePreviewModal({ open, previewUrl, onConfirm, onCancel }: ProfilePreviewModalProps) {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [uploading, setUploading] = useState(false);

    const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleConfirm = async () => {
        if (!previewUrl || !croppedAreaPixels) return;
        setUploading(true);
        try {
            const blob = await getCroppedBlob(previewUrl, croppedAreaPixels);
            onConfirm(blob); // just return the blob, caller decides what to do
            toast.success("Profile picture updated successfully!");
        } catch (error) {
            console.error("Error cropping image:", error);
            toast.error("Failed to crop image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleCancel = () => {
        onCancel();
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    }

    return (
        <Modal
            open={open}
            title="Customize Your Profile Picture"
            onOk={handleConfirm}
            onCancel={handleCancel}
            okText="Save"
            confirmLoading={uploading}
            styles={modalStyles}
            okButtonProps={okButtonProps}
            cancelButtonProps={cancelButtonProps}
            closeIcon={<X size={18} style={{ color: 'var(--muted-text)' }} />}
        >
            <div className="relative w-full h-72 bg-gray-900">
                {previewUrl && (
                    <Cropper
                        image={previewUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                )}
            </div>
            <div className="px-4 pt-4">
                {/* FIXME: Handle has blue outline*/}
                <Slider
                    min={1}
                    max={3}
                    step={0.05}
                    value={zoom}
                    onChange={setZoom}
                    styles={{
                        track: { backgroundColor: 'var(--accent)' },
                        handle: { borderColor: 'var(--accent)', backgroundColor: 'var(--accent)', outline: 'none' },
                        rail: { backgroundColor: 'var(--muted-background)' },
                    }}
                />
            </div>
        </Modal>
    );
}

export default ProfilePreviewModal;