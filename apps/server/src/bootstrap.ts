import { auth } from "@myleaper/auth/index"
import { serverEnv } from "@myleaper/env/server"
import { Logger } from "@myleaper/logger/index"
import { trpcHonoMiddleware } from "@myleaper/trpc/server"
import { Hono } from "hono"
import { csrf } from "hono/csrf"
import { secureHeaders } from "hono/secure-headers"
import { crossOriginRequest } from "@/config/cors"
import { startDevServer } from "@/hono/server"
import type { ServerConfig } from "@/types"

const DEFAULT_CONFIG: Required<ServerConfig> = {
  port: serverEnv.PORT,
  trpcEndpoint: "/api/trpc/*",
  authEndpoint: "/api/auth/**",
}

const bootStrapLogger = Logger.createLogger({ prefix: "BootStrap" })

export function bootStrapServer(config: ServerConfig = {}) {
  const app = new Hono()
  const { trpcEndpoint, port, authEndpoint } = {
    ...DEFAULT_CONFIG,
    ...config,
  }

  app.use(secureHeaders())
  app.use(crossOriginRequest)
  app.use(csrf())
  app.use(trpcEndpoint, trpcHonoMiddleware)
  app.on(["POST", "GET"], authEndpoint, (c) => auth.handler(c.req.raw))

  startDevServer({
    port,
    fetch: app.fetch,
    logger: bootStrapLogger,
  })

  return app
}
