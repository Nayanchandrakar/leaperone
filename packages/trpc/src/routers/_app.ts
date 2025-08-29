import { createTRPCRouter } from "../utils/init"
import { authRouter } from "./auth"

export const appRouter = createTRPCRouter({
  auth: authRouter,
})
