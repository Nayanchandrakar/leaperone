import { trpcServer } from "@hono/trpc-server"
import { appRouter } from "./routers/_app"

export const trpcHonoMiddleware = trpcServer({
  router: appRouter,
  endpoint: "/api/trpc",
})
