import { prisma } from '../lib/prisma';
import { AuthErrorCode } from '../errors/authErrors';
import { hashPassword, verifyPassword } from '../lib/password';
import { createAccessToken, createRefreshToken, verifyToken } from '../lib/jwt';

// CREATE USER
export async function create (username: string, email: string, password: string) {

    const existingEmail = await prisma.user.findUnique({ where: { email } });

    if (existingEmail) {
        throw new Error(AuthErrorCode.EXIST_EMAIL);
    }

    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) {
        throw new Error(AuthErrorCode.EXIST_USERNAME);
    }  

    const hashedPassword = await hashPassword(password);

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
export async function login (email: string, password: string) {

    console.log("Attempting login for:", email);

    const user = await prisma.user.findUnique({ where: { email } });
    const isPasswordValid = user ? await verifyPassword(user.passwordHash, password) : false;

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
export async function me(userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error(AuthErrorCode.USER_NOT_FOUND);
    }
    return { id: user.id, username: user.username, email: user.email };
}

// REFRESH ACCESS TOKEN
export async function refreshAccessToken(refreshToken: string) {
    const payload = await verifyToken<{
                        userId: number;
                        email: string;
                        exp: number;
                    }>(refreshToken);

    const newAccessToken = await createAccessToken({ userId: payload.userId, email: payload.email });
    return { accessToken: newAccessToken };

}

// LOGOUT USER
export async function logout(accessToken: string) {
    // OPTIONAL: revoke access and refresh tokens in a token blacklist or database
    return;
}

// DELETE USER
export async function deleteUser(userId: number) {
    await prisma.user.delete({ where: { id: userId } });
    return;
}

// Change Password
export async function changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error(AuthErrorCode.USER_NOT_FOUND);
    }

    const isCurrentPasswordValid = await verifyPassword(user.passwordHash, currentPassword);
    if (!isCurrentPasswordValid) {
        throw new Error(AuthErrorCode.INVALID_CREDENTIALS);
    }

    const newHashedPassword = await hashPassword(newPassword);
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash: newHashedPassword },
        });
    } catch (err) {
        throw new Error("Failed to change password");
    }
}


