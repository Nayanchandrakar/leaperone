import type { Context } from "hono"
import { ErrorCode } from "./error-codes"
import { HTTPSTATUS, type HttpStatusCode } from "./http-config"

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: HttpStatusCode,
    public readonly code: ErrorCode,
    public readonly details?: unknown | null,
  ) {
    super(message)
    this.name = "ApiError"
    Error.captureStackTrace?.(this, this.constructor)
  }

  public toResponse(c: Context) {
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

  public static badRequest(
    message = "Bad request",
    details?: unknown,
  ): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.BAD_REQUEST,
      ErrorCode.BAD_REQUEST,
      details,
    )
  }

  public static unauthorized(
    message = "Unauthorized",
    details?: unknown,
  ): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.UNAUTHORIZED,
      ErrorCode.UNAUTHORIZED,
      details,
    )
  }

  public static forbidden(message = "Forbidden", details?: unknown): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.FORBIDDEN,
      ErrorCode.FORBIDDEN,
      details,
    )
  }

  public static notFound(
    message = "Resource not found",
    details?: unknown,
  ): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.NOT_FOUND,
      ErrorCode.NOT_FOUND,
      details,
    )
  }

  public static conflict(message = "Conflict", details?: unknown): ApiError {
    return new ApiError(
      message,
      HTTPSTATUS.CONFLICT,
      ErrorCode.CONFLICT,
      details,
    )
  }

  public static tooManyRequests(
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

  public static internalServerError(
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

  public static fromError(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error
    }

    if (error instanceof Error) {
      return new ApiError(
        error.message,
        HTTPSTATUS.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        { stack: error.stack },
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
