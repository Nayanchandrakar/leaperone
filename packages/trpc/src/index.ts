import { trpcServer } from "@hono/trpc-server"
import { appRouter } from "./routers/_app"

export const trpcHonoMiddleware = trpcServer({
  router: appRouter,
  endpoint: "/api/trpc",
  onError: ({ error }) => {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // TODO: Log the error with the use of pino logger
      console.error(`Error: ${error.code}`)
    }
  },
})
