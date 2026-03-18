import { useState } from "react";

import { api, cloudinaryApi } from "@/lib/api"
import {ApiResponse} from "@/types/ApiResponse";

type MediaUploadResponse = ApiResponse<{
    timestamp: number,
    signature: string
}>

export const useMediaUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const upload = async (file: File) => {

        setUploading(true);

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

        if (!cloudName || !apiKey) throw new Error('Cloudinary env variables are not set');

        try {
            // get signature
            const res: MediaUploadResponse = await api.get('/messages/attachments/sign-upload').then(res => res.data);

            // upload to cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', res.data.signature);
            formData.append('timestamp', res.data.timestamp.toString());
            formData.append('api_key', apiKey);
            formData.append('folder', 'chat-media');
            formData.append('type', 'upload');
            // formData.append('format', format);

            const { data } = await cloudinaryApi.post(
                `/auto/upload`,
                formData,
                {
                    onUploadProgress: (e) => {
                        if (e.total) {
                            setProgress(Math.round((e.loaded * 100) / e.total));
                        }
                    }
                }
            );

            const getResourceType = (file: File, cloudinaryType: string): 'image' | 'video' | 'raw' => {
                if (file.type === 'application/pdf') return 'raw';
                return cloudinaryType as 'image' | 'video' | 'raw';
            };

            return {
                url: data.secure_url,
                publicId: data.public_id,
                type: getResourceType(file, data.resource_type),
                originalName: file.name,
            };
        } finally {
            setUploading(false);
            setProgress(0);
        }

    };

    const deleteFile = async (publicId: string, resourceType: 'image' | 'video' | 'raw') => {
        await api.delete('/messages/attachments', {
            data: { publicId, resourceType }
        });
    };

    return { upload, deleteFile, uploading, progress };
};