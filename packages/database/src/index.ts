import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"
import { defaultDbConfig } from "./config/database"

/**
 * Database connection pool using Neon serverless driver with WebSocket support.
 * This pool maintains a persistent connection suitable for long-running applications.
 */
const pool = new Pool({ connectionString: process.env.DATABASE_URL! })

/**
 * Main database instance configured with Drizzle ORM.
 * Uses Neon serverless driver with WebSocket connection and caching enabled.
 * This is the primary database client for the application.
 *
 * @example
 * ```typescript
 * import { db } from '@app/database'
 *
 * const users = await db.select().from(usersTable)
 * ```
 */
export const db = drizzle(pool, defaultDbConfig)
