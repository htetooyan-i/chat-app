export type Message = {
    id: string;
    channelId: string;
    authorId: string;
    replyToMessageId?: string | null; // Optional field for replies
    content: string;
    createdAt: Date | string;
    editedAt?: Date | string;
    replyToDeleted?: boolean; // Flag to indicate if the replied-to message was deleted
    clientMsgId?: string;
    replyTo?: Message | null; // Optional nested message for replies
    author: {
        id: string;
        username: string;
        avatarUrl: string;
    };
}