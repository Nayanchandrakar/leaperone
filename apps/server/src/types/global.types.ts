import type { Storage, User, Workspace } from "@app/database/types"
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

export type ImpersonationMetadata = {
  expiresAt: Date
  managerId: string
  managerToken: string
  managerEmail: string
  impersonatedAt: Date
}

export type HonoEnv = {
  Variables: {
    session: FullSession
    workspace: Workspace
    storage: Storage
  }
}

export type ActiveSession = {
  token: string
  expiresAt: number
}

export type FullSession = {
  user: User
  session: Session
  impersonatedBy?: ImpersonationMetadata
}

export type ControllerIO<T extends keyof ValidationTargets, Schema> = {
  in: { [k in T]: Schema }
  out: { [k in T]: Schema }
}

export type RouteParams = Record<string, string | number | boolean | undefined>
