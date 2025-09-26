import { createId } from "@paralleldrive/cuid2"
import { pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"

export const contactUs = pgTable("contact-us", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: text().notNull(),
  phoneNumber: text(),
  message: text().notNull(),
  ...timestamps,
})
