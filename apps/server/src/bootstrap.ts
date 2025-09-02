import router from "@app/nrpc"
import { Hono } from "hono"
import { csrf } from "hono/csrf"
import { logger } from "hono/logger"
import { secureHeaders } from "hono/secure-headers"
import { crossOriginRequest } from "@/config/cors"
import { startServer } from "@/hono/server"

export function bootStrapServer() {
  const server = new Hono()

  server.use(logger())
  server.use(secureHeaders())
  server.use(crossOriginRequest)
  server.use(csrf())
  server.route("/", router)

  startServer(server.fetch)
}
