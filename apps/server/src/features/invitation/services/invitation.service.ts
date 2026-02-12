import {
  INVITATION_EXPIRY,
  MANAGER_SESSION_COOKIE_NAME,
  MANAGER_SESSION_EXPIRY,
  SESSION_COOKIE_NAME,
} from "@app/core/constants"
import { db } from "@app/database"
import { PERMISSIONS } from "@app/database/constants/permissions"
import {
  acceptInvitation,
  createWorkspaceInviteAndUser,
  getInvitationById,
  getInvitationsByWorkspaceId,
} from "@app/database/repository/invitation"
import { hasPermissions } from "@app/database/repository/role-permission"
import { doesUserExistByUsernameOrEmail } from "@app/database/repository/user"
import {
  getWorkspaceMember,
  getWorkspaceMemberWithUser,
  removeMemberFromWorkspace,
} from "@app/database/repository/workspace-member"
import { ApiError } from "@app/error"
import { logger } from "@app/logger/index"
import type { SessionService } from "@app/session"
import type { FullSession } from "@app/types"
import { createId } from "@paralleldrive/cuid2"
import { hash } from "bcryptjs"
import type { Context } from "hono"
import { deleteCookie, getCookie } from "hono/cookie"
import { redis } from "@/config/redis"
import { MSG } from "@/constants/message"
import { setSessionCookie } from "@/features/auth/utils/cookie"
import { sendMail } from "@/features/auth/utils/mail"
import type {
  ExitImpersonationContext,
  GetInvitedMembersContext,
  ImpersonateContext,
  InviteMemberContext,
  PasswordSetupContext,
} from "@/types/invitation.types"
import { getDate } from "@/utils/date"
import { getInviteKey } from "@/utils/invite.utils"
import { RouteUtils } from "@/utils/route.utils"
import { getRequestIp } from "@/utils/string"

export class InvitationService {
  constructor(private readonly sessionService: SessionService<Context>) {}

  async inviteMember(c: InviteMemberContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")

    const { email, jobRole, name, username } = c.req.valid("json")

    if (user.email === email || user.username === username) {
      throw ApiError.conflict(MSG.INVITATION.SELF_INVITE)
    }

    const canInvite = await hasPermissions(db, user.id, [PERMISSIONS.INVITE_MEMBERS])

    if (!canInvite) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Single query to check both email and username existence
    const userExists = await doesUserExistByUsernameOrEmail(db, username, email)

    if (userExists) {
      throw ApiError.conflict(MSG.USER.ALREADY_EXISTS)
    }

    const invitation = await createWorkspaceInviteAndUser(db, {
      name,
      email,
      jobRole,
      username,
      inviterId: user.id,
      workspaceId: workspace.id,
      expiresAt: getDate(INVITATION_EXPIRY, "sec"),
    })

    if (!invitation) {
      throw ApiError.badRequest(MSG.INVITATION.FAILED_TO_CREATE)
    }

    const token = createId()

    // Mark the username as reserved to avoid race conditions
    await Promise.all([
      redis.hset("username_records", { [username]: 1 }),
      redis.set(getInviteKey(token), invitation.id, {
        ex: INVITATION_EXPIRY,
      }),
    ])

    const inviteLink = RouteUtils.createAbsoluteRoute(`/invite/accept?token=${token}`)

    logger.info(inviteLink)

    await sendMail({
      to: email,
      subject: "You've been invited to join a workspace on Leaper One",
      html: `<h2>Welcome to Leaper One!</h2><p>You've been invited to join a workspace. Click the link below to set up your password and complete your account:</p><p><a href="${inviteLink}">Accept Invitation</a></p><p>This link will expire in 7 days.</p><p>If you didn't expect this invitation, you can safely ignore this email.</p>`,
    })

    return c.json({ message: MSG.INVITATION.INVITE_SENT })
  }

  async passwordSetup(c: PasswordSetupContext) {
    const { token, password } = c.req.valid("json")

    // Get the invitation id from the redis
    const inviteKey = getInviteKey(token)
    const invitationId = await redis.get<string>(inviteKey)

    if (!invitationId) {
      throw ApiError.badRequest(MSG.INVITATION.INVALID_OR_EXPIRED)
    }

    const invitation = await getInvitationById(db, invitationId)

    if (!invitation) {
      throw ApiError.badRequest(MSG.INVITATION.NOT_FOUND)
    }

    if (invitation.expiresAt < new Date()) {
      throw ApiError.badRequest(MSG.INVITATION.EXPIRED)
    }

    const hashedPassword = await hash(password, 10)

    // Accept the invitation and set the password
    const user = await acceptInvitation(db, {
      invitationId,
      hashedPassword,
      status: "accepted",
      acceptedAt: new Date(),
      userId: invitation.userId,
    })

    if (!user) throw ApiError.badRequest(MSG.INVITATION.FAILED_TO_ACCEPT)

    await redis.del(inviteKey)

    return c.json({ success: true, message: MSG.INVITATION.INVITE_ACCEPTED })
  }

  async getInvitedMembers(c: GetInvitedMembersContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const subscription = c.get("subscription")

    const canInvite = await hasPermissions(db, user.id, [PERMISSIONS.VIEW_MEMBERS])

    if (!canInvite) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const invitations = await getInvitationsByWorkspaceId(db, workspace.id)

    return c.json({
      members: invitations,
      seats: { used: invitations.length, total: subscription.seats },
    })
  }

  async impersonate(c: ImpersonateContext) {
    const { user, session } = c.get("session")
    const workspace = c.get("workspace")
    const { memberId } = c.req.valid("json")

    // Verify owner has permission to impersonate members
    const canManageMembers = await hasPermissions(db, user.id, [PERMISSIONS.ACCESS_AS_MEMBER])

    if (!canManageMembers) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Check if owner is already impersonating another user
    if (session.impersonatedBy) {
      throw ApiError.badRequest(MSG.INVITATION.ALREADY_IMPERSONATING)
    }

    // Prevent self-impersonation to avoid session conflicts
    if (user.id === memberId) {
      throw ApiError.badRequest(MSG.INVITATION.CANNOT_ACCESS_SELF)
    }

    const memberUser = await getWorkspaceMemberWithUser(db, memberId, workspace.id)

    if (!memberUser) {
      throw ApiError.notFound(MSG.INVITATION.MEMBER_NOT_FOUND)
    }

    // Restricted users cannot be impersonated for security reasons
    if (memberUser.isRestricted) {
      throw ApiError.badRequest(MSG.USER.RESTRICTED_USER)
    }

    const memberSession = await this.sessionService.create({
      user: memberUser,
      token: createId(),
      ipAddress: getRequestIp(c),
      userAgent: c.req.header("User-Agent"),
      overrides: {
        impersonatedBy: user.id,
        ttl: MANAGER_SESSION_EXPIRY,
      },
    })

    if (!memberSession) {
      throw ApiError.internalServerError(MSG.SESSION.FAILED_TO_CREATE)
    }

    // Clear the current session cookie to prevent conflicts
    deleteCookie(c, SESSION_COOKIE_NAME)

    // Store owner's original session token in a separate cookie
    // This allows restoration when exiting impersonation
    setSessionCookie(c, MANAGER_SESSION_COOKIE_NAME, session.token)

    // Set the member's session as the active session
    // Owner now operates with member's permissions and context
    setSessionCookie(c, SESSION_COOKIE_NAME, memberSession.session.token)

    return c.json({ message: MSG.INVITATION.IMPERSONATE_SUCCESS })
  }

  async exitImpersonation(c: ExitImpersonationContext) {
    const { user, session } = c.get("session")

    // Check if this is an impersonation session
    if (!session.impersonatedBy) {
      throw ApiError.badRequest(MSG.INVITATION.NOT_IMPERSONATING)
    }

    // A restricted user's session should not be able to exit impersonation
    if (user.isRestricted) {
      throw ApiError.forbidden(MSG.USER.RESTRICTED_USER)
    }

    const impersonatedById = session.impersonatedBy

    // Verify owner has permission to exit impersonation
    const canExitImpersonation = await hasPermissions(db, impersonatedById, [
      PERMISSIONS.ACCESS_AS_MEMBER,
    ])

    if (!canExitImpersonation) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Get the owner's session token from the cookie
    const ownerToken = getCookie(c, MANAGER_SESSION_COOKIE_NAME)

    if (!ownerToken) {
      throw ApiError.badRequest(MSG.SESSION.FAILED_TO_GET)
    }

    // Get the owner's session from Redis using the stored token
    const ownerSession = await redis.get<FullSession>(ownerToken)

    // Verify the owner session belongs to the user who initiated impersonation
    if (!ownerSession || ownerSession.user.id !== impersonatedById) {
      throw ApiError.forbidden(MSG.INVITATION.SESSION_MISMATCH)
    }

    // Delete the current impersonated session from Redis
    await this.sessionService.delete(session.token)

    // Clear the current impersonated session cookie
    deleteCookie(c, SESSION_COOKIE_NAME)

    // Restore the owner's session cookie
    setSessionCookie(c, SESSION_COOKIE_NAME, ownerToken)

    // Delete the owner session backup cookie as it's no longer needed
    deleteCookie(c, MANAGER_SESSION_COOKIE_NAME)

    return c.json({
      success: true,
      data: { user: ownerSession.user },
      message: MSG.INVITATION.EXIT_IMPERSONATION_SUCCESS,
    })
  }

  async removeMember(c: ImpersonateContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { memberId } = c.req.valid("json")

    // Prevent removing yourself
    if (user.id === memberId) {
      throw ApiError.badRequest(MSG.INVITATION.CANNOT_REMOVE_YOURSELF)
    }

    // Check if manager has permission to manage members
    const canManageMembers = await hasPermissions(db, user.id, [PERMISSIONS.REMOVE_MEMBERS])

    if (!canManageMembers) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Verify the member exists in the workspace
    const member = await getWorkspaceMember(db, memberId, workspace.id)

    if (!member) {
      throw ApiError.notFound(MSG.INVITATION.MEMBER_NOT_FOUND)
    }

    // Remove the member from the workspace
    const removed = await removeMemberFromWorkspace(db, memberId, workspace.id)

    if (!removed) {
      throw ApiError.badRequest(MSG.INVITATION.FAILED_TO_REMOVE_MEMBER)
    }

    // Revoke all sessions for the removed member
    await this.sessionService.revoke(memberId)

    return c.json({
      success: true,
      message: MSG.INVITATION.MEMBER_REMOVED_SUCCESS,
    })
  }
}
