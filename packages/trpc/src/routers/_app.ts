import { createTRPCRouter } from "../utils/init"
import { usersRouter } from "./users"

export const appRouter = createTRPCRouter({
  users: usersRouter,
})
