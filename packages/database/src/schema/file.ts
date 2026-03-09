import { createId } from "@paralleldrive/cuid2"
import { integer, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { storage } from "./storage"
import { users } from "./users"
import { workspace } from "./workspace"

export const file = pgTable("file", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),

  storageId: text()
    .references(() => storage.id, { onDelete: "cascade" })
    .notNull(),

  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),

  uploadedBy: text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  name: text().notNull(),
  mime: text().notNull(),
  ext: text().notNull(),
  key: text().notNull(),
  size: integer().default(0).notNull(),
  ...timestamps,
})
