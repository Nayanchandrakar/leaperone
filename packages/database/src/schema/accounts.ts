import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { users } from "./users"

export const accounts = pgTable(
  "account",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text()
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp(),
    refreshTokenExpiresAt: timestamp(),
    scope: text(),
    password: text(),
    ...timestamps,
  },
  (t) => [unique().on(t.providerId, t.userId)],
)
