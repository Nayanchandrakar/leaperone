import { loginFormSchema, registerFormSchema } from "@app/zod/client/auth"
import { userNameSchema } from "@app/zod/common/index"
import { redis } from "src/lib/redis"
import { baseProcedure } from "src/utils/init"
import type { AuthService } from "./auth.service"

export class AuthController {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  public login = baseProcedure
    .input(loginFormSchema)
    .mutation(async ({ c }) => {
      return c.json({ message: "Hello world program" })
    })

  public register = baseProcedure
    .input(registerFormSchema)
    .mutation(async ({ c }) => {
      return c.json({ message: "Hello world program" })
    })

  public username = baseProcedure
    .input(userNameSchema)
    .query(async ({ c, input }) => {
      const { username } = input

      const exists = await redis.hexists("username_records", username)
      return c.json({ query: username, exists: Boolean(exists) })
    })
}
