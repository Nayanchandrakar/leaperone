import type { UserRepository } from "@app/database/repository/user"
import { ApiError } from "@app/error/index"
import { compare, hash } from "bcryptjs"
import { MSG } from "../../../constants/message"
import { redis } from "../../../lib/redis"
import { createRoute } from "../../../utils/urls"
import { SESSION_COOKIE_NAME } from "../constants"
import { signJwt } from "../lib/jwt"
import type {
  GetSessionController,
  LoginController,
  LogoutController,
  RegisterController,
} from "../types"
import type { Cookie } from "../utils/cookie"
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

  async findUserName(username: string) {
    const exists = await redis.hexists("username_records", username)
    return Boolean(exists)
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

    const token = await signJwt({ email: input.email.toLocaleLowerCase() }, 500)
    const callbackString = createRoute("/api/auth/email-verification", {
      token,
      callbackUrl: input.callbackUrl,
    })

    // TODO: send email verification link from here
    console.info({
      email: input.email,
      url: callbackString.toString(),
    })
  }

  async login(c: LoginController) {
    const input = c.req.valid("json")

    const userWithAccounts = await this.userRepository.findUserWithAccount(
      input.email,
    )

    if (!userWithAccounts) {
      throw ApiError.unauthorized(MSG.PASSWORD.INVALID_PASSWORD)
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

    if (user?.emailVerified) {
      const token = await signJwt(
        { email: input.email.toLocaleLowerCase() },
        500,
      )
      const callbackString = createRoute("/api/auth/email-verification", {
        token,
        callbackUrl: input.callbackUrl,
      })

      // TODO: send email verification link from here
      console.info({
        email: input.email,
        url: callbackString.toString(),
      })
    }

    const session = await this.session.create(c, user!)

    if (!session) {
      throw ApiError.unauthorized(MSG.SESSION.FAILED_TO_CREATE)
    }

    await this.cookie.set(c, SESSION_COOKIE_NAME, session.session.token)

    return session
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
}
