import { API_LIMITS } from "@myleaper/constants/server/rate-limit"
import { Ratelimit as Limiter } from "@upstash/ratelimit"
import { redis } from "../index"

class Ratelimit {
  private static instance: Ratelimit | null = null
  private relaxedWindow: Limiter | null = null

  private constructor() {
    this.relaxedWindow = new Limiter({
      redis,
      limiter: Limiter.slidingWindow(
        API_LIMITS.GENERAL.MAX_REQUESTS,
        API_LIMITS.GENERAL.DURATION,
      ),
    })
  }

  static getInstance() {
    if (!Ratelimit.instance) {
      Ratelimit.instance = new Ratelimit()
    }
    return Ratelimit.instance
  }

  getRelaxedWindow() {
    return this.relaxedWindow
  }
}

export const ratelimit = Ratelimit.getInstance()
