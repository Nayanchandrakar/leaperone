import { signJwt } from "./jwt"

export async function createEmailVerificationToken(email: string) {
  return await signJwt({ email }, 3600)
}
