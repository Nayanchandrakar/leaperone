import { InvitationController } from "@/features/invitation/controllers/invitation.controller"
import { InvitationService } from "@/features/invitation/services/invitation.service"

const invitationService = new InvitationService()
const invitationController = new InvitationController(invitationService)

export { invitationService, invitationController }
