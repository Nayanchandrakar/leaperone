import { createId } from "@paralleldrive/cuid2"
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { businessCard } from "./business-card"
import { users } from "./users"
import { workspace } from "./workspace"

export const analytics = pgTable("analytics", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),

  userId: text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),

  businessCardId: text()
    .references(() => businessCard.id, { onDelete: "cascade" })
    .notNull(),

  // Network
  ip: text(),
  isBot: boolean(),

  // Device information
  device: text(),
  deviceVendor: text(),
  deviceModel: text(),

  // Location information
  continent: text(),
  country: text(),
  region: text(),
  city: text(),
  latitude: text(),
  longitude: text(),

  // Browser information
  browser: text(),
  browserVersion: text(),
  engine: text(),
  engineVersion: text(),

  // Operating system
  os: text(),
  osVersion: text(),
  cpuArchitecture: text(),

  // Raw user agent
  ua: text(),

  // Timestamp
  clickedAt: timestamp().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})
