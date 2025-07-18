import { serverEnv } from "@leapercrm/env/server"
import { Logger } from "@leapercrm/logger"
import { trpcHonoMiddleware } from "@leapercrm/trpc/server"
import { Hono } from "hono"
import { csrf } from "hono/csrf"
import { secureHeaders } from "hono/secure-headers"
import { crossOriginRequest } from "@/config/cors"
import { startDevServer } from "@/hono/server"
import type { ServerConfig } from "@/types"

const DEFAULT_CONFIG: Required<ServerConfig> = {
  port: serverEnv.PORT,
  hostname: serverEnv.HOST,
  trpcEndpoint: "/api/trpc/*",
  authEndpoint: "/api/auth/**",
}

const bootStrapLogger = Logger.createLogger({ prefix: "BootStrap" })

export function bootStrapServer(config: ServerConfig = {}) {
  const app = new Hono()
  const { trpcEndpoint, hostname, port } = {
    ...DEFAULT_CONFIG,
    ...config,
  }

  app.use(secureHeaders())
  app.use(crossOriginRequest)
  app.use(csrf())
  app.use(trpcEndpoint, trpcHonoMiddleware)
  // app.on(["POST", "GET"], authEndpoint, (c) => auth.handler(c.req.raw))

  startDevServer({
    port,
    hostname,
    fetch: app.fetch,
    logger: bootStrapLogger,
  })

  return app
}
