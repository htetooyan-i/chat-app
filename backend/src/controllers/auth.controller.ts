import { Request, Response } from 'express';

import { create, login, me, refreshAccessToken, logout, deleteUser, changePassword } from '../services/auth.service';
import { AuthErrorMessage } from '../errors/authErrors';

export async function RegisterUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
        const newUser = await create(username, email, password);
        res.cookie("refreshToken", newUser.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            message: "Register successful",
            data: {
                accessToken: newUser.accessToken
            }
        });
    } catch (error) {
        res.status(400).json({ error:  AuthErrorMessage[(error as Error).message as keyof typeof AuthErrorMessage] });
    }
}

export async function LoginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const { accessToken, refreshToken} = await login(email, password);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            message: "Login successful",
            data: {
                accessToken: accessToken
            }
        });

    } catch (error) {
        res.status(400).json({ error: AuthErrorMessage[(error as Error).message as keyof typeof AuthErrorMessage] });
    }   
}

export async function GetCurrentUser(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const user = await me(userId);
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(404).json({ error: AuthErrorMessage[(error as Error).message as keyof typeof AuthErrorMessage] });
    }
}

export async function RefreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token is required" });
    }

    try {
        const tokens = await refreshAccessToken(refreshToken);
        res.status(200).json({ data: tokens });
    } catch (error) {
        res.status(401).json({ error: "Invalid refresh token" });
    }
}

export async function LogoutUser(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token is required" });
    }

    try {
        await logout(refreshToken); // FIX: currently this function doesn't do anything, but you can implement token revocation logic here if needed
        res.clearCookie("refreshToken");

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: "Logout failed" });
    }

}

export async function DeleteUser(req: Request, res: Response) {

    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        await deleteUser(userId);
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }


}

export async function ChangePassword(req: Request, res: Response) {
    
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { currentPassword, newPassword } = req.body;

    try {
        await changePassword(userId, currentPassword, newPassword);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }  
}