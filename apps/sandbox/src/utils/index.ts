import { ApiError } from "@app/error"
import type { Context } from "hono"
import type { HTTPResponseError } from "hono/types"

export const ErrorHandler = (err: Error | HTTPResponseError, c: Context) => {
  const apiError = ApiError.fromError(err)
  return apiError.toResponse(c)
}
