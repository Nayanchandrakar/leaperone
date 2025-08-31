import { getUserAndAccounts } from "@myleaper/database/services/users"
import { loginFormSchema } from "@myleaper/zod/client/auth"
import { TRPCError } from "@trpc/server"
import { compare } from "bcryptjs"
import { MESSAGES } from "../../../constants/messages"
import { baseProcedure } from "../../../utils/init"
import { setSessionCookie } from "../services/cookie"
import { createEmailVerificationToken } from "../services/email-verification"
import { createSession } from "../services/session"
import { constructEmailVerificationUrl } from "../utils/urls"

export const login = baseProcedure
  .input(loginFormSchema)
  .mutation(async ({ input, ctx }) => {
    const { email, password, callbackUrl } = input
    const userAccounts = await getUserAndAccounts(input.email)

    if (!userAccounts) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: MESSAGES.PASSWORD.INVALID_EMAIL_OR_PASSWORD,
      })
    }

    const { accounts, user } = userAccounts

    const credentialAccount = accounts.find(
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

    const validPassword = await compare(password, currentPassword)

    if (!validPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: MESSAGES.PASSWORD.INVALID,
      })
    }

    if (!user?.emailVerified) {
      const token = await createEmailVerificationToken(email)
      const url = constructEmailVerificationUrl(callbackUrl, token)

      console.info("Verification URL generated", {
        email: input.email,
        url: url.toString(),
      })

      return { message: MESSAGES.USER.EMAIL_NOT_VERIFIED }
    }

    const session = await createSession(user.id, ctx.hono)

    if (!session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: MESSAGES.SESSION.FAILED_TO_CREATE,
      })
    }

    await setSessionCookie(ctx.hono, { session, user })

    return {
      user,
      redirect: callbackUrl,
      message: MESSAGES.AUTH.LOGIN_SUCCESS,
    }
  })
