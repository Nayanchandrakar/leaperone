import { ENV } from "@app/env/server"
import type { RouteParams } from "@/types/global.types"

export class RouteUtils {
  private constructor() {}

  static createRoute<T extends RouteParams>(basePath: string, params?: T, isServer = true) {
    const base = isServer ? ENV.SERVER_URL : ENV.FRONTEND_URL
    const endpoint = new URL(basePath, base)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          endpoint.searchParams.append(key, String(value))
        }
      })
    }

    return endpoint
  }

  static createAbsoluteRoute(path: `/${string}`) {
    return ENV.FRONTEND_URL + path
  }
}
