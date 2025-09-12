import type { Casing } from "drizzle-orm"
import type { CacheConfig } from "drizzle-orm/cache/core/types"
import type { NeonHttpDatabase } from "drizzle-orm/neon-http"
import type { NeonDatabase } from "drizzle-orm/neon-serverless"
import type {
  invitationStatus,
  subscriptionPlan,
  subscriptionStatus,
} from "../constants/enums"
import type { PERMISSIONS } from "../constants/permissions"
import type { accounts, subscription, verification } from "../schema/index"
import type { users } from "../schema/users"

export type HttpConnectionType = NeonHttpDatabase
export type WsConnectionType = NeonDatabase

export type ConfigOptions = {
  connectionString: string
  case: Casing
  cacheConfig: {
    url: string
    token: string
    config?: CacheConfig
    global?: boolean
  }
}

export type User = typeof users.$inferSelect
export type Account = typeof accounts.$inferSelect
export type Verification = typeof verification.$inferSelect

// Insert types
export type InsertUser = typeof users.$inferInsert
export type InsertSubscription = typeof subscription.$inferInsert

// Enum types
export type SubscriptionPlan = (typeof subscriptionPlan)[number]
export type InvitationStatus = (typeof invitationStatus)[number]
export type SubscriptionStatus = (typeof subscriptionStatus)[number]

// Constants
export type Permissions = keyof typeof PERMISSIONS
export type PermissionType = (typeof PERMISSIONS)[Permissions]
