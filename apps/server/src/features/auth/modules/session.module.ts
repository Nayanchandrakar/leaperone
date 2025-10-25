import { SessionRepository } from "@/features/auth/repositories/sesion.repository"
import { SessionService } from "@/features/auth/services/session.service"

const sessionRepository = new SessionRepository()
const sessionService = new SessionService(sessionRepository)

export { SessionRepository, sessionService }
