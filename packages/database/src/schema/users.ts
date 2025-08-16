import { createId } from "@paralleldrive/cuid2"
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core"
import { timestamps } from "../utils"

export const users = pgTable(
  "user",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    username: text().notNull().unique(),
    name: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: boolean().notNull(),
    image: text(),
    ...timestamps,
  },
  (t) => ({
    emailUniqueIndex: unique().on(t.email),
  }),
)

export const account = pgTable(
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
  (t) => ({
    userIdIndex: index().on(t.userId),
    accountIdIndex: index().on(t.accountId),
    providerIdIndex: index().on(t.providerId),
  }),
)

export const verification = pgTable("verification", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  ...timestamps,
})
