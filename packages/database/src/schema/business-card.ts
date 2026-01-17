import type { ContentEditor, DesignEditor, QrCodeEditor, Template } from "@app/types"
import { createId } from "@paralleldrive/cuid2"
import { jsonb, pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { workspace } from "./workspace"

export const businessCard = pgTable("business_card", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),
  template: text().notNull().$type<Template>(),
  design: jsonb().notNull().$type<DesignEditor>(),
  qrCode: jsonb().notNull().$type<QrCodeEditor>(),
  content: jsonb().notNull().$type<ContentEditor>(),
  ...timestamps,
})
