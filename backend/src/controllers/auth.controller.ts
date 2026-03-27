import { Request, Response } from 'express';

import AuthService from '../services/auth.service';
import { AuthErrorCode, AuthErrorMessage } from '../errors/authErrors';
import { sendError, sendErrorFromUnknown, sendSuccess } from '../errors/apiResponse';
import { EmailService } from '../services/email.service';
import { TokenService } from '../services/token.service';
import { OTPService } from '../services/otp.service';
import { parseDurationMs } from '../lib/duration';

const refreshTokenMaxAgeMs = parseDurationMs(process.env.REFRESH_TOKEN_EXPIRES, 30, "d");
const accessTokenMaxAgeMs = parseDurationMs(process.env.ACCESS_TOKEN_EXPIRES, 15, "m");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
  domain: process.env.NODE_ENV === "production" ? ".konyat.chat" : undefined,
    maxAge: refreshTokenMaxAgeMs,
};

const accessTokenOptions = {
  ...cookieOptions,
  httpOnly: false,
    maxAge: accessTokenMaxAgeMs,
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

        return sendSuccess(res, 200, "User registered successfully", null);
    } catch (error) {
        console.error("RegisterUser error:", error);
        return sendErrorFromUnknown(res, error, AuthErrorCode.INTERNAL_SERVER_ERROR, "User registration failed", 500);
    }
}

export async function LoginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const { accessToken, refreshToken} = await AuthService.login(email, password);

        res.cookie("refreshToken", refreshToken, cookieOptions);
        res.cookie("accessToken", accessToken, accessTokenOptions);

        console.log('cookies set: ', res.getHeader('Set-Cookie')); // Debugging line to check cookies in response header

        return sendSuccess(res, 200, "Login successful", null);

    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INVALID_CREDENTIALS, "Login failed", 400);
    }   
}

export async function GetCurrentUser(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
        return sendError(res, 401, AuthErrorCode.MISSING_PARAMETERS, "Unauthorized");
    }

    try {
        const user = await AuthService.me(userId);
        return sendSuccess(res, 200, "User fetched successfully", user);
    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.USER_NOT_FOUND, "User not found", 404);
    }
}

export async function RefreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return sendError(res, 400, AuthErrorCode.MISSING_PARAMETERS, AuthErrorMessage.MISSING_PARAMETERS);
    }

    try {
        const { accessToken } = await AuthService.refreshAccessToken(refreshToken); // Verify the refresh token and generate new access token (and optionally a new refresh token)
        
        res.cookie("accessToken", accessToken, accessTokenOptions); // Set the new access token in cookie

        return sendSuccess(res, 200, "Access token refreshed successfully", accessToken);
    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INVALID_TOKEN, "Invalid refresh token", 401);
    }
}

export async function LogoutUser(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return sendError(res, 400, AuthErrorCode.MISSING_PARAMETERS, AuthErrorMessage.MISSING_PARAMETERS);
    }

    try {
        await AuthService.logout(refreshToken); // FIX: currently this function doesn't do anything, but you can implement token revocation logic here if needed
        
        res.clearCookie("refreshToken", cookieOptions);
        res.clearCookie("accessToken", accessTokenOptions);

        return sendSuccess(res, 200, "Logout successful", null);
    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INTERNAL_SERVER_ERROR, "Logout failed", 500);
    }

}

export async function DeleteUser(req: Request, res: Response) {

    const userId = req.user?.userId;
    if (!userId) {
        return sendError(res, 401, AuthErrorCode.MISSING_PARAMETERS, "Unauthorized");
    }

    try {
        await AuthService.deleteUser(userId);

        res.clearCookie("refreshToken", cookieOptions);
        res.clearCookie("accessToken", accessTokenOptions);

        return sendSuccess(res, 200, "User deleted successfully", null);
    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INTERNAL_SERVER_ERROR, "Failed to delete user", 500);
    }


}

export async function ChangePassword(req: Request, res: Response) {
    
    const userId = req.user?.userId;

    if (!userId) {
        return sendError(res, 401, AuthErrorCode.MISSING_PARAMETERS, "Unauthorized");
    }

    const { currentPassword, newPassword } = req.body;

    try {
        await AuthService.changePassword(userId, currentPassword, newPassword);
        return sendSuccess(res, 200, "Password changed successfully", null);
    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INTERNAL_SERVER_ERROR, "Failed to change password", 400);
    }  
}

export async function VerifyEmail(req: Request, res: Response) {
    const { token } = req.query;

    if (typeof token !== "string") {
        return sendError(res, 400, AuthErrorCode.MISSING_PARAMETERS, "Token is required");
    }

    // Verify the token in header is valid and get the associated user ID
    const tokenRecord = await TokenService.verifyToken("EMAIL_VERIFICATION", token);

    if (!tokenRecord) {
        return sendError(res, 400, AuthErrorCode.INVALID_TOKEN, AuthErrorMessage.INVALID_TOKEN);
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
        return sendError(res, 401, AuthErrorCode.MISSING_PARAMETERS, "Unauthorized");
    }

    // Check if user is already verified if so, no need to resend verification email
    if (await AuthService.isUserVerified(userId)) {
        return sendError(res, 400, AuthErrorCode.EMAIL_ALREADY_VERIFIED, AuthErrorMessage.EMAIL_ALREADY_VERIFIED);
    }

    try {
        const rawToken = await TokenService.generate(userId, "EMAIL_VERIFICATION", 60); // Generate token with 1 hour expiration
        await EmailService.sendVerificationEmail(email!, rawToken).catch(console.error);

        return sendSuccess(res, 200, "Verification email sent successfully", null);
    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INTERNAL_SERVER_ERROR, "Failed to send verification email", 500);
    }

}

export async function RequestPasswordReset(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
        return sendError(res, 400, AuthErrorCode.MISSING_PARAMETERS, "Email is required");
    }

    try {

        const user = await AuthService.getUserByEmail(email);
        if (!user) {
            return sendError(res, 400, AuthErrorCode.USER_NOT_FOUND, "User with this email does not exist");
        }

        const rawToken = await TokenService.generate(user.id, "PASSWORD_RESET", 15);
        await EmailService.sendPasswordResetEmail(email, rawToken).catch(console.error);
        
        return sendSuccess(res, 200, "Password reset email sent successfully", null);
    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INTERNAL_SERVER_ERROR, "Failed to send password reset email", 500);
    }
}

// FUTURE: This endpoint is not used in the current flow because we only verify the password reset token when the submit the form to reset password, but we could use this endpoint when we want to verify the token first before showing the reset password form to the user *** FIXED ***
export async function VerifyResetToken(req: Request, res: Response) {
    const token = req.query.token;
    if (typeof token !== "string") {
        return sendError(res, 400, AuthErrorCode.MISSING_PARAMETERS, "Token is required");
    }

    try {
        const tokenRecord = await TokenService.verifyToken("PASSWORD_RESET", token, false); // just fetch, don't delete/use
        if (!tokenRecord) {
            return sendError(res, 400, AuthErrorCode.INVALID_TOKEN, AuthErrorMessage.INVALID_TOKEN);
        }
        return sendSuccess(res, 200, "Token is valid", null);

    } catch (error) {
        return sendError(res, 400, AuthErrorCode.INVALID_TOKEN, AuthErrorMessage.INVALID_TOKEN);
    }
}

export async function ResetPassword(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const token = req.query.token;
    const { newPassword } = req.body;

    if (typeof token !== "string") {
        return sendError(res, 400, AuthErrorCode.MISSING_PARAMETERS, "Token is required");
    }

    if (!newPassword) {
        return sendError(res, 400, AuthErrorCode.MISSING_PARAMETERS, "New password is required");
    }
    
    try {
        const tokenRecord = await TokenService.verifyToken("PASSWORD_RESET", token, false);
        if (!tokenRecord) {
            return sendError(res, 400, AuthErrorCode.INVALID_TOKEN, AuthErrorMessage.INVALID_TOKEN);
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

        return sendSuccess(res, 200, "Password reset successfully", null);

    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INTERNAL_SERVER_ERROR, "Failed to reset password", 500);
    }   
}

export async function RequestPhoneOTP(req: Request, res: Response) {
    const { phone } = req.body;
    
    if (!phone) {
        return sendError(res, 400, AuthErrorCode.MISSING_PARAMETERS, "Phone number is required");
    }

    try {
        await OTPService.sendOTP(phone);
        return sendSuccess(res, 200, "OTP sent successfully", null);
    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INTERNAL_SERVER_ERROR, "Failed to send OTP", 500);
    }
}

export async function VerifyPhoneOTP(req: Request, res: Response) {
    const { phone, code } = req.body;

    if (!phone || !code) {
        return sendError(res, 400, AuthErrorCode.MISSING_PARAMETERS, "Phone and code are required");
    }

    try {
        const status = await OTPService.verifyOTP(phone, code);
        if (status === "approved") {
            return sendSuccess(res, 200, "Phone number verified successfully", null);
        } else {
            return sendError(res, 400, AuthErrorCode.INVALID_OTP, AuthErrorMessage.INVALID_OTP);
        }
    } catch (error) {
        return sendErrorFromUnknown(res, error, AuthErrorCode.INTERNAL_SERVER_ERROR, "Failed to verify OTP", 500);
    }
}




