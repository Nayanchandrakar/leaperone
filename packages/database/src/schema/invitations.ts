import { createId } from "@paralleldrive/cuid2"
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { roles } from "./roles"
import { users } from "./users"
import { workspaces } from "./workspace"

export const invitations = pgTable("invitation", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text().notNull(),
  workspaceId: text()
    .references(() => workspaces.id, { onDelete: "cascade" })
    .notNull(),
  roleId: text()
    .references(() => roles.id)
    .notNull(),
  token: text().notNull(),
  pending: boolean().notNull().default(true),
  expired: boolean().notNull().default(false),
  invitedBy: text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp().notNull(),
  acceptedAt: timestamp(),
  ...timestamps,
})
