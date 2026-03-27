import { prisma } from '../lib/prisma';
import { AuthErrorCode, AuthErrorMessage } from '../errors/authErrors';
import { AppError } from '../errors/appError';
import { Hash } from '../lib/hash';
import { createAccessToken, createRefreshToken, verifyToken } from '../lib/jwt';
import { checkPasswordStrength } from '../lib/helper';

class AuthService {

    // CREATE USER
    static async create (username: string, email: string, password: string) {

        const existingEmail = await prisma.user.findUnique({ where: { email } });

        if (existingEmail) {
            throw new AppError(AuthErrorCode.EXIST_EMAIL, AuthErrorMessage.EXIST_EMAIL, 409);
        }

        const existingUsername = await prisma.user.findUnique({ where: { username } });
        if (existingUsername) {
            throw new AppError(AuthErrorCode.EXIST_USERNAME, AuthErrorMessage.EXIST_USERNAME, 409);
        }  

        if (!checkPasswordStrength(password)) {
            throw new AppError(AuthErrorCode.WEAK_PASSWORD, AuthErrorMessage.WEAK_PASSWORD, 400);
        }

        const hashedPassword = await Hash.hash(password);
        const newUser = await prisma.user.create({
            data: {
                email: email,
                username: username,
                passwordHash: hashedPassword,
                presence: {
                    create: {
                        status: 'offline',
                    },
                },
            },
        });
        const accessToken = await createAccessToken({ userId: newUser.id, email: newUser.email });
        const refreshToken = await createRefreshToken({ userId: newUser.id });

        return { ...newUser, accessToken, refreshToken };
        
    }; 

    // LOGIN USER
    static async login (email: string, password: string) {

        const user = await prisma.user.findUnique({ where: { email } });
        const isPasswordValid = user ? await Hash.verify(user.passwordHash, password) : false;

        if (!user || !isPasswordValid) {
            throw new AppError(AuthErrorCode.INVALID_CREDENTIALS, AuthErrorMessage.INVALID_CREDENTIALS, 401);
        }

        // Generate tokens
        try {
            const accessToken = await createAccessToken({
            userId: user.id,
            email: user.email,
            });

            const refreshToken = await createRefreshToken({
            userId: user.id,
            });
            return { accessToken, refreshToken };
        } catch (err: any) {
            console.error("Error generating tokens:", err.message);
            throw new AppError(AuthErrorCode.INTERNAL_SERVER_ERROR, AuthErrorMessage.INTERNAL_SERVER_ERROR, 500);
        }
        
    };

    // GET CURRENT USER
    static async me(userId: number) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError(AuthErrorCode.USER_NOT_FOUND, AuthErrorMessage.USER_NOT_FOUND, 404);
        }
        return user;
    }

    static async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new AppError(AuthErrorCode.EMAIL_NOT_FOUND, AuthErrorMessage.EMAIL_NOT_FOUND, 404);
        }
        return user;
    }

    static async getUserById(id: number) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError(AuthErrorCode.USER_NOT_FOUND, AuthErrorMessage.USER_NOT_FOUND, 404);
        }
        return user;
    }

    // REFRESH ACCESS TOKEN
    static async refreshAccessToken(refreshToken: string) {
        const payload = await verifyToken<{
                            userId: number;
                            email: string;
                            exp: number;
                        }>(refreshToken);

        const newAccessToken = await createAccessToken({ userId: payload.userId, email: payload.email });
        return { accessToken: newAccessToken };

    }

    // LOGOUT USER
    static async logout(accessToken: string) {
        // OPTIONAL: revoke access and refresh tokens in a token blacklist or database
        return;
    }

    // DELETE USER
    static async deleteUser(userId: number) {
        try {
            await prisma.user.delete({
                where: { id: userId },
            });
        } catch (err) {
            throw new AppError(AuthErrorCode.INTERNAL_SERVER_ERROR, AuthErrorMessage.INTERNAL_SERVER_ERROR, 500);
        }
    }

    // Change Password
    static async changePassword(userId: number, currentPassword: string, newPassword: string, isVerified = false) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError(AuthErrorCode.USER_NOT_FOUND, AuthErrorMessage.USER_NOT_FOUND, 404);
        }

        if (!isVerified) {
            const isCurrentPasswordValid = await Hash.verify(user.passwordHash, currentPassword);
            if (!isCurrentPasswordValid) {
                throw new AppError(AuthErrorCode.WRONG_PASSWORD, AuthErrorMessage.WRONG_PASSWORD, 400);
            }
        }

        const newHashedPassword = await Hash.hash(newPassword);
        try {
            await prisma.user.update({
                where: { id: userId },
                data: { passwordHash: newHashedPassword },
            });
        } catch (err) {
            throw new AppError(AuthErrorCode.INTERNAL_SERVER_ERROR, AuthErrorMessage.INTERNAL_SERVER_ERROR, 500);
        }
    }

    // Update user verification status
    static async changeUserVerificationStatus(userId: number, verified: boolean) {
        try {
            await prisma.user.update({
                where: { id: userId },
                data: { verified: verified },
            });
        } catch (err) {
            throw new AppError(AuthErrorCode.INTERNAL_SERVER_ERROR, AuthErrorMessage.INTERNAL_SERVER_ERROR, 500);
        }
    }

    // Check if user is verified
    static async isUserVerified(userId: number): Promise<boolean> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError(AuthErrorCode.USER_NOT_FOUND, AuthErrorMessage.USER_NOT_FOUND, 404);
        }
        return user.verified;
    }

    static async verifyPassword(user: any, password: string) {
        try {
            await Hash.verify(user.passwordHash, password);
        } catch (err: any) {
            console.error("Error verifying password:", err.message);
            throw new AppError(AuthErrorCode.INTERNAL_SERVER_ERROR, AuthErrorMessage.INTERNAL_SERVER_ERROR, 500);
        }
    }



}

export default AuthService;
