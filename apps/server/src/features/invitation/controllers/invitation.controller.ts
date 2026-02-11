import {
  accessAsMemberSchema,
  inviteMemberSchema,
  passwordSetupSchema,
} from "@app/zod/schema/invitation"
import type { InvitationService } from "@/features/invitation/services/invitation.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { isAuth } from "@/middlewares/auth.middleware"
import {
  hasActiveSubscription,
  hasTeamPlan,
  hasTeamPlanWithSeats,
  hasWorkspace,
} from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type {
  AccessAsMemberContext,
  ExitImpersonationContext,
  GetInvitedMembersContext,
  InviteMemberContext,
  PasswordSetupContext,
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
      hasTeamPlanWithSeats,
      this.inviteMember,
    )
    this.router.post(
      "/password-setup",
      zodValidator("json", passwordSetupSchema),
      this.passwordSetup,
    )
    this.router.get(
      "/invited-members",
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.getInvitedMembers,
    )
    this.router.post(
      "/access-as-member",
      zodValidator("json", accessAsMemberSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.accessAsMember,
    )
    this.router.delete(
      "/remove-member",
      zodValidator("json", accessAsMemberSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.removeMember,
    )
    this.router.post(
      "/exit-impersonation",
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.exitImpersonation,
    )
  }

  inviteMember = async (c: InviteMemberContext) => {
    return await this.invitationService.inviteMember(c)
  }

  passwordSetup = async (c: PasswordSetupContext) => {
    return await this.invitationService.passwordSetup(c)
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
