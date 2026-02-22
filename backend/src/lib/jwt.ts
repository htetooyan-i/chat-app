import { SignJWT, jwtVerify } from "jose";

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
  const accessExpires = process.env.ACCESS_TOKEN_EXPIRES?.trim() || "15m";
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(accessExpires)
    .sign(key);
}

// CREATE REFRESH TOKEN
export async function createRefreshToken(payload: {
  userId: number;
}) {
  const refreshExpires = process.env.REFRESH_TOKEN_EXPIRES?.trim() || "7d";
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(refreshExpires)
    .sign(key);
}

// VERIFY TOKEN
export async function verifyToken<T>(token: string): Promise<T> {
  const { payload } = await jwtVerify(token, key);
  return payload as T;
}
