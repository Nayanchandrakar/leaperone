import { createId } from "@paralleldrive/cuid2"
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { subscriptionPlan, subscriptionStatus } from "../constants/enums"
import { timestamps } from "../utils"
import { workspace } from "./workspace"

export const subscriptionStatusEnum = pgEnum(
  "subscription_status",
  subscriptionStatus,
)

export const subscriptionPlanEnum = pgEnum(
  "subscription_plan",
  subscriptionPlan,
)

export const subscription = pgTable("subscription", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  workspaceId: text()
    .unique()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),

  customerId: text().notNull().unique(),
  subscriptionId: text().notNull().unique(),

  plan: subscriptionPlanEnum().default("individual").notNull(),
  priceId: text().notNull(),

  status: subscriptionStatusEnum().notNull(),

  periodStart: timestamp().notNull(),
  periodEnd: timestamp().notNull(),

  trialStart: timestamp(),
  trialEnd: timestamp(),

  seats: integer().default(1).notNull(),
  cancelAtPeriodEnd: boolean().default(false).notNull(),

  ...timestamps,
})
