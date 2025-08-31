import { createTRPCRouter } from "../../../utils/init"
import { login } from "../procedures/login"
import { register } from "../procedures/register"
import { username } from "../procedures/username"

export const authRouter = createTRPCRouter({
  register,
  login,
  username,
})
