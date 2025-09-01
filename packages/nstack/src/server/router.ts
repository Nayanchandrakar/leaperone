import { type Context, Hono, type Next } from "hono"

import type { Env, ErrorHandler, MiddlewareHandler } from "hono/types"
import type { StatusCode } from "hono/utils/http-status"
import { bodyParsingMiddleware, queryParsingMiddleware } from "./middleware"
import type {
  ContextWithSuperJSON,
  GetOperation,
  InferInput,
  OperationType,
  PostOperation,
  RouterConfig,
} from "./types"

type FlattenRoutes<T> = {
  [K in keyof T]: T[K] extends GetOperation<any, any>
    ? { [P in `${string & K}`]: T[K] }
    : T[K] extends PostOperation<any, any>
      ? { [P in `${string & K}`]: T[K] }
      : T[K] extends Record<string, any>
        ? {
            [SubKey in keyof T[K] as `${string & K}/${string & SubKey}`]: T[K][SubKey] extends
              | GetOperation<any, any>
              | PostOperation<any, any>
              ? T[K][SubKey]
              : never
          }
        : never
}[keyof T]

export type MergeRoutes<T> = {
  [K in keyof FlattenRoutes<T>]: FlattenRoutes<T>[K]
}

export type RouterSchema<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends GetOperation<any, any>
    ? {
        $get: {
          input: InferInput<T[K]>
          output: ReturnType<T[K]["handler"]>
          outputFormat: "json"
          status: StatusCode
        }
      }
    : T[K] extends PostOperation<any, any>
      ? {
          $post: {
            input: InferInput<T[K]>
            output: ReturnType<T[K]["handler"]>
            outputFormat: "json"
            status: StatusCode
          }
        }
      : never
}

export type OperationSchema<T> = T extends GetOperation<any, any>
  ? {
      $get: {
        input: InferInput<T>
        output: ReturnType<T["handler"]>
        outputFormat: "json"
        status: StatusCode
      }
    }
  : T extends PostOperation<any, any>
    ? {
        $post: {
          input: InferInput<T>
          output: ReturnType<T["handler"]>
          outputFormat: "json"
          status: StatusCode
        }
      }
    : never

interface InternalContext {
  __middleware_output?: Record<string, unknown>
  __parsed_query?: Record<string, unknown>
  __parsed_body?: Record<string, unknown>
}

export class Router<
  T extends Record<string, OperationType<any, any> | Record<string, any>> = {},
  E extends Env = any,
> extends Hono<E, RouterSchema<MergeRoutes<T>>, any> {
  _metadata: {
    subRouters: Record<string, Promise<Router<any>> | Router<any>>
    config: RouterConfig | Record<string, RouterConfig>
    procedures: Record<string, Record<string, { type: "get" | "post" }>>
    registeredPaths: string[]
  }

  _errorHandler: undefined | ErrorHandler<any> = undefined

  config(config?: RouterConfig) {
    if (config) {
      this._metadata.config = config
    }

    return this
  }

  // Used in Hono adapters
  // Strips types to prevent version-mismatch induced infinite recursion warning
  get handler() {
    return this as any
  }

  constructor(procedures: T = {} as T) {
    super()

    this._metadata = {
      subRouters: {},
      config: {},
      procedures: {},
      registeredPaths: [],
    }

    this.onError = (handler: ErrorHandler<any>) => {
      this._errorHandler = handler
      return this
    }

    this.setupRoutes(procedures)
  }

  registerSubrouterMiddleware() {
    this.use(async (c, next) => {
      const [basePath, routerName] = c.req.path
        .split("/")
        .filter(Boolean)
        .slice(0, 2)

      const key = `/${basePath}/${routerName}`
      const subRouter = await this._metadata.subRouters[key]

      if (subRouter) {
        const rewrittenPath = `/${c.req.path.split("/").slice(3).join("/")}`
        const newUrl = new URL(c.req.url)
        newUrl.pathname = rewrittenPath

        const newRequest = new Request(newUrl, c.req.raw)
        const response = await subRouter.fetch(newRequest, c.env)

        return response
      }

      return next()
    })
  }

  private setupRoutes(procedures: Record<string, any>) {
    Object.entries(procedures).forEach(([key, value]) => {
      if (this.isOperationType(value)) {
        this.registerOperation(key, value)
      } else if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (this.isOperationType(subValue)) {
            this.registerOperation(`${key}/${subKey}`, subValue)
          }
        })
      }
    })
  }

  private isOperationType(value: any): value is OperationType<any, any, any> {
    return (
      value &&
      typeof value === "object" &&
      "type" in value &&
      (value.type === "get" || value.type === "post")
    )
  }

  private registerOperation(
    path: string,
    operation: OperationType<any, any, E>,
  ) {
    const routePath = `/${path}` as const

    if (!this._metadata.procedures[path]) {
      this._metadata.procedures[path] = {
        type: operation.type as any,
      }
    }

    const operationMiddlewares: MiddlewareHandler<E>[] =
      operation.middlewares.map((middleware) => {
        const middlewareHandler = async (c: Context<E>, next: Next) => {
          const typedC = c as ContextWithSuperJSON<
            E & { Variables: InternalContext }
          >
          const middlewareOutput = typedC.get("__middleware_output") ?? {}

          const nextWrapper = async <B>(args: B) => {
            Object.assign(middlewareOutput, args)
            return middlewareOutput
          }

          const res = await middleware({
            ctx: middlewareOutput,
            next: nextWrapper,
            c: c as ContextWithSuperJSON<E>,
          })

          if (res) {
            Object.assign(middlewareOutput, res)
          }

          typedC.set("__middleware_output", middlewareOutput)
          await next()
        }

        return middlewareHandler
      })

    if (operation.type === "get") {
      if (operation.schema) {
        this.get(
          routePath,
          queryParsingMiddleware,
          ...operationMiddlewares,
          async (c) => {
            const typedC = c as Context<E & { Variables: InternalContext }>
            const ctx = typedC.get("__middleware_output") || {}
            const parsedQuery = typedC.get("__parsed_query")

            const queryInput =
              Object.keys(parsedQuery || {}).length === 0
                ? undefined
                : parsedQuery

            // caught at app-level with .onError
            const input = operation.schema?.parse(queryInput)
            const result = await operation.handler({
              c: c as ContextWithSuperJSON<E>,
              ctx,
              input,
            })

            return result === undefined ? c.json(undefined) : result
          },
        )
      } else {
        this.get(routePath, ...operationMiddlewares, async (c) => {
          const typedC = c as Context<E & { Variables: InternalContext }>
          const ctx = typedC.get("__middleware_output") || {}

          const result = await operation.handler({
            c: c as ContextWithSuperJSON<E>,
            ctx,
            input: undefined,
          })
          return result === undefined ? c.json(undefined) : result
        })
      }
    } else if (operation.type === "post") {
      if (operation.schema) {
        this.post(
          routePath,
          bodyParsingMiddleware,
          ...operationMiddlewares,
          async (c) => {
            const typedC = c as Context<E & { Variables: InternalContext }>
            const ctx = typedC.get("__middleware_output") || {}
            const parsedBody = typedC.get("__parsed_body")

            const bodyInput =
              Object.keys(parsedBody || {}).length === 0
                ? undefined
                : parsedBody

            // caught at app-level with .onError
            const input = operation.schema?.parse(bodyInput)

            const result = await operation.handler({
              c: c as ContextWithSuperJSON<E>,
              ctx,
              input,
            })

            return result === undefined ? c.json(undefined) : result
          },
        )
      } else {
        this.post(routePath, ...operationMiddlewares, async (c) => {
          const typedC = c as Context<E & { Variables: InternalContext }>
          const ctx = typedC.get("__middleware_output") || {}

          const result = await operation.handler({
            c: c as ContextWithSuperJSON<E>,
            ctx,
            input: undefined,
          })
          return result === undefined ? c.json(undefined) : result
        })
      }
    }
  }
}
