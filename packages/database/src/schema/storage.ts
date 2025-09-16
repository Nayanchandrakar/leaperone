import { STORAGE_QUOTA } from "@app/constants/file"
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
  quota: bigint({ mode: "number" }).notNull().default(STORAGE_QUOTA),
  usage: bigint({ mode: "number" }).notNull().default(0),
  ...timestamps,
})
