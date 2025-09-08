import { createId } from "@paralleldrive/cuid2"
import { pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"

export const roles = pgTable("roles", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull().unique(),
  description: text().notNull(),
  ...timestamps,
})
