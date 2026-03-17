import { Request, Response } from 'express';

import AuthService from '../services/auth.service';
import { AuthErrorMessage } from '../errors/authErrors';
import { EmailService } from '../services/email.service';
import { TokenService } from '../services/token.service';
import { OTPService } from '../services/otp.service';

export async function RegisterUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
        const newUser = await AuthService.create(username, email, password);
        
        // Generate email verification token and send verification email
        const rawToken = await TokenService.generate(newUser.id, "EMAIL_VERIFICATION", 60); // Generate token with 1 hour expiration
        await EmailService.sendWelcomEmail(email, rawToken).catch(console.error);

        res.cookie("refreshToken", newUser.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        res.cookie("accessToken", newUser.accessToken, {
            httpOnly: false, // We need access token to be accessible by client-side JavaScript to include in Authorization header for API requests
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
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
        const { accessToken, refreshToken} = await AuthService.login(email, password);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: false, // I need access token to be accessible by client-side JavaScript to include in Authorization header for API requests
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // Currently set for 7 days for testing, but in production it should be much shorter like 15 minutes
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
        const user = await AuthService.me(userId);
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
        const { accessToken } = await AuthService.refreshAccessToken(refreshToken); // Verify the refresh token and generate new access token (and optionally a new refresh token)
        
        res.cookie("accessToken", accessToken, {
            httpOnly: false, // We need access token to be accessible by client-side JavaScript to include in Authorization header for API requests
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.status(200).json({ data: accessToken });
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
        await AuthService.logout(refreshToken); // FIX: currently this function doesn't do anything, but you can implement token revocation logic here if needed
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");

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
        await AuthService.deleteUser(userId);
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
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
        await AuthService.changePassword(userId, currentPassword, newPassword);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }  
}

export async function VerifyEmail(req: Request, res: Response) {
    const { token } = req.query;

    if (typeof token !== "string") {
        return res.status(400).json({ error: "Token is required" });
    }

    // Verify the token in header is valid and get the associated user ID
    const tokenRecord = await TokenService.verifyToken("EMAIL_VERIFICATION", token);

    if (!tokenRecord) {
        return res.status(400).json({ error: "Invalid or expired token" });
    }

    try {
        await AuthService.changeUserVerificationStatus(tokenRecord.userId, true); // Update user's verification status to true
        await TokenService.markTokenUsed(tokenRecord.id); // Mark the token as used so it can't be used again


        res.cookie("emailVerified", "true", { // This cookie is just used to show the success message on the frontend after redirect, it will be cleared immediately after the frontend reads it
            httpOnly: true,
            maxAge: 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.redirect(`http://localhost:3000/verify-email?status=success`);
    } catch (error) {
        res.status(400).json({ error: "Invalid or expired token" });
        res.redirect(`http://localhost:3000/verify-email?status=error`);
    }
}

export async function VerifyRedirectCookie(req: Request, res: Response) {
    const cookie = req.cookies.emailVerified;

    if (cookie) {
        res.clearCookie("emailVerified"); // optional: consume once
        return res.sendStatus(200);
    }
    res.sendStatus(401); // no cookie, invalid access
}

export async function SendVerificationEmail(req: Request, res: Response) {
    const { userId, email } = req.user || {};

    if (!userId || !email) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user is already verified if so, no need to resend verification email
    if (await AuthService.isUserVerified(userId)) {
        return res.status(400).json({ error: "Email is already verified" });
    }

    try {
        const rawToken = await TokenService.generate(userId, "EMAIL_VERIFICATION", 60); // Generate token with 1 hour expiration
        await EmailService.sendVerificationEmail(email!, rawToken).catch(console.error);

        res.status(200).json({ message: "Verification email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send verification email" });
    }

}

export async function RequestPasswordReset(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {

        const user = await AuthService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: "User with this email does not exist" });
        }

        const rawToken = await TokenService.generate(user.id, "PASSWORD_RESET", 15);
        await EmailService.sendPasswordResetEmail(email, rawToken).catch(console.error);
        
        res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send password reset email" });
    }
}

// FUTURE: This endpoint is not used in the current flow because we only verify the password reset token when the submit the form to reset password, but we could use this endpoint when we want to verify the token first before showing the reset password form to the user *** FIXED ***
export async function VerifyResetToken(req: Request, res: Response) {
    const token = req.query.token;
    if (typeof token !== "string") {
        return res.status(400).json({ error: "Token is required" });
    }

    try {
        await TokenService.verifyToken("PASSWORD_RESET", token); // just fetch, don't delete/use
        res.status(200).json({ message: "Token valid, show reset form" });

    } catch (error) {
        res.status(400).json({ error: "Invalid or expired token" });
    }
}

export async function ResetPassword(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const token = req.query.token;
    const { newPassword } = req.body;

    if (typeof token !== "string") {
        return res.status(400).json({ error: "Token is required" });
    }

    if (!newPassword) {
        return res.status(400).json({ error: "New password is required" });
    }
    
    try {
        const tokenRecord = await TokenService.verifyToken("PASSWORD_RESET", token);
        if (!tokenRecord) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        await AuthService.changePassword(tokenRecord.userId, "", newPassword, true); // We can pass empty string for current password since we already verified the token
        await TokenService.markTokenUsed(tokenRecord.id); // Mark the token as used so it can't be used again
        
        if (refreshToken) {
            await AuthService.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
        }

        res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        res.status(500).json({ error: "Failed to reset password" });
    }   
}

export async function RequestPhoneOTP(req: Request, res: Response) {
    const { phone } = req.body;
    
    if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    try {
        await OTPService.sendOTP(phone);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP" });
    }
}

export async function VerifyPhoneOTP(req: Request, res: Response) {
    const { phone, code } = req.body;

    if (!phone || !code) {
        return res.status(400).json({ error: "Phone and code are required" });
    }

    try {
        const status = await OTPService.verifyOTP(phone, code);
        if (status === "approved") {
            res.status(200).json({ message: "Phone number verified successfully" });
        } else {
            res.status(400).json({ error: "Invalid OTP code" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to verify OTP" });
    }
}




