import router from "@app/nrpc"
import { Hono } from "hono"
import { secureHeaders } from "hono/secure-headers"
import { crossOriginRequest, csrfProtection } from "@/config"
import { startServer } from "@/hono/server"
import { logger } from "@/middleware/logger"
import { ErrorHandler } from "@/utils"

export function bootStrapServer() {
  const server = new Hono()

  server.use(logger())
  server.use(secureHeaders())
  server.use(crossOriginRequest)
  server.use(csrfProtection)
  server.route("/", router)
  server.onError(ErrorHandler)

  startServer(server.fetch)
}
