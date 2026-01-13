import { acceptInvitationSchema, inviteMemberSchema } from "@app/zod/schema/invitation"
import type { InvitationService } from "@/features/invitation/services/invitation.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { isAuth } from "@/middlewares/auth.middleware"
import { hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type {
  AcceptInvitationContext,
  GetInvitedMembersContext,
  InviteMemberContext,
} from "@/types/invitation.types"

export class InvitationController extends HttpController {
  constructor(private readonly invitationService: InvitationService) {
    super("/invitation")
    this.initializeRoutes()
  }

  protected override initializeRoutes() {
    this.router.post(
      "/invite",
      zodValidator("json", inviteMemberSchema),
      isAuth,
      hasWorkspace,
      this.inviteMember,
    )
    this.router.post("/accept", zodValidator("json", acceptInvitationSchema), this.acceptInvitation)
    this.router.get("/invited-members", isAuth, hasWorkspace, this.getInvitedMembers)
  }

  inviteMember = async (c: InviteMemberContext) => {
    return await this.invitationService.inviteMember(c)
  }

  acceptInvitation = async (c: AcceptInvitationContext) => {
    return await this.invitationService.acceptInvitation(c)
  }

  getInvitedMembers = async (c: GetInvitedMembersContext) => {
    return await this.invitationService.getInvitedMembers(c)
  }
}
