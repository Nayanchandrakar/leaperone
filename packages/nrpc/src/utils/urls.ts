import { ENV } from "@app/env/server"
import type { RouteParams } from "../types"

/**
 * Creates a URL object with optional query parameters.
 * @param basePath - The base path of the route (e.g., `/auth/login`).
 * @param params - Optional query parameters to append as key/value pairs.
 * @param isServer - Whether to use the server base URL (`ENV.SERVER_URL`) or
 * the frontend base URL (`ENV.FRONTEND_URL`). Defaults to `true`.
 * @returns A `URL` object representing the constructed route.
 */
export function createRoute<T extends RouteParams>(
  basePath: string,
  params?: T,
  isServer = true,
): URL {
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

export function createAbsoluteRoute(path: `/${string}`) {
  return ENV.FRONTEND_URL + path
}
