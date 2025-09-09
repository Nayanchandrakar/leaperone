import { createId } from "@paralleldrive/cuid2"
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { invitationStatus } from "src/constants"
import { timestamps } from "../utils"
import { roles } from "./roles"
import { users } from "./users"
import { workspace } from "./workspace"

export const invitationStatusEnum = pgEnum(
  "invitation_status",
  invitationStatus,
)

export const invitations = pgTable("invitation", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),
  inviterId: text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  roleId: text()
    .references(() => roles.id)
    .notNull(),

  status: invitationStatusEnum().default("pending").notNull(),
  email: text().notNull(),

  acceptedAt: timestamp(),
  expiresAt: timestamp().notNull(),
  ...timestamps,
})
