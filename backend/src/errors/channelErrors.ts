export const ChannelErrorCode = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    MISSING_PARAMETERS: 'MISSING_PARAMETERS',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const ChannelErrorMessage: Record<keyof typeof ChannelErrorCode, string> = {
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    INTERNAL_SERVER_ERROR: 'Internal server error.',
    MISSING_PARAMETERS: 'Required parameters are missing.',
};
