import type { ValidationTargets } from "hono"

export type ControllerIO<T extends keyof ValidationTargets, Schema> = {
  in: {
    [k in T]: Schema
  }

  out: {
    [k in T]: Schema
  }
}

export type RouteParams = Record<string, string | number | boolean | undefined>
