import { authRouter } from "./features/auth/routers"
import { createTRPCRouter } from "./utils/init"

export const appRouter = createTRPCRouter({
  auth: authRouter,
})
