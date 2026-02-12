import {
  impersonateSchema,
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
  ExitImpersonationContext,
  GetInvitedMembersContext,
  ImpersonateContext,
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
      "/impersonate",
      zodValidator("json", impersonateSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.impersonate,
    )
    this.router.delete(
      "/exit-impersonation",
      zodValidator("json", impersonateSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.exitImpersonation,
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

  impersonate = async (c: ImpersonateContext) => {
    return await this.invitationService.impersonate(c)
  }

  exitImpersonation = async (c: ExitImpersonationContext) => {
    return await this.invitationService.exitImpersonation(c)
  }

  removeMember = async (c: ImpersonateContext) => {
    return await this.invitationService.removeMember(c)
  }
}
