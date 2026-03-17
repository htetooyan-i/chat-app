import { Message } from "./Message"

export type UploadAttachment = {
    url: string;
    publicId: string;
    type: 'image' | 'video' | 'raw' | 'pdf';
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