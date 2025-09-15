import type { Context } from "hono"
import { isDevelopment } from "../constants/runtime"

export function getRequestIp(c: Context) {
  const bindings = c.env.server ? c.env.server : c.env
  let address = bindings.incoming.socket.remoteAddress

  if (isDevelopment) {
    address = "127.0.0.1"
  }

  return address
}
