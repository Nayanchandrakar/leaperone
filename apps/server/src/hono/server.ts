import { serve } from "@hono/node-server"
import type { Logger } from "@myleaper/lib/logger"
import type { Hono } from "hono"

type StartDevServerType = {
  port: number
  logger: Logger
  fetch: Hono["fetch"]
}

export function startDevServer({ port, fetch, logger }: StartDevServerType) {
  serve(
    {
      fetch,
      port,
    },
    (info) => {
      logger.info(`Server started on http://localhost:${info.port}`)
    },
  )
}
