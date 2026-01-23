import { SessionService } from "@app/session"
import { cookieAdapter, storageAdapter } from "@/utils/adapter"

export const sessionService = new SessionService({ cookieAdapter, storageAdapter })
