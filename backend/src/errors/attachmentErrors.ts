export const AttachmentErrorCode = {
  MISSING_PARAMETERS: 'MISSING_PARAMETERS',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export const AttachmentErrorMessage: Record<keyof typeof AttachmentErrorCode, string> = {
  MISSING_PARAMETERS: 'Required parameters are missing.',
  INTERNAL_SERVER_ERROR: 'An unexpected error occurred while processing the request.',
};