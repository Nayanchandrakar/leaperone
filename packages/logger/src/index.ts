import pino from "pino"
import pretty from "pino-pretty"

class Logger {
  private static instance: Logger | null = null
  private pino: pino.Logger

  private constructor() {
    const isDev = process.env.NODE_ENV === "development"

    const stream = isDev
      ? pretty({
          colorize: true,
          levelFirst: true,
          colorizeObjects: true,
          ignore: "pid,hostname",
          translateTime: "yyyy-MM-dd HH:mm:ss",
        })
      : undefined

    this.pino = pino(
      {
        name: "Server",
        level: process.env.LOG_LEVEL ?? "info",
      },
      stream,
    )
  }

  static init() {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  getLogger() {
    return this.pino
  }
}

export const logger = Logger.init().getLogger()
