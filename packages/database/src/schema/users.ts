import { createId } from "@paralleldrive/cuid2"
import { boolean, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"

export const users = pgTable("user", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  jobRole: text(),

  image: text(),
  name: text().notNull(),
  email: text().notNull().unique(),
  isRestricted: boolean().default(false).notNull(),
  emailVerified: boolean().default(false).notNull(),
  stripeCustomerId: text(),
  username: text().notNull().unique(),
  ...timestamps,
})
