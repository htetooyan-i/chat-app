import argon2 from "argon2";

export class Hash {

    static async hash(key: string): Promise<string> {
        const hash = await argon2.hash(key);
        return hash;
    }

    static async verify(hashedkey: string, key: string): Promise<boolean> {
        const isValid = await argon2.verify(hashedkey, key);
        return isValid;
    }
}
