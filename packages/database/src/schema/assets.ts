import { createId } from "@paralleldrive/cuid2"
import { integer, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { assetManager } from "./asset-manager"

export const asset = pgTable("asset", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  assetManagerId: text()
    .references(() => assetManager.id, { onDelete: "cascade" })
    .notNull(),
  name: text().notNull(),
  mime: text().notNull(),
  ext: text().notNull(),
  key: text().notNull(),
  size: integer().default(0).notNull(),
  ...timestamps,
})
