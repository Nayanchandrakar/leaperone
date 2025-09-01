import { createId } from "@paralleldrive/cuid2"
import { boolean, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"

export const users = pgTable("user", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  image: text(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().notNull(),
  username: text().notNull().unique(),
  ...timestamps,
})
