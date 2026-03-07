import { Request, Response } from 'express';

import AuthService from '../services/auth.service';
import ServerMemberService from '../services/serverMember.service';
import { UsersService } from '../services/users.service';
import { TokenService } from '../services/token.service';
import { EmailService } from '../services/email.service';
import { io } from '../server';

export async function GetCurrentUser(req: Request, res: Response) {
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const user = await UsersService.me(userId);
        return res.status(200).json({data: user});
    } catch (error) {
        console.error('Error fetching current user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function UpdateCurrentUser(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { username, bio, password } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }   

    try {
        const updatedUser = await UsersService.updateProfile(userId, password, { username, bio });
        const servers = await ServerMemberService.getCurrentUserServers(userId);

        servers.forEach((server) => {
            io.to(`server-${server.id}`).emit('receivedUpdatedMember',  {
                userId: userId,
                username: updatedUser.username,
                bio: updatedUser.bio
            });
        })
        res.status(200).json({data: updatedUser});
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function UpdateEmail(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { newEmail, password } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await UsersService.updateEmail(userId, password, newEmail);

        // Generate email verification token and send verification email
        const rawToken = await TokenService.generate(userId, "EMAIL_VERIFICATION", 60); // Generate token with 1 hour expiration
        await EmailService.sendVerificationEmail(newEmail, rawToken).catch(console.error);

        await AuthService.changeUserVerificationStatus(userId, false); // Set user's verification status to false after email change
            
        res.status(200).json({ message: 'Email updated successfully' });
    } catch (error: unknown) {
        console.error("Error updating user email:", error);

        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function FindUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id as string, 10);

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        const user = await UsersService.findUserById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({data: user});
        }
    } catch (error) {
        console.error('Error finding user by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function UpdateAvatar(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { avatarUrl } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await UsersService.updateAvatar(userId, avatarUrl);
        res.status(200).json({ message: 'Avatar updated successfully' });
    } catch (error) {
        console.error('Error updating user avatar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function DeleteAvatar(req: Request, res: Response) {
    const userId = req.user?.userId;
    
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await UsersService.deleteAvatar(userId);
        res.status(200).json({ message: 'Avatar deleted successfully' });
    } catch (error) {
        console.error('Error deleting user avatar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




