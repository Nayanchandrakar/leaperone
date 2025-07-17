import { serve } from "@hono/node-server"
import type { Logger } from "@leapercrm/logger"
import type { Hono } from "hono"

type StartDevServerType = {
  port: number
  hostname: string
  logger: Logger
  fetch: Hono["fetch"]
}

export function startDevServer({
  hostname,
  port,
  fetch,
  logger,
}: StartDevServerType) {
  serve(
    {
      fetch,
      hostname,
      port,
    },
    (info) => {
      logger.info(`Server started on http://${hostname}:${info.port}`)
    },
  )
}
