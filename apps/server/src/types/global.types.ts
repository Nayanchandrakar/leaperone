import type { Storage, Workspace } from "@app/database/types"
import type { FullSession, SubscriptionActive } from "@app/types"
import type { ValidationTargets } from "hono"

export type HonoEnv = {
  Variables: {
    subscription: SubscriptionActive
    session: FullSession
    workspace: Workspace
    storage: Storage
  }
}

export type ControllerIO<T extends keyof ValidationTargets, Schema> = {
  in: { [k in T]: Schema }
  out: { [k in T]: Schema }
}

export type RouteParams = Record<string, string | number | boolean | undefined>
