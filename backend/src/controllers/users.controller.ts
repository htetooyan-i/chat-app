import { UsersService } from '../services/users.service';
import { Request, Response } from 'express';

export async function GetCurrentUser(req: Request, res: Response) {
    const userId = req.user?.userId;

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const user = await UsersService.me(userId);
        res.status(200).json({data: user});
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function UpdateCurrentUser(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { username, bio } = req.body;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
    }   

    try {
        const updatedUser = await UsersService.updateProfile(userId, { username, bio });
        res.status(200).json({data: updatedUser});
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
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
        res.status(401).json({ message: 'Unauthorized' });
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
        res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await UsersService.deleteAvatar(userId);
        res.status(200).json({ message: 'Avatar deleted successfully' });
    } catch (error) {
        console.error('Error deleting user avatar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




