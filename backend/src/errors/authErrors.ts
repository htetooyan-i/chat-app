export const AuthErrorCode = {
  EXIST_EMAIL: 'EXIST_EMAIL',
  EXIST_USERNAME: 'EXIST_USERNAME',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
} as const;

export const AuthErrorMessage: Record<keyof typeof AuthErrorCode, string> = {
  EXIST_EMAIL: 'Your email is already registered.',
  EXIST_USERNAME: 'Your username is already taken.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User not found.',
};
