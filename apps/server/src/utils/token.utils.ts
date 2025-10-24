import { ENV } from "@app/env/server"
import { sign, verify } from "hono/jwt"
import type { JWTPayload } from "hono/utils/jwt/types"

export class TokenUtils {
  private constructor() {}

  static async signJwt(data: Omit<JWTPayload, "exp" | "iss">, expiresIn = 3600) {
    const payload = {
      ...data,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
      iss: "leaperone",
    }
    return await sign(payload, ENV.AUTH_SECRET)
  }

  static async verifyJwt(token: string) {
    return await verify(token, ENV.AUTH_SECRET)
  }
}
