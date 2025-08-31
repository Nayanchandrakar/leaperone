import { signJwt } from "../../../utils/jwt"

export const createEmailVerificationToken = async (
  email: string,
  expiresIn = 300,
): Promise<string> => {
  return await signJwt({ email: email.toLowerCase() }, expiresIn)
}
