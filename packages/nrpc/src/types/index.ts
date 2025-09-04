import type { User } from "@app/database/types"
import type { ValidationTargets } from "hono"

export type Session = {
  token: string
  userId: string
  ipAddress: string | undefined
  userAgent: string | undefined
  createdAt: Date
  updatedAt: Date
  expiresAt: Date
}

export type ActiveSession = {
  token: string
  expiresAt: number
}

export type FullSession = {
  session: Session
  user: User
}

export type ControllerIO<T extends keyof ValidationTargets, Schema> = {
  in: {
    [k in T]: Schema
  }

  out: {
    [k in T]: Schema
  }
}

export type RouteParams = Record<string, string | number | boolean | undefined>
