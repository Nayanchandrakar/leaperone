import { createId } from "@paralleldrive/cuid2"
import { pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { users } from "./users"

export const workspace = pgTable("workspace", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),

  // a user can have only one workspace
  ownerId: text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  ...timestamps,
})
