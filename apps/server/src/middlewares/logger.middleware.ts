import { logger } from "@app/logger"
import type { Context, Next } from "hono"
import { SystemFormatter } from "@/utils/format.utils"

export const requestLogger = () => {
  return async (c: Context, next: Next) => {
    const { method, path } = c.req

    const start = process.hrtime.bigint()
    await next()
    const duration = process.hrtime.bigint() - start

    const status = c.res.status
    const durationMs = SystemFormatter.formatTime(duration)
    const msg = `${method} ${path} | Status: ${status} | Duration: ${durationMs}`

    if (status >= 500) {
      logger.error(msg)
    } else if (status >= 400) {
      logger.warn(msg)
    } else {
      logger.info(msg)
    }
  }
}
