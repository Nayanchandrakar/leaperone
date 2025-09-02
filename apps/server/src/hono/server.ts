import { SERVER_ENV } from "@app/env/server"
import { serve } from "@hono/node-server"
import type { Hono } from "hono"

export function startServer(fetch: Hono["fetch"]) {
  serve({ fetch, port: SERVER_ENV.PORT }, (info) => {
    console.log(`Server started on http://localhost:${info.port}`)
  })
}
