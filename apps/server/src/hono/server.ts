import { ENV } from "@app/env/server"
import { logger } from "@app/logger"
import { serve } from "@hono/node-server"
import type { Hono } from "hono"

export function startServer(fetch: Hono["fetch"]) {
  serve({ fetch, port: ENV.PORT }, (info) => {
    logger.info(`Server started on http://localhost:${info.port}`)
  })
}
