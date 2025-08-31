import { trpcServer } from "@hono/trpc-server"
import { appRouter } from "./router"

export const trpcHonoMiddleware = trpcServer({
  router: appRouter,
  endpoint: "/api/trpc",
  createContext: (_opts, context) => {
    return { hono: context }
  },
  onError: ({ error }) => {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error(`Error: ${error.code}`)
    }
  },
})
