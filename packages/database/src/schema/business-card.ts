import type { ContentEditor, DesignEditor, QrCodeEditor, Template } from "@app/types"
import { createId } from "@paralleldrive/cuid2"
import { jsonb, pgEnum, pgTable, text } from "drizzle-orm/pg-core"
import { businessCardStatus } from "../constants/enums"
import { timestamps } from "../utils"
import { users } from "./users"
import { workspace } from "./workspace"

export const cardStatusEnum = pgEnum("status", businessCardStatus)

export const businessCard = pgTable("business_card", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),

  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  userId: text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  identifier: text().notNull().unique(),
  template: text().notNull().$type<Template>(),
  design: jsonb().notNull().$type<DesignEditor>(),
  qrCode: jsonb().notNull().$type<QrCodeEditor>(),
  content: jsonb().notNull().$type<ContentEditor>(),
  status: cardStatusEnum().default("active").notNull(),
  ...timestamps,
})
