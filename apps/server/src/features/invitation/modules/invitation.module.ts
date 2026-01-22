import { InvitationController } from "@/features/invitation/controllers/invitation.controller"
import { InvitationService } from "@/features/invitation/services/invitation.service"
import { storageAdapter } from "@/features/shared/adapters/redis.adapter"

const invitationService = new InvitationService(storageAdapter)
const invitationController = new InvitationController(invitationService)

export { invitationService, invitationController }
