import { neonConfig, Pool } from "@neondatabase/serverless"
import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless"
import { defaultDbConfig } from "../config/database"

/**
 * Configure Neon serverless driver to enable query execution via fetch.
 * This is required for edge environments like Cloudflare Workers and Vercel Edge.
 */
neonConfig.poolQueryViaFetch = true

/**
 * Database connection pool configured for WebSocket connections with fetch-based queries.
 * Optimized for edge environments and serverless functions.
 */
const pool = new Pool({ connectionString: process.env.DATABASE_URL! })

/**
 * Database instance using WebSocket connection with fetch-based query execution.
 * Suitable for edge environments and serverless functions where persistent connections
 * are not available or desired.
 *
 * @example
 * ```typescript
 * import { dbWs } from '@app/database/connections/websocket'
 *
 * const users = await dbWs.select().from(usersTable)
 * ```
 */
export const dbWs = drizzle(pool, defaultDbConfig) as NeonDatabase
