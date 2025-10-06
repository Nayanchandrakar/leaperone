import { STORAGE_QUOTA } from "@app/core/constants"
import { createId } from "@paralleldrive/cuid2"
import { bigint, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { workspace } from "./workspace"

export const storage = pgTable("storage", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  quota: bigint({ mode: "number" }).default(STORAGE_QUOTA).notNull(),
  usage: bigint({ mode: "number" }).default(0).notNull(),
  ...timestamps,
})
