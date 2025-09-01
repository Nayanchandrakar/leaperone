import type { Env } from "hono/types"
import type { StatusCode } from "hono/utils/http-status"
import superjson from "superjson"
import type { ZodTypeAny, z } from "zod"

import type {
  ContextWithSuperJSON,
  GetOperation,
  MiddlewareFunction,
  PostOperation,
  ResponseType,
} from "./types"

type OptionalPromise<T> = T | Promise<T>

export class Procedure<
  E extends Env = any,
  Ctx = {},
  InputSchema extends ZodTypeAny | void = void,
  Incoming extends ZodTypeAny | void = void,
  Outgoing extends ZodTypeAny | void = void,
> {
  private readonly middlewares: MiddlewareFunction<Ctx, void, E>[] = []
  private readonly inputSchema?: InputSchema
  private readonly incomingSchema?: Incoming
  private readonly outgoingSchema?: Outgoing

  private superjsonMiddleware: MiddlewareFunction<Ctx, void, E> =
    async function superjsonMiddleware({ c, next }) {
      type JSONRespond = typeof c.json

      c.superjson = (<T>(data: T, status?: StatusCode): Response => {
        const serialized = superjson.stringify(data)

        return c.newResponse(serialized, status, {
          // @ts-expect-error
          ...Object.fromEntries(c.res.headers.entries()),
          "x-is-superjson": "true",
        })
      }) as JSONRespond

      return next()
    }

  constructor(
    middlewares: MiddlewareFunction<Ctx, void, E>[] = [],
    inputSchema?: InputSchema,
    incomingSchema?: Incoming,
    outgoingSchema?: Outgoing,
  ) {
    this.middlewares = middlewares
    this.inputSchema = inputSchema!
    this.incomingSchema = incomingSchema!
    this.outgoingSchema = outgoingSchema!

    if (!this.middlewares.some((mw) => mw.name === "superjsonMiddleware")) {
      this.middlewares.push(this.superjsonMiddleware)
    }
  }

  input<Schema extends z.ZodTypeAny>(schema: Schema) {
    return new Procedure<E, Ctx, Schema, Incoming, Outgoing>(
      this.middlewares,
      schema,
      this.incomingSchema,
      this.outgoingSchema,
    )
  }

  use<T, Return = void>(
    handler: MiddlewareFunction<Ctx, Return, E>,
  ): Procedure<E, Ctx & T & Return, InputSchema, Incoming, Outgoing> {
    return new Procedure<E, Ctx & T & Return, InputSchema, Incoming, Outgoing>(
      [...this.middlewares, handler as any],
      this.inputSchema,
      this.incomingSchema,
      this.outgoingSchema,
    )
  }

  get<Return extends OptionalPromise<ResponseType<any>>>(
    handler: ({
      ctx,
      c,
      input,
    }: {
      ctx: Ctx
      c: ContextWithSuperJSON<E>
      input: InputSchema extends ZodTypeAny ? z.infer<InputSchema> : void
    }) => Return,
  ): GetOperation<InputSchema, ReturnType<typeof handler>, E> {
    return {
      type: "get",
      schema: this.inputSchema as any,
      handler: handler as any,
      middlewares: this.middlewares,
    }
  }

  query<Return extends OptionalPromise<ResponseType<any>>>(
    handler: ({
      ctx,
      c,
      input,
    }: {
      ctx: Ctx
      c: ContextWithSuperJSON<E>
      input: InputSchema extends ZodTypeAny ? z.infer<InputSchema> : void
    }) => Return,
  ): GetOperation<InputSchema, Return, E> {
    return this.get(handler)
  }

  post<Return extends OptionalPromise<ResponseType<any>>>(
    handler: ({
      ctx,
      c,
      input,
    }: {
      ctx: Ctx
      c: ContextWithSuperJSON<E>
      input: InputSchema extends ZodTypeAny ? z.infer<InputSchema> : void
    }) => Return,
  ): PostOperation<InputSchema, ReturnType<typeof handler>, E> {
    return {
      type: "post",
      schema: this.inputSchema as any,
      handler: handler as any,
      middlewares: this.middlewares,
    }
  }

  mutation<Return extends OptionalPromise<ResponseType<any>>>(
    handler: ({
      ctx,
      c,
      input,
    }: {
      ctx: Ctx
      c: ContextWithSuperJSON<E>
      input: InputSchema extends ZodTypeAny ? z.infer<InputSchema> : void
    }) => Return,
  ): PostOperation<InputSchema, Return, E> {
    return this.post(handler)
  }
}
