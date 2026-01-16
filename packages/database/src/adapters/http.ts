import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { defaultDbConfig } from "../config/database"

/**
 * Neon HTTP client for serverless environments.
 * Uses HTTP-based connection instead of WebSocket, making it suitable for
 * environments where persistent connections are not available or desired.
 */
const client = neon(process.env.DATABASE_URL!)

/**
 * Database instance using HTTP connection for Neon serverless driver.
 * Ideal for serverless environments like Vercel, Netlify, or other platforms
 * where HTTP-based database connections are preferred over WebSocket connections.
 *
 * @example
 * ```typescript
 * import { dbHttp } from '@app/database/connections/http'
 *
 * const users = await dbHttp.select().from(usersTable)
 * ```
 */
export const dbHttp = drizzle(client, defaultDbConfig)
