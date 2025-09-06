import type { UserRepository } from "@app/database/repository/user"
import { ApiError } from "@app/error/index"
import { emailSchema } from "@app/zod/schema/auth"
import { createId } from "@paralleldrive/cuid2"
import { compare, hash } from "bcryptjs"
import { MSG } from "../../../constants/message"
import { redis } from "../../../lib/redis"
import { getDate } from "../../../utils/date"
import { createRoute } from "../../../utils/urls"
import {
  PASSWORD_RESET_EXPIRY,
  SESSION_COOKIE_NAME,
  SESSION_EXPIRY,
} from "../constants"
import type {
  GetSessionController,
  LoginController,
  LogoutController,
  PasswordResetController,
  RegisterController,
  UserNameController,
  VerifyEmailController,
} from "../types"
import type { Cookie } from "../utils/cookie"
import { createEmailVerificationToken } from "../utils/email-verification"
import type { Session } from "../utils/session"

export class AuthService {
  private static instance: AuthService | null = null
  private userRepository: UserRepository
  private session: Session
  private cookie: Cookie

  private constructor(
    userRepository: UserRepository,
    session: Session,
    cookie: Cookie,
  ) {
    this.cookie = cookie
    this.session = session
    this.userRepository = userRepository
  }

  static init(
    userRepository: UserRepository,
    session: Session,
    cookie: Cookie,
  ) {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(userRepository, session, cookie)
    }
    return AuthService.instance
  }

  async findUserName(c: UserNameController) {
    const input = c.req.valid("query")
    const exists = await redis.hexists("username_records", input.username)
    return c.json({ exists: Boolean(exists) })
  }

  async register(c: RegisterController) {
    const input = c.req.valid("json")

    const isUserExist = await this.userRepository.findUserByEmail(input.email)

    if (isUserExist) {
      throw ApiError.conflict(MSG.USER.ALREADY_EXISTS)
    }

    const isUserNameTaken = await this.userRepository.findUserWithUserName(
      input.username,
    )

    if (isUserNameTaken) {
      throw ApiError.conflict(MSG.USER.USERNAME_EXISTS)
    }

    const hashedPassword = await hash(input.password, 10)

    const newUser = await this.userRepository.createUser(
      input.email,
      input.username,
      hashedPassword,
      input.name,
    )

    if (!newUser) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_CREATE)
    }

    const [_, token] = await Promise.all([
      redis.hset("username_records", { [input.username]: 1 }),
      createEmailVerificationToken(input.email),
    ])

    const callbackString = createRoute("/api/auth/verify-email", {
      token,
      callbackUrl: input.callbackUrl,
    })

    // TODO: Trigger an email to users email from here
    console.info({
      email: input.email,
      url: callbackString.toString(),
    })

    return c.json({ message: MSG.VERIFICATION.LINK_SENT })
  }

  async login(c: LoginController) {
    const input = c.req.valid("json")

    const userWithAccounts = await this.userRepository.findUserWithAccount(
      input.email,
    )

    if (!userWithAccounts) {
      throw ApiError.unauthorized(MSG.ACCOUNT.NOT_FOUND)
    }

    const { user, accounts } = userWithAccounts

    const credentialAccount = accounts.find(
      (a) => a.providerId === "credential",
    )

    if (
      !credentialAccount ||
      !credentialAccount.password ||
      !(await compare(input.password, credentialAccount.password))
    ) {
      throw ApiError.unauthorized(MSG.PASSWORD.INVALID_PASSWORD)
    }

    if (!user?.emailVerified && user) {
      const token = await createEmailVerificationToken(user.email)
      const callbackString = createRoute("/api/auth/verify-email", {
        token,
        callbackUrl: input.callbackUrl,
      })

      // TODO: send email verification link from here
      console.info({
        email: input.email,
        url: callbackString.toString(),
      })

      return c.json({ message: MSG.VERIFICATION.LINK_SENT })
    }

    const session = await this.session.create(c, user!)

    if (!session) {
      throw ApiError.unauthorized(MSG.SESSION.FAILED_TO_CREATE)
    }

    await this.cookie.set(c, SESSION_COOKIE_NAME, session.session.token)

    return c.json({
      message: MSG.AUTH.LOGIN_SUCCESS,
      data: { user: session.user },
    })
  }

  async getSession(c: GetSessionController) {
    return await this.session.get(c)
  }

  async logout(c: LogoutController) {
    const sessionCookieToken = await this.cookie.get(c, SESSION_COOKIE_NAME)

    if (!sessionCookieToken) {
      this.cookie.delete(c, SESSION_COOKIE_NAME)
      throw ApiError.badRequest(MSG.SESSION.FAILED_TO_GET)
    }

    await this.session.delete(sessionCookieToken)
    this.cookie.delete(c, SESSION_COOKIE_NAME)
  }

  async verifyEmail(c: VerifyEmailController) {
    const input = c.req.valid("query")
    const payload = c.get("jwtPayload")
    const { success, data } = emailSchema.safeParse(payload)

    if (!success) {
      throw ApiError.validationError("Failed to parse payload data")
    }

    const user = await this.userRepository.findUserByEmail(data.email)

    if (!user) {
      throw ApiError.unauthorized("User not found")
    }

    if (user.emailVerified) {
      throw ApiError.unauthorized("Email is already verified")
    }

    const updatedUser = await this.userRepository.updateUserByEmail(
      user.email,
      {
        emailVerified: true,
      },
    )

    if (!updatedUser) {
      throw ApiError.badRequest("Failed to update user")
    }

    // Sign-in user automatically after verification
    const currentSession = await this.session.get(c)

    if (!currentSession || currentSession.user.email !== data.email) {
      const session = await this.session.create(c, updatedUser)
      await this.cookie.set(c, SESSION_COOKIE_NAME, session.session.token)
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

  async requestPasswordReset(c: PasswordResetController) {
    const { email, redirectTo } = c.req.valid("json")

    const user = await this.userRepository.findUserByEmail(email)

    if (!user) {
      return c.json({
        succcess: true,
        message: MSG.PASSWORD.USER_NOT_FOUND,
      })
    }

    const identifier = `reset-password:${createId()}`
    const expiresAt = getDate(PASSWORD_RESET_EXPIRY, "sec")

    await this.userRepository.createVerification({
      identifier,
      expiresAt,
      value: user.id!,
    })

    const callbackUrl = redirectTo ? encodeURIComponent(redirectTo) : undefined
    const callbackString = createRoute(`/reset-password/${identifier}`, {
      callbackUrl,
    })

    // TODO: send this callbackString to users email address
    console.log({
      callbackString,
    })

    return c.json({ status: true })
  }
}
