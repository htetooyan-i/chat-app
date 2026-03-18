import crypto from 'crypto';

import { Hash } from "../lib/hash";
import { prisma } from "../lib/prisma";
import { VerifyTokenType } from "../../generated/prisma/enums";
import { UserToken } from '../../generated/prisma/client';

export class TokenService {

    // Create a new token for a user
    static async create(userId: number, tokenType: VerifyTokenType, hashedToken: string, expiresAt: Date) {

        try {
            await prisma.userToken.create({
                data: {
                    userId,
                    token: hashedToken,
                    type: tokenType,
                    expiresAt,
                },
            });
        } catch (error: any) {
            console.error("Error creating token:", error.message);
            throw new Error("Failed to create token", { cause: error });
        }
    }

    // Generate a new token, store it in the database, and return the raw token
    static async generate(userId: number, type: VerifyTokenType, expiresInMinutes = 5): Promise<string> {
        const rawToken = crypto.randomUUID();
        const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
        const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

        await this.create(userId, type, hashedToken, expiresAt);
        return rawToken;
    }


    // Verify if a token is valid for a user and mark it as used
    static async verifyToken(type: VerifyTokenType, rawToken: string, includeUsed = true): Promise<UserToken | null> {

        const hashedToken = crypto
                .createHash("sha256")
                .update(rawToken)
                .digest("hex");

        try {
            const tokenRecord = await prisma.userToken.findFirst({
            where: { type, token: hashedToken, used: includeUsed, expiresAt: { gt: new Date() } },
            });

            if (!tokenRecord) return null;
            return tokenRecord;
        } catch (error: any) {
            console.error("Error verifying token:", error.message);
            throw new Error("Failed to verify token", { cause: error });
        }

    }

    // Mark a token as used
    static async markTokenUsed(tokenId: number) {
        try {
            const updated = await prisma.userToken.update({
                where: { id: tokenId },
                data: { used: true },
            });
            return updated;
        } catch (error: any) {
            console.error("Error updating token:", error.message);
            throw new Error("Failed to update token", { cause: error });
        }
    }

    // Revoke all tokens for a user (e.g. on logout or password change)
    static async deleteTokensByUserId(userId: number) {
        try {
            await prisma.userToken.deleteMany({
                where: { userId },
            });
        } catch (error: any) {
            console.error("Error deleting tokens:", error.message);
            throw new Error("Failed to delete tokens", { cause: error } );
        }   
    }

    // Check if a value is a valid VerifyTokenType
    static isVerifyTokenType(value: any): value is VerifyTokenType {
        return ["EMAIL_VERIFICATION", "PASSWORD_RESET", "PHONE_VERIFICATION"].includes(value);
    }
}
