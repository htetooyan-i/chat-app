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
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRES || "15m")
    .sign(key);
}

// CREATE REFRESH TOKEN
export async function createRefreshToken(payload: {
  userId: number;
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.REFRESH_TOKEN_EXPIRES || "7d")
    .sign(key);
}

// VERIFY TOKEN
export async function verifyToken<T>(token: string): Promise<T> {
  const { payload } = await jwtVerify(token, key);
  return payload as T;
}
