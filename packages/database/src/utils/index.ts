import { timestamp } from "drizzle-orm/pg-core"

export const timestamps = {
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
}
