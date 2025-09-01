import { SERVER_ENV } from "@app/env/server"
import { SignJWT } from "jose"

export const signJwt = async (payload: any, expiresIn = 3600) => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
    .sign(new TextEncoder().encode(SERVER_ENV.AUTH_SECRET))

  return jwt
}
