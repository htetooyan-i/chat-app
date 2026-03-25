export const ChannelErrorCode = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    MISSING_PARAMETERS: 'MISSING_PARAMETERS',
    CHANNEL_NOT_FOUND: 'CHANNEL_NOT_FOUND',
    EXIST_CHANNEL: 'EXIST_CHANNEL',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const ChannelErrorMessage: Record<keyof typeof ChannelErrorCode, string> = {
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    CHANNEL_NOT_FOUND: 'Channel not found.',
    EXIST_CHANNEL: 'Channel already exists.',
    MISSING_PARAMETERS: 'Required parameters are missing.',
};
