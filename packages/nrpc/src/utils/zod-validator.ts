import { ApiError } from "@app/error/index"
import { zValidator as zv } from "@hono/zod-validator"
import type { ValidationTargets } from "hono"
import type { ZodType } from "zod"

export function zValidator<
  T extends ZodType,
  Target extends keyof ValidationTargets,
>(target: Target, schema: T) {
  return zv(target, schema, (result) => {
    if (!result.success) {
      const errorMessages = result.error.issues.map((i) => i.message)
      const message = errorMessages.join(". ")
      throw ApiError.validationError(
        message,
        result.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      )
    }
  })
}
