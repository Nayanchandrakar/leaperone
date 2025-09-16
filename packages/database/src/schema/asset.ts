import { createId } from "@paralleldrive/cuid2"
import { integer, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { storage } from "./storage"

export const asset = pgTable("asset", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  storageId: text()
    .references(() => storage.id, { onDelete: "cascade" })
    .notNull(),
  fileName: text().notNull(),
  mime: text().notNull(),
  size: integer().notNull().default(0),
  ext: text().notNull(),
  storageKey: text().notNull(),
  url: text().notNull(),
  ...timestamps,
})
