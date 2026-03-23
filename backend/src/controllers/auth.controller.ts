import { Request, Response } from 'express';

import AuthService from '../services/auth.service';
import { AuthErrorMessage } from '../errors/authErrors';
import { EmailService } from '../services/email.service';
import { TokenService } from '../services/token.service';
import { OTPService } from '../services/otp.service';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
    domain: process.env.NODE_ENV === "production" ? ".konyat.chat" : undefined,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const accessTokenOptions = {
    ...cookieOptions,
    httpOnly: false, // needs to be accessible by client-side JS
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 minutes
};

export async function RegisterUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
        const newUser = await AuthService.create(username, email, password);
        
        // Generate email verification token and send verification email
        const rawToken = await TokenService.generate(newUser.id, "EMAIL_VERIFICATION", 60); // Generate token with 1 hour expiration
        await EmailService.sendWelcomEmail(email, rawToken).catch(console.error);

        res.cookie("refreshToken", newUser.refreshToken, cookieOptions);
        res.cookie("accessToken", newUser.accessToken, accessTokenOptions);

        res.status(200).json({
            success: true,
            data: null,
            message: "User registered successfully",
            error: null
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: "User registration failed",
            error: {
                code: (error as Error).message,
                detail: AuthErrorMessage[(error as Error).message as keyof typeof AuthErrorMessage]
            }
        });
    }
}

export async function LoginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const { accessToken, refreshToken} = await AuthService.login(email, password);

        res.cookie("refreshToken", refreshToken, cookieOptions);
        res.cookie("accessToken", accessToken, accessTokenOptions);

        console.log('cookies set: ', res.getHeader('Set-Cookie')); // Debugging line to check cookies in response header

        res.status(200).json({
            success: true,
            data: null,
            message: "Login successful",
            error: null
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Login failed",
            error: {
                code: (error as Error).message,
                detail: AuthErrorMessage[(error as Error).message as keyof typeof AuthErrorMessage]
            }
        });
    }   
}

export async function GetCurrentUser(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            data: null,
            message: "Unauthorized",
            error: {
                code: "UNAUTHORIZED",
                detail: "Unauthorized"
            }
        });
    }

    try {
        const user = await AuthService.me(userId);
        res.status(200).json({
            success: true,
            data: user,
            message: "User fetched successfully",
            error: null
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            data: null,
            message: "User not found",
            error: {
                code: "USER_NOT_FOUND",
                detail: "User not found"
            }
        });
    }
}

export async function RefreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Refresh token is required",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    try {
        const { accessToken } = await AuthService.refreshAccessToken(refreshToken); // Verify the refresh token and generate new access token (and optionally a new refresh token)
        
        res.cookie("accessToken", accessToken, accessTokenOptions); // Set the new access token in cookie

        res.status(200).json({
            success: true,
            data: accessToken,
            message: "Access token refreshed successfully",
            error: null
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            data: null,
            message: "Invalid refresh token",
            error: {
                code: (error as Error).message,
                detail: AuthErrorMessage[(error as Error).message as keyof typeof AuthErrorMessage]
            }
        });
    }
}

export async function LogoutUser(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Refresh token is required",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    try {
        await AuthService.logout(refreshToken); // FIX: currently this function doesn't do anything, but you can implement token revocation logic here if needed
        
        res.clearCookie("refreshToken", cookieOptions);
        res.clearCookie("accessToken", accessTokenOptions);

        res.status(200).json({
            success: true,
            data: null,
            message: "Logout successful",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Logout failed",
            error: {
                code: (error as Error).message,
                detail: AuthErrorMessage[(error as Error).message as keyof typeof AuthErrorMessage]
            }
        });
    }

}

export async function DeleteUser(req: Request, res: Response) {

    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            data: null,
            message: "Unauthorized",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    try {
        await AuthService.deleteUser(userId);

        res.clearCookie("refreshToken", cookieOptions);
        res.clearCookie("accessToken", accessTokenOptions);

        res.status(200).json({
            success: true,
            data: null,
            message: "User deleted successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to delete user",
            error: {
                code: (error as Error).message,
                detail: AuthErrorMessage[(error as Error).message as keyof typeof AuthErrorMessage]
            }
        });
    }


}

export async function ChangePassword(req: Request, res: Response) {
    
    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            data: null,
            message: "Unauthorized",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    const { currentPassword, newPassword } = req.body;

    try {
        await AuthService.changePassword(userId, currentPassword, newPassword);
        res.status(200).json({
            success: true,
            data: null,
            message: "Password changed successfully",
            error: null
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Failed to change password",
            error: {
                code: (error as Error).message,
                detail: AuthErrorMessage[(error as Error).message as keyof typeof AuthErrorMessage]
            }
        });
    }  
}

export async function VerifyEmail(req: Request, res: Response) {
    const { token } = req.query;

    if (typeof token !== "string") {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Token is required",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    // Verify the token in header is valid and get the associated user ID
    const tokenRecord = await TokenService.verifyToken("EMAIL_VERIFICATION", token);

    if (!tokenRecord) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Invalid or expired token",
            error: {
                code: AuthErrorMessage.INVALID_TOKEN,
                detail: AuthErrorMessage.INVALID_TOKEN
            }
        });
    }

    try {
        await AuthService.changeUserVerificationStatus(tokenRecord.userId, true); // Update user's verification status to true
        await TokenService.markTokenUsed(tokenRecord.id); // Mark the token as used so it can't be used again

        res.cookie("emailVerified", "true", { 
            httpOnly: true,
            maxAge: 60 * 1000,
            secure: process.env.NODE_ENV === "production",

            sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
            domain: process.env.NODE_ENV === "production" ? ".konyat.chat" : undefined,
        });// This cookie is just used to show the success message on the frontend after redirect, it will be cleared immediately after the frontend reads it

        res.redirect(`${process.env.FRONTEND_URL}/verify-email?status=success`);
    } catch (error) {
        res.redirect(`${process.env.FRONTEND_URL}/verify-email?status=error`);
    }
}

export async function VerifyRedirectCookie(req: Request, res: Response) {

  const cookieValue = req.cookies?.emailVerified;

  if (cookieValue) {

    res.clearCookie("emailVerified", { // consume once read
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
        domain: process.env.NODE_ENV === "production" ? ".konyat.chat" : undefined,
    });

    return res.sendStatus(200);   // OK
  }

  return res.sendStatus(401);     // cookie missing, unauthorized
}

export async function SendVerificationEmail(req: Request, res: Response) {
    const { userId, email } = req.user || {};

    if (!userId || !email) {
        return res.status(401).json({
            success: false,
            data: null,
            message: "Unauthorized",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    // Check if user is already verified if so, no need to resend verification email
    if (await AuthService.isUserVerified(userId)) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Email is already verified",
            error: {
                code: AuthErrorMessage.EMAIL_ALREADY_VERIFIED,
                detail: AuthErrorMessage.EMAIL_ALREADY_VERIFIED
            }
        });
    }

    try {
        const rawToken = await TokenService.generate(userId, "EMAIL_VERIFICATION", 60); // Generate token with 1 hour expiration
        await EmailService.sendVerificationEmail(email!, rawToken).catch(console.error);

        res.status(200).json({
            success: true,
            data: null,
            message: "Verification email sent successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to send verification email",
            error: {
                code: AuthErrorMessage.INTERNAL_SERVER_ERROR,
                detail: AuthErrorMessage.INTERNAL_SERVER_ERROR
            }
        });
    }

}

export async function RequestPasswordReset(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Email is required",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    try {

        const user = await AuthService.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "User with this email does not exist",
                error: {
                    code: AuthErrorMessage.USER_NOT_FOUND,
                    detail: AuthErrorMessage.USER_NOT_FOUND
                }
            });
        }

        const rawToken = await TokenService.generate(user.id, "PASSWORD_RESET", 15);
        await EmailService.sendPasswordResetEmail(email, rawToken).catch(console.error);
        
        res.status(200).json({
            success: true,
            data: null,
            message: "Password reset email sent successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to send password reset email",
            error: {
                code: AuthErrorMessage.INTERNAL_SERVER_ERROR,
                detail: AuthErrorMessage.INTERNAL_SERVER_ERROR
            }
        });
    }
}

// FUTURE: This endpoint is not used in the current flow because we only verify the password reset token when the submit the form to reset password, but we could use this endpoint when we want to verify the token first before showing the reset password form to the user *** FIXED ***
export async function VerifyResetToken(req: Request, res: Response) {
    const token = req.query.token;
    if (typeof token !== "string") {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Token is required",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    try {
        const tokenRecord = await TokenService.verifyToken("PASSWORD_RESET", token, false); // just fetch, don't delete/use
        if (!tokenRecord) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Invalid or expired token",
                error: {
                    code: AuthErrorMessage.INVALID_TOKEN,
                    detail: AuthErrorMessage.INVALID_TOKEN
                }
            });
        }
        res.status(200).json({
            success: true,
            data: null,
            message: "Token is valid",
            error: null
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Invalid or expired token",
            error: {
                code: AuthErrorMessage.INVALID_TOKEN,
                detail: AuthErrorMessage.INVALID_TOKEN
            }
        });
    }
}

export async function ResetPassword(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const token = req.query.token;
    const { newPassword } = req.body;

    if (typeof token !== "string") {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Token is required",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    if (!newPassword) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "New password is required",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }
    
    try {
        const tokenRecord = await TokenService.verifyToken("PASSWORD_RESET", token, false);
        if (!tokenRecord) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Invalid or expired token",
                error: {
                    code: AuthErrorMessage.INVALID_TOKEN,
                    detail: AuthErrorMessage.INVALID_TOKEN
                }
            });
        }

        await AuthService.changePassword(tokenRecord.userId, "", newPassword, true); // We can pass empty string for current password since we already verified the token
        await TokenService.markTokenUsed(tokenRecord.id); // Mark the token as used so it can't be used again
        
        if (refreshToken) {
            await AuthService.logout(refreshToken);

            res.clearCookie("refreshToken", cookieOptions);
            res.clearCookie("accessToken", accessTokenOptions);

        }

        res.cookie("passwordReset", "true", { // This cookie is just used to show the success message on the frontend after redirect, it will be cleared immediately after the frontend reads it
            httpOnly: true,
            maxAge: 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            domain: process.env.NODE_ENV === "production" ? ".konyat.chat" : undefined,
            sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
        });

        res.status(200).json({
            success: true,
            data: null,
            message: "Password reset successfully",
            error: null
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to reset password",
            error: {
                code: AuthErrorMessage.INTERNAL_SERVER_ERROR,
                detail: AuthErrorMessage.INTERNAL_SERVER_ERROR
            }
        });
    }   
}

export async function RequestPhoneOTP(req: Request, res: Response) {
    const { phone } = req.body;
    
    if (!phone) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Phone number is required",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    try {
        await OTPService.sendOTP(phone);
        res.status(200).json({
            success: true,
            data: null,
            message: "OTP sent successfully",
            error: null
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to send OTP",
            error: {
                code: AuthErrorMessage.INTERNAL_SERVER_ERROR,
                detail: AuthErrorMessage.INTERNAL_SERVER_ERROR
            }
        });
    }
}

export async function VerifyPhoneOTP(req: Request, res: Response) {
    const { phone, code } = req.body;

    if (!phone || !code) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "Phone and code are required",
            error: {
                code: AuthErrorMessage.MISSING_PARAMETERS,
                detail: AuthErrorMessage.MISSING_PARAMETERS
            }
        });
    }

    try {
        const status = await OTPService.verifyOTP(phone, code);
        if (status === "approved") {
            res.status(200).json({
                success: true,
                data: null,
                message: "Phone number verified successfully",
                error: null
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                message: "Invalid OTP code",
                error: {
                    code: AuthErrorMessage.INVALID_OTP,
                    detail: AuthErrorMessage.INVALID_OTP
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: "Failed to verify OTP",
            error: {
                code: AuthErrorMessage.INTERNAL_SERVER_ERROR,
                detail: AuthErrorMessage.INTERNAL_SERVER_ERROR
            }
        });
    }
}




