import { User } from "./User";
import {Attachment} from "./Attachment";
import { ApiResponse } from "./ApiResponse";

export type Reaction = {
    id: string;
    userId: number;
    messageId: number;
    emoji: string;
    createdAt: Date;
}

export type Message = {
    id: number;
    channelId: number;
    authorId: number;
    replyToMessageId?: number | null; // Optional field for replies
    content: string;
    createdAt: Date | string;
    editedAt?: Date | string;
    replyToDeleted?: boolean; // Flag to indicate if the replied-to message was deleted
    clientMsgId?: string;
    replyTo?: Message | null; // Optional nested message for replies
    attachments?: Attachment[];
    author: User;
    reactions?: {
        emoji: string;
        count: number;
        userIds: number[];
    }[];
}

export type GetMessagesResponse = ApiResponse<Message[]>;
export type EditMessageResponse = ApiResponse<Message>;