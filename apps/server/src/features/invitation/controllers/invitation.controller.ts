import {
  acceptInvitationSchema,
  completeInvitationSchema,
  createInvitationSchema,
} from "@app/zod/schema/invitation"
import type { InvitationService } from "@/features/invitation/services/invitation.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { isAuth } from "@/middlewares/auth.middleware"
import { hasActiveSubscription, hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type {
  AcceptInvitationContext,
  CompleteInvitationContext,
  CreateInvitationContext,
} from "@/types/invitation.types"

export class InvitationController extends HttpController {
  constructor(private readonly invitationService: InvitationService) {
    super("/invitations")
    this.initializeRoutes()
  }

  protected override initializeRoutes() {
    this.router.post(
      "/",
      zodValidator("json", createInvitationSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      this.createInvitation,
    )
    this.router.get("/accept", zodValidator("query", acceptInvitationSchema), this.acceptInvitation)
    this.router.post(
      "/complete",
      zodValidator("json", completeInvitationSchema),
      this.completeInvitation,
    )
  }

  createInvitation = async (c: CreateInvitationContext) => {
    return await this.invitationService.createInvitation(c)
  }

  acceptInvitation = async (c: AcceptInvitationContext) => {
    return await this.invitationService.acceptInvitation(c)
  }

  completeInvitation = async (c: CompleteInvitationContext) => {
    return await this.invitationService.completeInvitation(c)
  }
}
