export const AuthErrorCode = {
  EXIST_EMAIL: 'EXIST_EMAIL',
  EXIST_USERNAME: 'EXIST_USERNAME',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  INVALID_TOKEN: 'INVALID_TOKEN',
  INVALID_OTP: 'INVALID_OTP',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  EMAIL_ALREADY_VERIFIED: 'EMAIL_ALREADY_VERIFIED',
  MISSING_PARAMETERS: 'MISSING_PARAMETERS',
} as const;

export const AuthErrorMessage: Record<keyof typeof AuthErrorCode, string> = {
  EXIST_EMAIL: 'Your email is already registered.',
  EXIST_USERNAME: 'Your username is already taken.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_NOT_FOUND: 'User not found.',
  EMAIL_NOT_FOUND: 'Email not found.',
  WEAK_PASSWORD: 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, and digits.',
  WRONG_PASSWORD: 'Current password is incorrect.',
  INVALID_TOKEN: 'Invalid or expired token.',
  INVALID_OTP: 'Invalid OTP code.',
  EMAIL_ALREADY_VERIFIED: 'Email is already verified.',
  INTERNAL_SERVER_ERROR: 'Internal server error.',
  MISSING_PARAMETERS: 'Required parameters are missing.',
};
