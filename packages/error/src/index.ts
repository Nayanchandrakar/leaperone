import type { Context } from "hono"
import { HTTPException } from "hono/http-exception"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import { ErrorCode } from "./error-codes"
import { HTTPSTATUS } from "./http-config"

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: ContentfulStatusCode,
    readonly code: ErrorCode,
    readonly details?: unknown | null,
  ) {
    super(message)
    this.name = "ApiError"
    Error.captureStackTrace?.(this, this.constructor)
  }

  toResponse(c: Context) {
    return c.json(
      {
        success: false,
        error: {
          status: this.status,
          code: this.code,
          message: this.message,
          name: this.name,
          ...(this.details !== undefined && { details: this.details }),
        },
      },
      this.status,
    )
  }

  static badRequest(message = "Bad request", details?: unknown): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.BAD_REQUEST,
      ErrorCode.BAD_REQUEST,
      details,
    )
  }

  static validationError(
    message = "Validation error",
    details?: unknown,
  ): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.UNPROCESSABLE_ENTITY,
      ErrorCode.VALIDATION_ERROR,
      details,
    )
  }

  static unauthorized(
    message = "Not authenticated",
    details?: unknown,
  ): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.UNAUTHORIZED,
      ErrorCode.UNAUTHORIZED,
      details,
    )
  }

  static forbidden(message = "Forbidden", details?: unknown): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.FORBIDDEN,
      ErrorCode.FORBIDDEN,
      details,
    )
  }

  static notFound(message = "Resource not found", details?: unknown): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.NOT_FOUND,
      ErrorCode.NOT_FOUND,
      details,
    )
  }

  static conflict(message = "Conflict", details?: unknown): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.CONFLICT,
      ErrorCode.CONFLICT,
      details,
    )
  }

  static tooManyRequests(
    message = "Too many requests",
    details?: unknown,
  ): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.TOO_MANY_REQUESTS,
      ErrorCode.TOO_MANY_REQUESTS,
      details,
    )
  }

  static internalServerError(
    message = "An unexpected error occurred",
    details?: unknown,
  ): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.INTERNAL_SERVER_ERROR,
      ErrorCode.INTERNAL_SERVER_ERROR,
      details,
    )
  }

  static fromError(error: unknown): ApiError {
    if (error instanceof HTTPException) {
      return new ApiError(
        "Http Exception Error",
        error.status,
        ErrorCode.INTERNAL_SERVER_ERROR,
        { cause: error.cause },
      )
    }

    if (error instanceof ApiError) {
      return error
    }

    if (error instanceof Error) {
      return new ApiError(
        error.message,
        HTTPSTATUS.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        { cause: error.cause },
      )
    }

    return new ApiError(
      "Internal Server Error",
      HTTPSTATUS.INTERNAL_SERVER_ERROR,
      ErrorCode.INTERNAL_SERVER_ERROR,
      { cause: String(error) },
    )
  }
}
