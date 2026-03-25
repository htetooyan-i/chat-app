import { Hash } from '../lib/hash';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';

export class UsersService {
    // Fetches the current user's profile information based on their user ID.
    static async me(userId: number) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError('USER_NOT_FOUND', 'User not found', 404);
        }
        return user;
    }

    // Verify password to update profile information
    static async verifyPassword(userId: number, password: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError('USER_NOT_FOUND', 'User not found', 404);
        }
        const isPasswordValid = await Hash.verify(user.passwordHash, password);
        return isPasswordValid;
    }

    // Updates the current user's profile information (username and bio) based on their user ID.
    static async updateProfile(userId: number, password: string, profileData: { username?: string; bio?: string }) {

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError('USER_NOT_FOUND', 'User not found', 404);
        }

        const isPasswordValid = await this.verifyPassword(userId, password);
        if (!isPasswordValid) {
            throw new AppError('INVALID_CREDENTIALS', 'Invalid password', 401);
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username: profileData.username ?? user.username,
                bio: profileData.bio ?? user.bio,
            },
        });
        return { username: updatedUser.username, avatarUrl: updatedUser.avatarUrl, bio: updatedUser.bio };
    }

    // Finds a user by their ID and returns their profile information.
    static async findUserById(userId: number) {
        try {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            return user;
        } catch (error) {
            console.error('Error finding user by id:', error);
            throw new AppError('USER_NOT_FOUND', 'User not found', 404);
        }
    }

    // Finds a user by their email and returns their profile information.
    static async findUserByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            return user;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new AppError('USER_NOT_FOUND', 'User not found', 404);
        }
    }

    // Updates the current user's avatar URL based on their user ID.
    static async updateAvatar(userId: number, avatarUrl: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError('USER_NOT_FOUND', 'User not found', 404);
        }
        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    avatarUrl,
                },
            });
        } catch (error) {
            console.error('Error updating user avatar:', error);
            throw new AppError('INTERNAL_SERVER_ERROR', 'Failed to update avatar', 500);
        }
    }

    // Deletes the current user's avatar URL based on their user ID.
    static async deleteAvatar(userId: number) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError('USER_NOT_FOUND', 'User not found', 404);
        }
        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    avatarUrl: null,
                },
            });
        } catch (error) {
            console.error('Error deleting user avatar:', error);
            throw new AppError('INTERNAL_SERVER_ERROR', 'Failed to delete avatar', 500);
        }
    }

    // Updates the current user's email based on their user ID.
    static async updateEmail(userId: number, password: string, newEmail: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError('USER_NOT_FOUND', 'User not found', 404);
        }
        
        const isPasswordValid = await this.verifyPassword(userId, password);
        if (!isPasswordValid) {
            throw new AppError('INVALID_CREDENTIALS', 'Invalid password', 401);
        }

        try {
            const existingUser = await this.findUserByEmail(newEmail);
            if (existingUser && existingUser.id !== userId) {
                throw new AppError('EMAIL_ALREADY_IN_USE', 'Email is already in use', 409);
            }
            await prisma.user.update({
                where: { id: userId },
                data: {
                    email: newEmail,
                },
            });
        } catch (error) {
            console.error('Error updating user email:', error);
            if (error instanceof AppError) throw error;
            throw new AppError('INTERNAL_SERVER_ERROR', 'Failed to update email', 500);
        }
    }
}
