import { redis } from "@/config/redis"
import type { ActiveSession, FullSession } from "@/types/global.types"

export class SessionRepository {
  async getActiveSessions(userId: string): Promise<ActiveSession[]> {
    const sessions = await redis.get(`active_sessions_${userId}`)
    return (sessions ?? []) as ActiveSession[]
  }

  async getSessionByToken(token: string): Promise<FullSession | null> {
    const session = await redis.get(token)
    return session as FullSession
  }

  async deleteActiveSessions(userId: string) {
    return await redis.del(`active_sessions_${userId}`)
  }

  async deleteSessionByToken(token: string) {
    return await redis.del(token)
  }
}
