import { neonConfig, Pool } from "@neondatabase/serverless"
import type { Bindings } from "@/types/global.types"

export function getDatabaseClient(env: Bindings) {
  // Configure Neon to use the fetch API available in Cloudflare Workers
  neonConfig.fetchFunction = fetch

  // Enable query execution via fetch for edge environments
  neonConfig.poolQueryViaFetch = true

  // Create a connection pool with transaction support
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
  })

  return pool
}
