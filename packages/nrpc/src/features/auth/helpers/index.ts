import { redis } from "../../../lib/redis"
import type { ActiveSession, FullSession } from "../../../types"

export async function getActiveSessions(
  userId: string,
): Promise<ActiveSession[]> {
  const sessions = await redis.get(`active_sessions_${userId}`)
  return (sessions ?? []) as ActiveSession[]
}

export async function getSessionByToken(
  token: string,
): Promise<FullSession | null> {
  const session = await redis.get(token)
  return session as FullSession
}

export async function deleteActiveSessions(userId: string) {
  return await redis.del(`active_sessions_${userId}`)
}

export async function deleteSessionByToken(token: string) {
  return await redis.del(token)
}
