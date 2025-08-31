import {
  createUser,
  getUserByEmail,
  isUserNameTaken,
} from "@myleaper/database/services/users"
import { registerSchema } from "@myleaper/zod/client/auth"
import { TRPCError } from "@trpc/server"
import { hash } from "bcryptjs"
import { MESSAGES } from "../../../constants/messages"
import { baseProcedure } from "../../../utils/init"
import { createEmailVerificationToken } from "../services/email-verification"
import { constructEmailVerificationUrl } from "../utils/urls"

export const register = baseProcedure
  .input(registerSchema)
  .mutation(async ({ input }) => {
    const existingUser = await getUserByEmail(input.email)

    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: MESSAGES.USER.ALREADY_EXISTS,
      })
    }

    const isExists = await isUserNameTaken(input.username)

    if (isExists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: MESSAGES.USER.USERNAME_EXISTS,
      })
    }

    const hashedPassword = await hash(input.password, 10)

    const user = await createUser({
      ...input,
      hashedPassword,
    })

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: MESSAGES.USER.FAILED_TO_CREATE,
      })
    }

    const token = await createEmailVerificationToken(input.email)
    const url = constructEmailVerificationUrl(input.callbackUrl, token)

    const verificationUrl = url.toString()

    // TODO: Implement email service integration
    console.info("Verification URL generated", {
      email: input.email,
      url: verificationUrl.toString(),
    })

    return {
      message: MESSAGES.USER.EMAIL_NOT_VERIFIED,
      data: { verificationUrl },
    }
  })
