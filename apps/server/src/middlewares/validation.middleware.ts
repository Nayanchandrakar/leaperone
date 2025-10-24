import { ApiError } from "@app/error"
import type { ValidationTargets } from "hono"
import { validator } from "hono/validator"
import type { ZodType } from "zod"

export function zodValidator<T extends ZodType, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T,
) {
  return validator(target, (value) => {
    const result = schema.safeParse(value)
    if (result.success) return result.data

    const errorStrings = result.error.issues.map((i) => i.message)
    const message = errorStrings.join(". ")

    throw ApiError.validationError(
      message,
      result.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
    )
  })
}
