import pino from "pino"
import pretty from "pino-pretty"

class Logger {
  private static instance: Logger
  private pino: pino.Logger

  private constructor() {
    const isDev = process?.env?.NODE_ENV === "development"
    const level = process?.env?.LOG_LEVEL ?? "info"

    this.pino = pino(
      {
        level,
        name: "Server",
      },
      isDev
        ? pretty({
            colorize: true,
            levelFirst: true,
            singleLine: false,
            colorizeObjects: true,
            ignore: "pid,hostname",
            translateTime: "HH:MM:ss",
          })
        : undefined,
    )
  }

  static init() {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  info(msg: string, context?: Record<string, unknown>) {
    this.pino.info(context, msg)
  }

  warn(msg: string, context?: Record<string, unknown>) {
    this.pino.warn(context, msg)
  }

  error(msg: string, context?: Record<string, unknown>) {
    this.pino.error(context, msg)
  }

  debug(msg: string, context?: Record<string, unknown>) {
    this.pino.debug(context, msg)
  }

  fatal(msg: string, context?: Record<string, unknown>) {
    this.pino.fatal(context, msg)
  }

  child(bindings: Record<string, unknown>) {
    return this.pino.child(bindings)
  }
}

export const logger = Logger.init()
