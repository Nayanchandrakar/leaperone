import {
  acceptInvitationSchema,
  accessAsMemberSchema,
  inviteMemberSchema,
} from "@app/zod/schema/invitation"
import type { InvitationService } from "@/features/invitation/services/invitation.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { isAuth } from "@/middlewares/auth.middleware"
import {
  canInviteMembers,
  hasActiveSubscription,
  hasWorkspace,
} from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type {
  AcceptInvitationContext,
  AccessAsMemberContext,
  ExitImpersonationContext,
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
      hasActiveSubscription,
      canInviteMembers,
      this.inviteMember,
    )
    this.router.post("/accept", zodValidator("json", acceptInvitationSchema), this.acceptInvitation)
    this.router.get("/invited-members", isAuth, hasWorkspace, this.getInvitedMembers)
    this.router.post(
      "/access-as-member",
      zodValidator("json", accessAsMemberSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      this.accessAsMember,
    )
    this.router.delete(
      "/remove-member",
      zodValidator("json", accessAsMemberSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      this.removeMember,
    )
    this.router.post("/exit-impersonation", isAuth, this.exitImpersonation)
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

  accessAsMember = async (c: AccessAsMemberContext) => {
    return await this.invitationService.accessAsMember(c)
  }

  exitImpersonation = async (c: ExitImpersonationContext) => {
    return await this.invitationService.exitImpersonation(c)
  }

  removeMember = async (c: AccessAsMemberContext) => {
    return await this.invitationService.removeMember(c)
  }
}
