import type { ContentfulStatusCode } from "hono/utils/http-status"

const httpConfig = () =>
  ({
    // Success responses
    OK: 200 as ContentfulStatusCode,
    CREATED: 201 as ContentfulStatusCode,
    ACCEPTED: 202 as ContentfulStatusCode,
    NO_CONTENT: 204 as ContentfulStatusCode,

    // Client error responses
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,

    // Server error responses
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  }) satisfies Record<string, ContentfulStatusCode>

export const HTTPSTATUS = httpConfig()

export type HttpStatusCode = (typeof HTTPSTATUS)[keyof typeof HTTPSTATUS]
