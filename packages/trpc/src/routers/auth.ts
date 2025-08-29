import { login } from "../procedures/auth/login"
import { register } from "../procedures/auth/register"
import { createTRPCRouter } from "../utils/init"

export const authRouter = createTRPCRouter({
  register,
  login,
})
