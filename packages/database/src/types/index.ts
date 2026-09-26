import type { Casing } from "drizzle-orm"
import type { CacheConfig } from "drizzle-orm/cache/core/types"
import type { NeonDatabase } from "drizzle-orm/neon-serverless"
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core"
import type {
  businessCardStatus,
  invitationStatus,
  subscriptionPlan,
  subscriptionStatus,
} from "../constants/enums"
import type { PERMISSIONS } from "../constants/permissions"
import type { DEFAULT_ROLES } from "../constants/roles"
import type {
  accounts,
  analytics,
  file,
  invitations,
  storage,
  subscription,
  users,
  verification,
  workspace,
  workspaceMembers,
} from "../schema"
import type { businessCard } from "../schema/business-card"
import type { contactUs } from "../schema/contact-us"
import type { support } from "../schema/support"
import type { workspaceSettings } from "../schema/workspace-settings"

export type DatabaseClientWs = NeonDatabase
export type DatabaseClient = PgDatabase<PgQueryResultHKT, Record<string, never>>

export type DatabaseConfig = {
  connectionString: string
  case: Casing
  cacheConfig: {
    url: string
    token: string
    config?: CacheConfig
    global?: boolean
  }
}

// Select types
export type User = typeof users.$inferSelect
export type Account = typeof accounts.$inferSelect
export type Verification = typeof verification.$inferSelect
export type Workspace = typeof workspace.$inferSelect
export type Subscription = typeof subscription.$inferSelect
export type File = typeof file.$inferSelect
export type Storage = typeof storage.$inferSelect
export type Analytics = typeof analytics.$inferSelect
export type WorkspaceMember = typeof workspaceMembers.$inferSelect
export type BusinessCard = typeof businessCard.$inferSelect
export type WorkspaceSettings = typeof workspaceSettings.$inferSelect

// Insert types
export type InsertAnalytics = typeof analytics.$inferInsert
export type InsertUser = typeof users.$inferInsert
export type InsertSubscription = typeof subscription.$inferInsert
export type InsertFile = typeof file.$inferInsert
export type InsertContactUs = typeof contactUs.$inferInsert
export type InsertSupport = typeof support.$inferInsert
export type InsertInvitation = typeof invitations.$inferInsert
export type InsertWorkspace = typeof workspace.$inferInsert
export type InsertBusinessCard = typeof businessCard.$inferInsert
export type InsertWorkspaceSettings = typeof workspaceSettings.$inferInsert

// Enum types
export type SubscriptionPlan = (typeof subscriptionPlan)[number]
export type InvitationStatus = (typeof invitationStatus)[number]
export type SubscriptionStatus = (typeof subscriptionStatus)[number]
export type BusinessCardStatus = (typeof businessCardStatus)[number]

// Constants
export type Permissions = keyof typeof PERMISSIONS
export type PermissionType = (typeof PERMISSIONS)[Permissions]
export type RoleType = (typeof DEFAULT_ROLES)[number]["name"]

// Types
export type CreateUser = InsertUser & {
  password: string
  defaultRole: RoleType
}

export type GetFilesByUserIdAndWorkspaceId = {
  offset: number
  sortBy: string
  types: string[]
  pageSize: number
  uploadedBy: string
  workspaceId: string
  searchQuery?: string | undefined
}

export type CreateWorkspaceInviteAndUser = Omit<InsertInvitation, "roleId" | "userId"> & {
  name: string
  email: string
  jobRole: string
  username: string
}

export type AcceptInvitation = {
  userId: string
  acceptedAt: Date
  invitationId: string
  hashedPassword: string
  status: InvitationStatus
}
