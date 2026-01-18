import { createId } from "@paralleldrive/cuid2"
import { boolean, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"

export const users = pgTable("user", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  image: text(),
  jobRole: text(),
  name: text().notNull(),
  stripeCustomerId: text(),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  isRestricted: boolean().default(false).notNull(),
  emailVerified: boolean().notNull().default(false),
  ...timestamps,
})
