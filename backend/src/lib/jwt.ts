import { SignJWT, jwtVerify } from "jose";
import { parseDurationMs } from "./duration";

const secret = process.env.JWT_SECRET

if (!secret) {
    throw new Error('JWT_SECRET is not defined');
}

const key = new TextEncoder().encode(secret);

// CREATE ACCESS TOKEN
export async function createAccessToken(payload: {
  userId: number;
  email: string;
}) {
  const accessTtlMs = parseDurationMs(process.env.ACCESS_TOKEN_EXPIRES, 15, "m");
  const expiration = Math.floor((Date.now() + accessTtlMs) / 1000);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(key);
}

// CREATE REFRESH TOKEN
export async function createRefreshToken(payload: {
  userId: number;
}) {
  const refreshTtlMs = parseDurationMs(process.env.REFRESH_TOKEN_EXPIRES, 30, "d");
  const expiration = Math.floor((Date.now() + refreshTtlMs) / 1000);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(key);
}

// VERIFY TOKEN
export async function verifyToken<T>(token: string): Promise<T> {
  const { payload } = await jwtVerify(token, key);
  return payload as T;
}
