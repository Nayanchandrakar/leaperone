import { sessionService } from "@/features/auth/modules/session.module"
import { InvitationController } from "@/features/invitation/controllers/invitation.controller"
import { InvitationService } from "@/features/invitation/services/invitation.service"

const invitationService = new InvitationService(sessionService)
const invitationController = new InvitationController(invitationService)

export { invitationController, invitationService }
