import type { Context } from "hono"
import type { ControllerIO } from "src/types"

export type StripeController = Context<{}, "/stripe", ControllerIO<"json", {}>>
