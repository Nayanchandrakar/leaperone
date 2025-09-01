import { n } from "../../../utils/init"
import { login } from "../procedures/login"
import { register } from "../procedures/register"
import { username } from "../procedures/username"

export const authRouter = n.router({
  login,
  username,
  register,
})
