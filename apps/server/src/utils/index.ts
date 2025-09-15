import { ApiError } from "@app/error/index"
import type { Context } from "hono"
import type { HTTPResponseError } from "hono/types"

export const ErrorHandler = (err: Error | HTTPResponseError, c: Context) => {
  const apiError = ApiError.fromError(err)
  return apiError.toResponse(c)
}

export function formatTime(time: number) {
  return time < 1000
    ? `${Math.round(time)}ms`
    : `${Math.round(time / 10) / 100}s`
}
