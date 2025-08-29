import { signJWT } from "../../utils/jwt"

export async function createEmailVerificationToken(
  email: string,
  /**
   * The email to update from
   */
  updateTo?: string,
  /**
   * The time in seconds for the token to expire
   */
  expiresIn = 300,
) {
  const token = await signJWT(
    {
      email: email.toLowerCase(),
      updateTo,
    },
    expiresIn,
  )
  return token
}
