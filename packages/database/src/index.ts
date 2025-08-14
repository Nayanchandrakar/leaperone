import type {
  ConfigOptions,
  HttpConnectionType,
  WsConnectionType,
} from "@myleaper/database/types"
import { upstashCache } from "drizzle-orm/cache/upstash"
import { drizzle } from "drizzle-orm/neon-http"
import { drizzle as drizzleWs } from "drizzle-orm/neon-serverless"

class Database {
  private static instance: Database | null = null
  private httpConnection: HttpConnectionType | null = null
  private wsConnection: WsConnectionType | null = null
  private config: ConfigOptions

  private constructor() {
    this.config = {
      connectionString: process.env.DATABASE_URL as string,
      case: "snake_case",
      cacheConfig: {
        url: process.env.UPSTASH_REDIS_REST_URL as string,
        token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
        global: false,
      },
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
      return Database.instance
    }
    return Database.instance
  }

  getHttpConnection() {
    if (!this.httpConnection) {
      this.httpConnection = drizzle({
        connection: this.config.connectionString,
        casing: this.config.case,
        cache: upstashCache(this.config.cacheConfig),
      })
    }

    return this.httpConnection
  }

  getWsConnection() {
    if (!this.wsConnection) {
      this.wsConnection = drizzleWs({
        connection: this.config.connectionString,
        casing: this.config.case,
        cache: upstashCache(this.config.cacheConfig),
      })
    }

    return this.wsConnection
  }
}

const database = Database.getInstance()
export const dbHttp = database.getHttpConnection()
export const dbWs = database.getWsConnection()
