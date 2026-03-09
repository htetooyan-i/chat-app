import { Message } from "./Message"

export type UploadAttachment = {
    url: string;
    publicId: string;
    type: 'image' | 'video' | 'raw';
}

export type Attachment = {
    id: number,
    messageId: number,
    type: string,
    publicId: string,
    url: string,
    message?: Message
}