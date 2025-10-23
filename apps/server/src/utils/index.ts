import { ApiError } from "@app/error"
import type { Context } from "hono"
import type { HTTPResponseError } from "hono/types"

export const ErrorHandler = (err: Error | HTTPResponseError, c: Context) => {
  const apiError = ApiError.fromError(err)
  return apiError.toResponse(c)
}

export function formatTime(time: number) {
  return time < 1000 ? `${Math.round(time)}ms` : `${Math.round(time / 10) / 100}s`
}

export function colorizeStatus(status: number): string {
  if (status >= 500) return `\x1b[31m${status}\x1b[0m`
  if (status >= 400) return `\x1b[33m${status}\x1b[0m`
  if (status >= 300) return `\x1b[36m${status}\x1b[0m`
  if (status >= 200) return `\x1b[32m${status}\x1b[0m`
  return status.toString()
}
