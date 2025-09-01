import { SERVER_ENV } from "@app/env/server"
import { Logger } from "@app/logger"
import { trpcHonoMiddleware } from "@app/trpc/server"
import { Hono } from "hono"
import { csrf } from "hono/csrf"
import { secureHeaders } from "hono/secure-headers"
import { crossOriginRequest } from "@/config/cors"
import { startDevServer } from "@/hono/server"
import type { ServerConfig } from "@/types"

const DEFAULT_CONFIG: Required<ServerConfig> = {
  port: SERVER_ENV.PORT,
  trpcEndpoint: "/api/trpc/*",
}

const bootStrapLogger = Logger.createLogger({ prefix: "BootStrap" })

export function bootStrapServer(config: ServerConfig = {}) {
  const app = new Hono()
  const { trpcEndpoint, port } = {
    ...DEFAULT_CONFIG,
    ...config,
  }

  // app.use("*", async (c, next) => {
  //   const headers = c.req.raw.headers
  //   headers.set("x-forwarded-for", "127.0.0.1")
  //   await next()
  // })
  app.use(secureHeaders())
  app.use(crossOriginRequest)
  app.use(csrf())
  app.use(trpcEndpoint, trpcHonoMiddleware)

  startDevServer({
    port,
    fetch: app.fetch,
    logger: bootStrapLogger,
  })

  return app
}
