import { STORAGE_QUOTA } from "@app/constants/file"
import { createId } from "@paralleldrive/cuid2"
import { bigint, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { workspace } from "./workspace"

export const assetManager = pgTable("asset_manager", {
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
