import { createUser, getUserByEmail } from "@myleaper/database/services/users"
import { registerSchema } from "@myleaper/zod/client/auth-schema"
import { TRPCError } from "@trpc/server"
import { hashPassword } from "src/utils/password"
import { constructEmailVerificationUrl } from "src/utils/urls"
import { MESSAGES } from "../../constants/messages"
import { createEmailVerificationToken } from "../../lib/email/email-verification"
import { baseProcedure } from "../../utils/init"

export const register = baseProcedure
  .input(registerSchema)
  .mutation(async ({ input }) => {
    const existingUser = await getUserByEmail(input.email)
    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: MESSAGES.USER.ALREADY_EXISTS,
        cause: "Email already registered",
      })
    }

    const hashedPassword = await hashPassword(input.password)

    const user = await createUser({
      ...input,
      hash: hashedPassword,
    })

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: MESSAGES.USER.FAILED_TO_CREATE,
      })
    }

    const token = await createEmailVerificationToken(input.email)
    const verificationUrl = constructEmailVerificationUrl(
      input.callbackUrl,
      token,
    )

    // TODO: Implement email service integration
    console.info("Verification URL generated", {
      email: input.email,
      url: verificationUrl.toString(),
    })

    return {
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
      data: { verificationUrl: verificationUrl.toString() },
    }
  })
