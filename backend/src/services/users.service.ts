import { prisma } from '../lib/prisma';

export class UsersService {
    // Fetches the current user's profile information based on their user ID.
    static async me(userId: number) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        return { username: user.username, avatarUrl: user.avatarUrl, bio: user.bio };
    }

    // Updates the current user's profile information (username and bio) based on their user ID.
    static async updateProfile(userId: number, profileData: { username?: string; bio?: string }) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
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
            console.error('Error finding user by email:', error);
            throw new Error('User not found');
        }
    }

    // Updates the current user's avatar URL based on their user ID.
    static async updateAvatar(userId: number, avatarUrl: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
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
            throw new Error('Failed to update avatar');
        }
    }

    // Deletes the current user's avatar URL based on their user ID.
    static async deleteAvatar(userId: number) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
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
            throw new Error('Failed to delete avatar');
        }
    }
}
