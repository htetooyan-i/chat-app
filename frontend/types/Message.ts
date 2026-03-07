import { User } from "./User";

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
    author: User;
}