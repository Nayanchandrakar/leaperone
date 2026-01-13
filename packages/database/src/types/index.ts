import type { Casing } from "drizzle-orm"
import type { CacheConfig } from "drizzle-orm/cache/core/types"
import type { NeonHttpDatabase } from "drizzle-orm/neon-http"
import type { NeonDatabase } from "drizzle-orm/neon-serverless"
import type { invitationStatus, subscriptionPlan, subscriptionStatus } from "../constants/enums"
import type { PERMISSIONS } from "../constants/permissions"
import type { DEFAULT_ROLES } from "../constants/roles"
import type { contactUs } from "../schema/contact-us"
import type {
  accounts,
  file,
  invitations,
  storage,
  subscription,
  verification,
  workspace,
  workspaceMembers,
} from "../schema/index"
import type { support } from "../schema/support"
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

// Select types
export type User = typeof users.$inferSelect
export type Account = typeof accounts.$inferSelect
export type Verification = typeof verification.$inferSelect
export type Workspace = typeof workspace.$inferSelect
export type Subscription = typeof subscription.$inferSelect
export type File = typeof file.$inferSelect
export type Storage = typeof storage.$inferSelect
export type WorkspaceMember = typeof workspaceMembers.$inferSelect

// Insert types
export type InsertUser = typeof users.$inferInsert
export type InsertSubscription = typeof subscription.$inferInsert
export type InsertFile = typeof file.$inferInsert
export type InsertContactUs = typeof contactUs.$inferInsert
export type InsertSupport = typeof support.$inferInsert
export type InsertInvitation = typeof invitations.$inferInsert

// Enum types
export type SubscriptionPlan = (typeof subscriptionPlan)[number]
export type InvitationStatus = (typeof invitationStatus)[number]
export type SubscriptionStatus = (typeof subscriptionStatus)[number]

// Constants
export type Permissions = keyof typeof PERMISSIONS
export type PermissionType = (typeof PERMISSIONS)[Permissions]
export type RoleType = (typeof DEFAULT_ROLES)[number]["name"]

// Types
export type BootStrapUser = InsertUser & {
  password: string
  defaultRole: RoleType
}

export type GetFilesByStorageId = {
  offset: number
  sortBy: string
  types: string[]
  pageSize: number
  storageId: string
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

export type ImpersonationMetadata = {
  expiresAt: Date
  managerId: string
  managerToken: string
  managerEmail: string
  impersonatedAt: Date
}

export type SessionWithImpersonation = {
  impersonatedBy?: ImpersonationMetadata
}
