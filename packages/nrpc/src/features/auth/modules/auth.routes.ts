import {
  loginFormSchema,
  registerFormSchema,
  userNameSchema,
} from "@app/zod/schema/auth"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { authController } from "./auth.module"

const app = new Hono()
  .post("/register", zValidator("json", registerFormSchema), (opts) => {
    return authController.register(opts)
  })
  .post("/login", zValidator("json", loginFormSchema), (opts) => {
    return authController.login(opts)
  })
  .get("/username", zValidator("param", userNameSchema), (opts) => {
    return authController.userName(opts)
  })
  .get("/get-session", (opts) => {
    return authController.getSession(opts)
  })

export default app
