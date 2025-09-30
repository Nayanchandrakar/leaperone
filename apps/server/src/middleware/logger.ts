import { logger as pino } from "@app/logger"
import type { Context, Next } from "hono"
import { colorizeStatus, formatTime } from "@/utils"

export function logger() {
  return async (c: Context, next: Next) => {
    const { method, path } = c.req
    pino.info(`[${method}] ${path} ← incoming`)

    const start = performance.now()
    await next()
    const status = c.res.status ?? 0
    const duration = formatTime(performance.now() - start)

    const msg = `[${method}] ${path} → ${colorizeStatus(status)} in ${duration}`

    if (status >= 500) {
      pino.error(msg)
    } else if (status >= 400) {
      pino.warn(msg)
    } else {
      pino.info(msg)
    }
  }
}
