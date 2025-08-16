import { checkUserName } from "../procedures/users/check-username"
import { createTRPCRouter } from "../utils/init"

export const usersRouter = createTRPCRouter({
  username: checkUserName,
})
