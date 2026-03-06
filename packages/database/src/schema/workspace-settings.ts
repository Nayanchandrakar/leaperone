import { createId } from "@paralleldrive/cuid2"
import { boolean, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { workspace } from "./workspace"

export const workspaceSettings = pgTable("workspace_settings", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  createAndEdit: boolean().default(true).notNull(),
  ...timestamps,
})
