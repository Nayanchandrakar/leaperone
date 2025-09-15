import { logger as pino } from "@app/logger/index"
import type { Context, Next } from "hono"
import { formatTime } from "@/utils"

export function logger() {
  return async (c: Context, next: Next) => {
    const { method, path } = c.req

    pino.info(`Incoming: ${method} ${path}`)

    const start = performance.now()
    await next()
    const status = c.res.status ?? 0
    const end = performance.now()

    pino.info(
      `Outgoing: ${method} ${path} ${status} ${formatTime(end - start)}`,
    )
  }
}
