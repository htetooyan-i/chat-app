import { Message } from "./Message"
import { ApiResponse } from "./ApiResponse"

export type UploadAttachment = {
    url: string;
    publicId: string;
    type: 'image' | 'video' | 'raw';
    originalName: string;
}

export type Attachment = {
    id: number,
    originalName: string,
    messageId: number,
    type: string,
    publicId: string,
    url: string,
    message?: Message
}

export type GetAttachmentsResponse = ApiResponse<{
    items: Attachment[];
    pagination: {
        page: number;
        limit: number;
        totalImages: number;
        totalRaws: number;
    };
}>;

export type DeleteAttachmentResponse = ApiResponse<void>;
