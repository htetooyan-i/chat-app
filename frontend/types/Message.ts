export type Message = {
    id: string;
    channelId: string;
    authorId: string;
    replyToMessageId?: string;
    content: string;
    createdAt: Date | string;
    editedAt?: Date | string;
    clientId?: string;
    author: {
        id: string;
        username: string;
        avatarUrl: string;
    };
}