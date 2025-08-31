import { initTRPC } from "@trpc/server"
import type { Context } from "hono"
import { SuperJSON } from "superjson"

const t = initTRPC
  .context<{ hono: Context }>()
  .create({ transformer: SuperJSON })

export const createTRPCRouter = t.router
export const baseProcedure = t.procedure
