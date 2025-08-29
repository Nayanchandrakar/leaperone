import { getUserWithAccountsByEmail } from "@myleaper/database/services/users"
import { loginFormSchema } from "@myleaper/zod/client/auth-schema"
import { TRPCError } from "@trpc/server"
import { hashPassword, verifyPassword } from "src/utils/password"
import { constructEmailVerificationUrl } from "src/utils/urls"
import { MESSAGES } from "../../constants/messages"
import { createEmailVerificationToken } from "../../lib/email/email-verification"
import { baseProcedure } from "../../utils/init"

export const login = baseProcedure
  .input(loginFormSchema)
  .mutation(async ({ input }) => {
    const user = await getUserWithAccountsByEmail(input.email)

    if (!user) {
      // Hash password to prevent timing attacks from revealing valid email addresses
      // By hashing passwords for invalid emails, we ensure consistent response times
      await hashPassword(input.password)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: MESSAGES.PASSWORD.INVALID_EMAIL_OR_PASSWORD,
      })
    }

    const credentialAccount = user.accounts.find(
      (a) => a.providerId === "credential",
    )

    if (!credentialAccount) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: MESSAGES.ACCOUNT.CREDENTIAL_NOT_FOUND,
      })
    }

    const currentPassword = credentialAccount.password
    if (!currentPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: MESSAGES.PASSWORD.INVALID,
      })
    }

    const validPassword = await verifyPassword({
      hash: currentPassword,
      password: input.password,
    })

    if (!validPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: MESSAGES.PASSWORD.INVALID,
      })
    }

    if (!user.user?.emailVerified) {
      const token = await createEmailVerificationToken(input.email, undefined)
      const verificationUrl = constructEmailVerificationUrl(
        input.callbackUrl,
        token,
      )

      console.info("Verification URL generated", {
        email: input.email,
        url: verificationUrl.toString(),
      })

      return { message: MESSAGES.USER.EMAIL_NOT_VERIFIED }
    }

    // TODO: Create session here

    return { message: MESSAGES.AUTH.LOGIN_SUCCESS }
  })
