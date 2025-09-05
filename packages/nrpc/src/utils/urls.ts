import { SERVER_ENV } from "@app/env/server"
import type { RouteParams } from "../types"

/**
 * Creates a URL object with optional query parameters.
 * @param basePath - The base path of the route (e.g., `/auth/login`).
 * @param params - Optional query parameters to append as key/value pairs.
 * @returns A `URL` object representing the constructed route.
 */
export function createRoute<T extends RouteParams>(
  basePath: string,
  params?: T,
): URL {
  const base = new URL(basePath, SERVER_ENV.SERVER_URL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        base.searchParams.append(key, String(value))
      }
    })
  }

  return base
}
