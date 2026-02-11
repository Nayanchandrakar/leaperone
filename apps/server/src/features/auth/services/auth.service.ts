import { PASSWORD_RESET_EXPIRY, SESSION_COOKIE_NAME, SESSION_EXPIRY } from "@app/core/constants"
import { db } from "@app/database"
import { PERMISSIONS } from "@app/database/constants/permissions"
import { updateAccountPassword } from "@app/database/repository/account"
import { hasPermissions } from "@app/database/repository/role-permission"
import {
  createUser,
  doesUserExistByUsernameOrEmail,
  getUserByEmail,
  getUserWithProviderAccount,
  updateUserAndDeleteVerification,
  updateUserByEmail,
  updateUserById,
} from "@app/database/repository/user"
import {
  createVerification,
  findVerificationByIdentifier,
} from "@app/database/repository/verification"
import { getWorkspaceMember } from "@app/database/repository/workspace-member"
import type { PermissionType } from "@app/database/types"
import { ApiError } from "@app/error"
import { logger } from "@app/logger"
import type { SessionService } from "@app/session"
import { emailSchema } from "@app/zod/schema/auth"
import { createId } from "@paralleldrive/cuid2"
import { compare, hash } from "bcryptjs"
import type { Context } from "hono"
import { deleteCookie, getCookie } from "hono/cookie"
import { redis } from "@/config/redis"
import { stripe } from "@/config/stripe"
import { MSG } from "@/constants/message"
import { setSessionCookie } from "@/features/auth/utils/cookie"
import { sendMail } from "@/features/auth/utils/mail"
import type {
  ChangePasswordContext,
  GetPermissionContext,
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
import { getRequestIp } from "@/utils/string"
import { TokenUtils } from "@/utils/token.utils"

export class AuthService {
  constructor(private readonly sessionService: SessionService<Context>) {}

  async findUserName(c: UserNameContext) {
    const input = c.req.valid("query")
    const exists = await redis.hexists("username_records", input.username)
    return c.json({ exists: Boolean(exists) })
  }

  async register(c: RegisterContext) {
    const { username, email, password, name, callbackUrl } = c.req.valid("json")

    // Check if user already exists by username or email
    const doesUserExist = await doesUserExistByUsernameOrEmail(db, username, email)

    if (doesUserExist) {
      throw ApiError.conflict(MSG.USER.ALREADY_EXISTS)
    }

    const hashedPassword = await hash(password, 10)
    const data = await createUser(db, {
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

    // Parallelize Stripe customer creation and token generation
    const [stripeCustomer, token] = await Promise.all([
      stripe.customers.create({
        email,
        name,
        metadata: {
          userId: data.user.id,
          workspaceId: data.user.workspaceId,
        },
      }),
      this.createEmailVerificationToken(email),
    ])

    // Update user with stripe customer id and set username in Redis in parallel
    const [updatedUser] = await Promise.all([
      updateUserById(db, data.user.id, {
        stripeCustomerId: stripeCustomer.id,
      }),
      redis.hset("username_records", { [username]: 1 }),
    ])

    if (!updatedUser) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

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

    const userWithAccounts = await getUserWithProviderAccount(db, input.email, "credential")

    if (!userWithAccounts) {
      throw ApiError.unauthorized(MSG.ACCOUNT.NOT_FOUND)
    }

    const { user, account } = userWithAccounts

    if (user?.isRestricted) {
      throw ApiError.badRequest(MSG.USER.RESTRICTED_USER)
    }

    if (!account || !account.password || !(await compare(input.password, account.password))) {
      throw ApiError.unauthorized(MSG.PASSWORD.INVALID_PASSWORD)
    }

    if (!user?.emailVerified && user) {
      const token = await this.createEmailVerificationToken(input.email)
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

    const session = await this.sessionService.create({
      user,
      token: createId(),
      ipAddress: getRequestIp(c),
      userAgent: c.req.header("User-Agent"),
    })

    if (!session) {
      throw ApiError.unauthorized(MSG.SESSION.FAILED_TO_CREATE)
    }

    setSessionCookie(c, SESSION_COOKIE_NAME, session.session.token)

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
    const sessionCookieToken = getCookie(c, SESSION_COOKIE_NAME)

    if (!sessionCookieToken) {
      deleteCookie(c, SESSION_COOKIE_NAME)
      throw ApiError.badRequest(MSG.SESSION.FAILED_TO_GET)
    }

    await this.sessionService.delete(sessionCookieToken)
    deleteCookie(c, SESSION_COOKIE_NAME)
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
      const newSession = await this.sessionService.create({
        user: updatedUser,
        token: createId(),
        ipAddress: getRequestIp(c),
        userAgent: c.req.header("User-Agent"),
      })
      setSessionCookie(c, SESSION_COOKIE_NAME, newSession.session.token)
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
    const session = c.get("session")
    const workspace = c.get("workspace")
    const { memberId } = c.req.valid("json")

    if (memberId === session.user.id) {
      throw ApiError.badRequest(MSG.USER.CANNOT_RESTRICT_YOURSELF)
    }

    // Check if the current user has permission to restrict members (only workspace owner)
    const canRestrict = await hasPermissions(db, session.user.id, [PERMISSIONS.RESTRICT_MEMBERS])

    if (!canRestrict) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Check if the user to be restricted is a member of the same workspace
    const member = await getWorkspaceMember(db, memberId, workspace.id)

    if (!member) {
      throw ApiError.notFound(MSG.INVITATION.MEMBER_NOT_FOUND)
    }

    const updatedUser = await updateUserById(db, memberId, {
      isRestricted: true,
    })

    if (!updatedUser) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    await this.sessionService.revoke(memberId)
    return c.json({ meta: { memberId } })
  }

  async unRestrictUser(c: RestrictUserContext) {
    const session = c.get("session")
    const workspace = c.get("workspace")
    const { memberId } = c.req.valid("json")

    if (memberId === session.user.id) {
      throw ApiError.badRequest(MSG.USER.CANNOT_UNRESTRICT_YOURSELF)
    }

    // Check if the current user has permission to unrestrict members (only workspace owner)
    const canUnrestrict = await hasPermissions(db, session.user.id, [
      PERMISSIONS.UNRESTRICT_MEMBERS,
    ])

    if (!canUnrestrict) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Check if the user to be unrestricted is a member of the same workspace
    const member = await getWorkspaceMember(db, memberId, workspace.id)

    if (!member) {
      throw ApiError.notFound(MSG.INVITATION.MEMBER_NOT_FOUND)
    }

    const updatedUser = await updateUserById(db, memberId, {
      isRestricted: false,
    })

    if (!updatedUser) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    await this.sessionService.refresh({
      id: updatedUser.id,
      isRestricted: false,
      updatedAt: new Date(),
    })

    return c.json({ meta: { memberId } })
  }

  async createEmailVerificationToken(email: string) {
    return await TokenUtils.signJwt({ email }, 3600)
  }

  async changePassword(c: ChangePasswordContext) {
    const session = c.get("session")
    const { newPassword, currentPassword } = c.req.valid("json")

    // Get user with account to verify current password
    const userWithAccounts = await getUserWithProviderAccount(db, session.user.email, "credential")

    if (!userWithAccounts) {
      throw ApiError.unauthorized(MSG.ACCOUNT.NOT_FOUND)
    }

    const { user, account } = userWithAccounts

    // Verify current password
    if (!account || !account.password || !(await compare(currentPassword, account.password))) {
      throw ApiError.unauthorized(MSG.PASSWORD.INVALID_PASSWORD)
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10)

    // Update account password
    const updatedAccount = await updateAccountPassword(db, account.id, hashedPassword)

    if (!updatedAccount) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    // Revoke other sessions for this user (but keep current one)
    await this.sessionService.revoke(user.id)

    // Create new session for the user
    const newSession = await this.sessionService.create({
      user: user,
      token: createId(),
      ipAddress: getRequestIp(c),
      userAgent: c.req.header("User-Agent"),
    })

    if (!newSession) {
      throw ApiError.unauthorized(MSG.SESSION.FAILED_TO_CREATE)
    }

    // Set session cookie with new session
    setSessionCookie(c, SESSION_COOKIE_NAME, newSession.session.token)

    return c.json({
      success: true,
      message: MSG.PASSWORD.CHANGE_SUCCESS,
      data: { user: newSession.user },
    })
  }

  async getPermission(c: GetPermissionContext) {
    const { user } = c.get("session")
    const { permission } = c.req.valid("query")
    const permissionResult = await hasPermissions(db, user.id, [permission as PermissionType])
    return c.json({ permission: permissionResult })
  }
}
