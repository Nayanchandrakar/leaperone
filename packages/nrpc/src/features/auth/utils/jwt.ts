import { SERVER_ENV } from "@app/env/server"
import { sign, verify } from "hono/jwt"
import type { JWTPayload } from "hono/utils/jwt/types"

export async function signJwt(
  data: Omit<JWTPayload, "exp" | "iss">,
  expiresIn = 3600,
) {
  const payload = {
    ...data,
    exp: Math.floor(Date.now() / 1000) + expiresIn,
    iss: "leapercrm",
  }
  return await sign(payload, SERVER_ENV.AUTH_SECRET)
}

export async function verifyJwt(token: string) {
  return await verify(token, SERVER_ENV.AUTH_SECRET)
}
