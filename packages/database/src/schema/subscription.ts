import { createId } from "@paralleldrive/cuid2"
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { workspace } from "./workspace"

export const subscription = pgTable("subscription", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  workspaceId: text().references(() => workspace.id, { onDelete: "cascade" }),

  customerId: text().notNull(),
  subscriptionId: text().notNull(),

  planId: text().notNull(),

  status: text().notNull(),

  periodStart: timestamp().notNull(),
  periodEnd: timestamp().notNull(),

  trialStart: timestamp(),
  trialEnd: timestamp(),

  seats: integer().default(1).notNull(),
  ...timestamps,
})
