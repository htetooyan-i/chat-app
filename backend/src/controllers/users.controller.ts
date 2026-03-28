import { Request, Response } from 'express';

import AuthService from '../services/auth.service';
import ServerMemberService from '../services/serverMember.service';
import NotificationService from '../services/notification.service';
import { UsersService } from '../services/users.service';
import { TokenService } from '../services/token.service';
import { EmailService } from '../services/email.service';
import { io } from '../server';
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';

export async function GetCurrentUser(req: Request, res: Response) {
    const userId = req.user?.userId;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }
    try {
        const user = await UsersService.me(userId);
        return sendSuccess(res, 200, 'User fetched successfully', user);
    } catch (error) {
        console.error('Error fetching current user:', error);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Internal server error', 500);
    }
}

export async function GetMyNotifications(req: Request, res: Response) {
    const userId = req.user?.userId;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        const notifications = await NotificationService.getForUser(userId);
        return sendSuccess(res, 200, 'Notifications fetched successfully', notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Internal server error', 500);
    }
}

export async function MarkMyNotificationAsRead(req: Request, res: Response) {
    const userId = req.user?.userId;
    const notificationId = Number(req.params.notificationId);

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    if (isNaN(notificationId)) {
        return sendError(res, 400, 'INVALID_NOTIFICATION_ID', 'Notification ID must be a valid number');
    }

    try {
        const updatedNotification = await NotificationService.markAsRead(notificationId, userId);

        if (!updatedNotification) {
            return sendError(res, 404, 'NOTIFICATION_NOT_FOUND', 'Notification not found');
        }

        return sendSuccess(res, 200, 'Notification marked as read', updatedNotification);
    } catch (error) {
        console.error('Error updating notification read status:', error);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Internal server error', 500);
    }
}

export async function MarkAllMyNotificationsAsRead(req: Request, res: Response) {
    const userId = req.user?.userId;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        const updatedCount = await NotificationService.markAllAsReadForUser(userId);
        return sendSuccess(res, 200, 'All notifications marked as read', { updatedCount });
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Internal server error', 500);
    }
}

export async function UpdateCurrentUser(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { username, bio, password } = req.body;
    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
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
        return sendSuccess(res, 200, 'User profile updated successfully', updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Internal server error', 500);
    }
}

export async function UpdateEmail(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { newEmail, password } = req.body;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        await UsersService.updateEmail(userId, password, newEmail);

        // Generate email verification token and send verification email
        const rawToken = await TokenService.generate(userId, "EMAIL_VERIFICATION", 60); // Generate token with 1 hour expiration
        await EmailService.sendVerificationEmail(newEmail, rawToken).catch(console.error);

        await AuthService.changeUserVerificationStatus(userId, false); // Set user's verification status to false after email change
            
        return sendSuccess(res, 200, 'Email updated successfully', null);
    } catch (error: unknown) {
        console.error("Error updating user email:", error);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Internal server error', 500);
    }
}

export async function FindUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id as string, 10);

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }
    
    try {
        const user = await UsersService.findUserById(userId);
        if (!user) {
            return sendError(res, 404, 'USER_NOT_FOUND', 'User not found');
        } else {
            return sendSuccess(res, 200, 'User found', user);
        }
    } catch (error) {
        console.error('Error finding user by ID:', error);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Internal server error', 500);
    }
}

export async function UpdateAvatar(req: Request, res: Response) {
    const userId = req.user?.userId;
    const { avatarUrl } = req.body;

    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        await UsersService.updateAvatar(userId, avatarUrl);
        const servers = await ServerMemberService.getCurrentUserServers(userId);

        servers.forEach((server) => {
            io.to(`server-${server.id}`).emit('receivedUpdatedMember',  {
                userId: userId,
                avatarUrl: avatarUrl
            });
        })
        return sendSuccess(res, 200, 'Avatar updated successfully', null);
    } catch (error) {
        console.error('Error updating user avatar:', error);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Internal server error', 500);
    }
}

export async function DeleteAvatar(req: Request, res: Response) {
    const userId = req.user?.userId;
    
    if (!userId) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    try {
        await UsersService.deleteAvatar(userId);
        return sendSuccess(res, 200, 'Avatar deleted successfully', null);
    } catch (error) {
        console.error('Error deleting user avatar:', error);
        return sendErrorFromUnknown(res, error, 'INTERNAL_SERVER_ERROR', 'Internal server error', 500);
    }
}




