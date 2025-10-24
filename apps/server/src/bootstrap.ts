import { ENV } from "@app/env/server"
import { logger } from "@app/logger"
import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { secureHeaders } from "hono/secure-headers"
import { corsConfig } from "@/config/cors"
import { csrfConfig } from "@/config/csrf"
import type { HttpController } from "@/features/shared/controllers/http.controller"
import { errorMiddleware } from "@/middlewares/error.middleware"
import { requestLogger } from "@/middlewares/logger.middleware"

export class BootStrap {
  private server: Hono

  constructor(httpControllers: HttpController[]) {
    this.server = new Hono().basePath("/api")
    this.intializeMiddlewares()
    this.initializeControllers(httpControllers)
    this.server.onError(errorMiddleware)
  }

  private intializeMiddlewares() {
    this.server.use(requestLogger())
    this.server.use(secureHeaders())
    this.server.use(corsConfig)
    this.server.use(csrfConfig)
  }

  private initializeControllers(httpControllers: HttpController[]) {
    httpControllers.forEach((controller) => {
      this.server.route(controller.path, controller.router)
    })
  }

  listen() {
    serve({ fetch: this.server.fetch, port: ENV.PORT }, (info) => {
      logger.info(`Server listening at: http://localhost:${info.port}`)
    })
  }

  get instance() {
    return this.server
  }
}
