import { PASSWORD_RESET_EXPIRY, SESSION_COOKIE_NAME, SESSION_EXPIRY } from "@app/core/constants"
import { db } from "@app/database"
import { hasPermissions } from "@app/database/repository/role-permission"
import {
  bootStrapUser,
  getUserByEmail,
  getUserByUserName,
  getUserWithAccount,
  updateUserAndDeleteVerification,
  updateUserByEmail,
  updateUserById,
} from "@app/database/repository/user"
import {
  createVerification,
  findVerificationByIdentifier,
} from "@app/database/repository/verification"
import { ApiError } from "@app/error"
import { logger } from "@app/logger"
import { emailSchema } from "@app/zod/schema/auth"
import { createId } from "@paralleldrive/cuid2"
import { compare, hash } from "bcryptjs"
import { redis } from "@/config/redis"
import { stripe } from "@/config/stripe"
import { MSG } from "@/constants/message"
import type { SessionService } from "@/features/auth/services/session.service"
import { Cookie } from "@/features/auth/utils/cookie.utils"
import { sendMail } from "@/features/auth/utils/mail"
import type {
  GetSessionContext,
  LoginContext,
  LogoutContext,
  PasswordResetContext,
  RegisterContext,
  ResetPasswordContext,
  RestrictUserContext,
  UserNameContext,
  VerifyEmailContext,
} from "@/types/auth.types"
import { getDate } from "@/utils/date"
import { RouteUtils } from "@/utils/route.utils"
import { TokenUtils } from "@/utils/token.utils"

export class AuthService {
  constructor(private readonly sessionService: SessionService) {}

  async findUserName(c: UserNameContext) {
    const input = c.req.valid("query")
    const exists = await redis.hexists("username_records", input.username)
    return c.json({ exists: Boolean(exists) })
  }

  async register(c: RegisterContext) {
    const { username, email, password, name, callbackUrl } = c.req.valid("json")

    const isUserExist = await getUserByEmail(db, email)

    if (isUserExist) {
      throw ApiError.conflict(MSG.USER.ALREADY_EXISTS)
    }

    const isUserNameTaken = await getUserByUserName(db, username)

    if (isUserNameTaken) {
      throw ApiError.conflict(MSG.USER.USERNAME_EXISTS)
    }

    const hashedPassword = await hash(password, 10)
    const data = await bootStrapUser(db, {
      name,
      email,
      username,
      image: null,
      emailVerified: false,
      defaultRole: "owner",
      password: hashedPassword,
    })

    if (!data) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_CREATE)
    }

    // Create a stripe customer after creating a user successfully
    const stripeCustomer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId: data.user.id,
        workspaceId: data.user.workspaceId,
      },
    })

    // Update user with stripe customer id
    const updatedUser = await updateUserById(db, data.user.id, {
      stripeCustomerId: stripeCustomer.id,
    })

    if (!updatedUser) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    const [_, token] = await Promise.all([
      redis.hset("username_records", { [username]: 1 }),
      this.createEmailVerificationToken(email),
    ])

    const callbackString = RouteUtils.createRoute("/api/auth/verify-email", {
      token,
      callbackUrl,
    })

    // TODO: Trigger an email to users email from here
    logger.info(callbackString.toString())

    await sendMail({
      to: email,
      subject: "Your leaperone email verification link",
      html: callbackString.toString(),
    })

    return c.json({ message: MSG.VERIFICATION.LINK_SENT })
  }

  async login(c: LoginContext) {
    const input = c.req.valid("json")

    const userWithAccounts = await getUserWithAccount(db, input.email)

    if (!userWithAccounts) {
      throw ApiError.unauthorized(MSG.ACCOUNT.NOT_FOUND)
    }

    const { user, accounts } = userWithAccounts

    if (user?.isRestricted) {
      throw ApiError.badRequest(MSG.USER.RESTRICTED_USER)
    }

    const credentialAccount = accounts.find((a) => a.providerId === "credential")

    if (
      !credentialAccount ||
      !credentialAccount.password ||
      !(await compare(input.password, credentialAccount.password))
    ) {
      throw ApiError.unauthorized(MSG.PASSWORD.INVALID_PASSWORD)
    }

    if (!user?.emailVerified && user) {
      const token = await this.createEmailVerificationToken(user.email)
      const callbackString = RouteUtils.createRoute("/api/auth/verify-email", {
        token,
        callbackUrl: input.callbackUrl,
      })

      // TODO: send email verification link from here
      logger.info(callbackString.toString())

      await sendMail({
        to: input.email,
        subject: "Your leaperone email verification link",
        html: callbackString.toString(),
      })

      return c.json({ message: MSG.VERIFICATION.LINK_SENT, success: false })
    }

    const session = await this.sessionService.create(c, user!)

    if (!session) {
      throw ApiError.unauthorized(MSG.SESSION.FAILED_TO_CREATE)
    }

    await Cookie.set(c, SESSION_COOKIE_NAME, session.session.token)

    return c.json({
      success: true,
      message: MSG.AUTH.LOGIN_SUCCESS,
      data: { user: session.user },
    })
  }

  async getSession(c: GetSessionContext) {
    return await this.sessionService.get(c)
  }

  async logout(c: LogoutContext) {
    const sessionCookieToken = await Cookie.get(c, SESSION_COOKIE_NAME)

    if (!sessionCookieToken) {
      Cookie.delete(c, SESSION_COOKIE_NAME)
      throw ApiError.badRequest(MSG.SESSION.FAILED_TO_GET)
    }

    await this.sessionService.delete(sessionCookieToken)
    Cookie.delete(c, SESSION_COOKIE_NAME)
  }

  async verifyEmail(c: VerifyEmailContext) {
    const input = c.req.valid("query")
    const payload = c.get("jwtPayload")
    const { success, data } = emailSchema.safeParse(payload)

    if (!success) {
      throw ApiError.validationError("Failed to parse payload data")
    }

    const user = await getUserByEmail(db, data.email)

    if (!user) {
      throw ApiError.unauthorized("User not found")
    }

    if (user.emailVerified) {
      throw ApiError.unauthorized("Email is already verified")
    }

    const updatedUser = await updateUserByEmail(db, user.email, {
      emailVerified: true,
    })

    if (!updatedUser) {
      throw ApiError.badRequest("Failed to update user")
    }

    // Sign-in user automatically after verification
    const currentSession = await this.sessionService.fromCtx(c)

    if (!currentSession || currentSession.user.email !== data.email) {
      const session = await this.sessionService.create(c, updatedUser)
      await Cookie.set(c, SESSION_COOKIE_NAME, session.session.token)
    } else {
      const newSession = {
        user: updatedUser,
        session: currentSession.session,
      }

      await redis.set(currentSession.session.token, newSession, {
        ex: SESSION_EXPIRY,
      })
    }

    return c.redirect(input.callbackUrl)
  }

  async requestPasswordReset(c: PasswordResetContext) {
    const { email } = c.req.valid("json")

    const user = await getUserByEmail(db, email)

    if (!user) {
      return c.json({
        succcess: true,
        message: MSG.PASSWORD.USER_NOT_FOUND,
      })
    }

    const token = createId()
    const identifier = `reset-password:${token}`
    const expiresAt = getDate(PASSWORD_RESET_EXPIRY, "sec")

    await createVerification(db, {
      identifier,
      expiresAt,
      value: user.id!,
    })

    const callbackString = RouteUtils.createRoute(`/reset-password/${token}`, undefined, false)

    // TODO: send this callbackString to users email address
    logger.info(callbackString.toString())

    await sendMail({
      to: email,
      subject: "Your leaperone password reset verification link",
      html: callbackString.toString(),
    })

    return c.json({
      success: true,
      message: MSG.PASSWORD.RESET_REQUEST_SUCCESS,
    })
  }

  async resetPassword(c: ResetPasswordContext) {
    const { token, newPassword } = c.req.valid("json")

    const identifier = `reset-password:${token}`
    const verification = await findVerificationByIdentifier(db, identifier)

    if (!verification || verification.expiresAt < new Date()) {
      throw ApiError.badRequest(MSG.PROVIDER.INVALID_TOKEN)
    }

    const userId = verification.value
    const verificationId = verification.id
    const hashedPassword = await hash(newPassword, 10)

    await updateUserAndDeleteVerification(db, userId, verificationId, {
      password: hashedPassword,
    })

    // Revoke multiple other sessions for this user
    await this.sessionService.revoke(userId)

    return c.json({ success: true, message: MSG.PASSWORD.RESET_SUCCESS })
  }

  async restrictUser(c: RestrictUserContext) {
    const body = c.req.valid("json")
    const session = c.get("session")
    const workspace = c.get("workspace")

    if (body.userId === session.user.id) {
      throw ApiError.badRequest(MSG.USER.CANNOT_RESTRICT_YOURSELF)
    }

    const canRestrict = await hasPermissions(
      db,
      session.user.id,
      workspace.id,
      ["manage:members"],
      session,
    )

    if (!canRestrict) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const updatedUser = await updateUserById(db, body.userId, {
      isRestricted: true,
    })

    if (!updatedUser) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    await this.sessionService.revoke(updatedUser.id)
    return c.json({ userId: updatedUser.id })
  }

  async unRestrictUser(c: RestrictUserContext) {
    const body = c.req.valid("json")
    const session = c.get("session")
    const workspace = c.get("workspace")

    if (body.userId === session.user.id) {
      throw ApiError.badRequest(MSG.USER.CANNOT_UNRESTRICT_YOURSELF)
    }

    const canRestrict = await hasPermissions(
      db,
      session.user.id,
      workspace.id,
      ["manage:members"],
      session,
    )

    if (!canRestrict) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const updatedUser = await updateUserById(db, body.userId, {
      isRestricted: false,
    })

    if (!updatedUser) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    return c.json({ userId: session.user.id })
  }

  async createEmailVerificationToken(email: string) {
    return await TokenUtils.signJwt({ email }, 3600)
  }
}
