import { createId } from "@paralleldrive/cuid2"
import { bigint, pgTable, text, unique } from "drizzle-orm/pg-core"
import { STORAGE_QUOTA } from "../constants/storage"
import { timestamps } from "../utils"
import { users } from "./users"
import { workspace } from "./workspace"

export const storage = pgTable(
  "storage",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),

    userId: text()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    workspaceId: text()
      .references(() => workspace.id, { onDelete: "cascade" })
      .notNull(),

    quota: bigint({ mode: "number" }).default(STORAGE_QUOTA).notNull(),
    usage: bigint({ mode: "number" }).default(0).notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.userId, t.workspaceId)],
)
