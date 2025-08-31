import type { Context } from "hono"

export function getRequestIp(ctx: Context) {
  const bindings = ctx.env.server ? ctx.env.server : ctx.env
  const address = bindings.incoming.socket.remoteAddress

  const isDevelopment = true

  if (isDevelopment) {
    return "127.0.0.1"
  }

  return address
}
