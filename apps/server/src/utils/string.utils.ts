import type { Context } from "hono"
import { isProduction } from "@/config/env"

export class StringUtils {
  private constructor() {}

  static getRootDomain(url: string) {
    const { hostname } = new URL(url)
    const parts = hostname.split(".")

    if (parts.length < 2) return null
    const multiLevelTlds = new Set(["co.in", "com.au", "co.uk", "org.in", "net.in"])

    if (parts.length >= 3 && multiLevelTlds.has(parts.slice(-2).join("."))) {
      return `.${parts.slice(-3).join(".")}`
    }

    return `.${parts.slice(-2).join(".")}`
  }

  static getRequestIp(c: Context) {
    const bindings = c?.env?.server ? c?.env?.server : c?.env
    let address = bindings?.incoming?.socket.remoteAddress

    if (!isProduction) {
      address = "127.0.0.1"
    }

    return address
  }
}
