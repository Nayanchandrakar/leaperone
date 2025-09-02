import { loginFormSchema } from "@app/zod/client/auth"
import { baseProcedure, n } from "../../../utils/init"
import { authController } from "./auth.module"

export const authRouter = n.router({
  login: baseProcedure.input(loginFormSchema).mutation(async ({ c }) => {
    return c.json({ messsage: "world world" })
  }),
  username: authController.username,
  register: authController.register,
})
