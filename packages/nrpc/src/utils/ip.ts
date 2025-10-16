import type { Context } from "hono"
import { isProduction } from "../config/env"

export function getRequestIp(c: Context) {
  const bindings = c?.env?.server ? c?.env?.server : c?.env
  let address = bindings?.incoming?.socket.remoteAddress

  if (!isProduction) {
    address = "127.0.0.1"
  }

  return address
}
