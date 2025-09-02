import { authRouter } from "./features/auth/modules/auth.routes"
import { n } from "./utils/init"

/**
 * This is your base API.
 * Here, you can handle errors, not-found responses, cors and more.
 */
const api = n.router().basePath("/api").onError(n.defaults.errorHandler)

/**
 * This is the main router for your server.
 * All routers in /server/routers should be added here manually.
 */
const appRouter = n.mergeRouters(api, {
  auth: authRouter,
})

export type AppRouter = typeof appRouter

export default appRouter
