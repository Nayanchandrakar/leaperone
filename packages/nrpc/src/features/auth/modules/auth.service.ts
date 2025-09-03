import type { UserRepository } from "@app/database/repository/user"
import { ApiError } from "@app/error/index"
import { hash } from "bcryptjs"
import { createRoute } from "src/utils/urls"
import { redis } from "../../../lib/redis"
import { signJwt } from "../lib/jwt"
import type { RegisterController } from "../types"

export class AuthService {
  private userRepository: UserRepository
  private static instance: AuthService | null = null

  private constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  static init(userRepository: UserRepository) {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(userRepository)
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
      throw ApiError.conflict("Email is already registered")
    }

    const isUserNameTaken = await this.userRepository.findUserWithUserName(
      input.username,
    )

    if (isUserNameTaken) {
      throw ApiError.conflict("Username has been already taken")
    }

    const hashedPassword = await hash(input.password, 10)

    const newUser = await this.userRepository.createUser(
      input.email,
      input.username,
      hashedPassword,
      input.name,
    )

    if (!newUser) {
      throw ApiError.badRequest("Failed to create user account")
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
}
