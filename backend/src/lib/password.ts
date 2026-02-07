import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
    const hash = await argon2.hash(password);
    return hash;
}

export async function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    const isValid = await argon2.verify(hashedPassword, password);
    return isValid;
}
