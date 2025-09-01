import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"

export const verification = pgTable("verification", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  ...timestamps,
})
