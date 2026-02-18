import { prisma } from '../lib/prisma';
import { AuthErrorCode } from '../errors/authErrors';
import { Hash } from '../lib/hash';
import { createAccessToken, createRefreshToken, verifyToken } from '../lib/jwt';
import { checkPasswordStrength } from '../lib/helper';

export class AuthService {

    // CREATE USER
    static async create (username: string, email: string, password: string) {

        const existingEmail = await prisma.user.findUnique({ where: { email } });

        if (existingEmail) {
            throw new Error(AuthErrorCode.EXIST_EMAIL);
        }

        const existingUsername = await prisma.user.findUnique({ where: { username } });
        if (existingUsername) {
            throw new Error(AuthErrorCode.EXIST_USERNAME);
        }  

        if (!checkPasswordStrength(password)) {
            throw new Error(AuthErrorCode.WEAK_PASSWORD);
        }

        const hashedPassword = await Hash.hash(password);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                username: username,
                passwordHash: hashedPassword,
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
            throw new Error(AuthErrorCode.INVALID_CREDENTIALS);
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
        } catch (err) {
            throw err;
        }
        
    };

    // GET CURRENT USER
    static async me(userId: number) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error(AuthErrorCode.USER_NOT_FOUND);
        }
        return { id: user.id, username: user.username, email: user.email };
    }

    static async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error(AuthErrorCode.USER_NOT_FOUND);
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
            throw new Error("Failed to delete user");
        }
    }

    // Change Password
    static async changePassword(userId: number, currentPassword: string, newPassword: string, isVerified = false) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error(AuthErrorCode.USER_NOT_FOUND);
        }

        if (!isVerified) {
            const isCurrentPasswordValid = await Hash.verify(user.passwordHash, currentPassword);
            if (!isCurrentPasswordValid) {
                throw new Error(AuthErrorCode.INVALID_CREDENTIALS);
            }
        }

        const newHashedPassword = await Hash.hash(newPassword);
        try {
            await prisma.user.update({
                where: { id: userId },
                data: { passwordHash: newHashedPassword },
            });
        } catch (err) {
            throw new Error("Failed to change password");
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
            throw new Error("Failed to verify user");
        }
    }

    // Check if user is verified
    static async isUserVerified(userId: number): Promise<boolean> {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error(AuthErrorCode.USER_NOT_FOUND);
        }
        return user.verified;
    }



}


