import { login } from "../procedures/auth/login"
import { register } from "../procedures/auth/register"
import { username } from "../procedures/auth/username"
import { createTRPCRouter } from "../utils/init"

export const authRouter = createTRPCRouter({
  register,
  login,
  username,
})
