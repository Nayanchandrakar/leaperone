import type { AppRouter } from "@app/nrpc/index"
import type { InferRouterInputs, InferRouterOutputs } from "@app/nstack"

export type InferInput = InferRouterInputs<AppRouter>
export type InferOutput = InferRouterOutputs<AppRouter>
