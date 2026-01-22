import { SESSION_COOKIE_OPTIONS } from "@app/core/config/cookie"
import { INVITATION_EXPIRY, SESSION_COOKIE_NAME, SESSION_EXPIRY } from "@app/core/constants"
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
import { SessionManager } from "@app/session"
import type { FullSession } from "@app/types"
import { createId } from "@paralleldrive/cuid2"
import { hash } from "bcryptjs"
import { setCookie } from "hono/cookie"
import type { CookieOptions } from "hono/utils/cookie"
import { redis } from "@/config/redis"
import { MSG } from "@/constants/message"
import { sendMail } from "@/features/auth/utils/mail"
import { HonoCookieAdapter } from "@/features/shared/adapters/cookie.adapter"
import type { RedisStorageAdapter } from "@/features/shared/adapters/redis.adapter"
import type {
  AcceptInvitationContext,
  AccessAsMemberContext,
  ExitImpersonationContext,
  GetInvitedMembersContext,
  InviteMemberContext,
} from "@/types/invitation.types"
import { getDate } from "@/utils/date"
import { getInviteKey } from "@/utils/invite.utils"
import { RouteUtils } from "@/utils/route.utils"
import { getRequestIp } from "@/utils/string"

export class InvitationService {
  constructor(private readonly storageAdapter: RedisStorageAdapter) {}
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

  async acceptInvitation(c: AcceptInvitationContext) {
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
      data: invitations,
      seats: { used: invitations.length, total: subscription.seats },
    })
  }

  async accessAsMember(c: AccessAsMemberContext) {
    const managerSession = c.get("session")
    const { user } = managerSession
    const workspace = c.get("workspace")
    const { memberId } = c.req.valid("json")

    // Check if manager has permission to manage members
    // Note: We use managerSession here to check manager's permissions
    // (not the impersonated session, since we're not impersonating yet)
    const canManageMembers = await hasPermissions(db, user.id, [PERMISSIONS.ACCESS_AS_MEMBER])

    if (!canManageMembers) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Prevent accessing own account
    if (user.id === memberId) {
      throw ApiError.badRequest(MSG.INVITATION.CANNOT_ACCESS_SELF)
    }

    // Optimized: Single query to get member with user details
    const memberWithUser = await getWorkspaceMemberWithUser(db, memberId, workspace.id)

    if (!memberWithUser) {
      throw ApiError.notFound(MSG.INVITATION.MEMBER_NOT_FOUND)
    }

    const { user: memberUser } = memberWithUser

    // Check if member is restricted
    if (memberUser.isRestricted) {
      throw ApiError.badRequest(MSG.USER.RESTRICTED_USER)
    }

    // Create a new session for the member
    const cookieAdapter = new HonoCookieAdapter(c)
    const sessionManager = new SessionManager({
      cookieAdapter,
      storageAdapter: this.storageAdapter,
    })

    const memberSession = await sessionManager.create({
      user: memberUser,
      token: createId(),
      ipAddress: getRequestIp(c),
      userAgent: c.req.header("User-Agent"),
    })

    if (!memberSession) {
      throw ApiError.internalServerError(MSG.SESSION.FAILED_TO_CREATE)
    }

    // Enrich session with impersonation metadata (including manager token for restoration)
    memberSession.impersonatedBy = {
      managerId: user.id,
      managerEmail: user.email,
      impersonatedAt: new Date(),
      managerToken: managerSession.session.token,
      expiresAt: memberSession.session.expiresAt,
    }

    // Update the session in Redis with impersonation metadata
    // (SessionManager.create already stored it, but without metadata)
    await redis.set(memberSession.session.token, memberSession, {
      ex: SESSION_EXPIRY,
    })

    // Set the session cookie to switch to member's account
    setCookie(
      c,
      SESSION_COOKIE_NAME,
      memberSession.session.token,
      SESSION_COOKIE_OPTIONS as CookieOptions,
    )

    logger.info(`Manager ${user.id} accessed as member ${memberId} in workspace ${workspace.id}`)

    return c.json({
      success: true,
      data: { user: memberSession.user },
      message: MSG.INVITATION.ACCESS_AS_MEMBER_SUCCESS,
    })
  }

  async exitImpersonation(c: ExitImpersonationContext) {
    const session = c.get("session")

    // Check if this is an impersonation session
    if (!session.impersonatedBy) {
      throw ApiError.badRequest(MSG.INVITATION.NOT_IMPERSONATING)
    }

    const { managerToken } = session.impersonatedBy

    // Get the manager's session from Redis using the stored token
    const managerSession = await redis.get<FullSession>(managerToken)

    if (!managerSession) {
      throw ApiError.unauthorized(MSG.SESSION.EXPIRED)
    }

    // Restore the manager's session
    setCookie(c, SESSION_COOKIE_NAME, managerToken, SESSION_COOKIE_OPTIONS as CookieOptions)

    logger.info(`Manager ${managerSession.user.id} exited impersonation`)

    return c.json({
      success: true,
      data: { user: managerSession.user },
      message: MSG.INVITATION.EXIT_IMPERSONATION_SUCCESS,
    })
  }

  async removeMember(c: AccessAsMemberContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { memberId } = c.req.valid("json")

    // Check if manager has permission to manage members
    const canManageMembers = await hasPermissions(db, user.id, [PERMISSIONS.REMOVE_MEMBERS])

    if (!canManageMembers) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Prevent removing yourself
    if (user.id === memberId) {
      throw ApiError.badRequest("You cannot remove yourself from the workspace")
    }

    // Verify the member exists in the workspace
    const member = await getWorkspaceMember(db, memberId, workspace.id)

    if (!member) {
      throw ApiError.notFound(MSG.INVITATION.MEMBER_NOT_FOUND)
    }

    // Check if the member is the workspace owner
    // Optimized: Use workspace from context instead of querying database again
    if (workspace.ownerId === memberId) {
      throw ApiError.badRequest("Cannot remove the workspace owner")
    }

    // Remove the member from the workspace
    const removed = await removeMemberFromWorkspace(db, memberId, workspace.id)

    if (!removed) {
      throw ApiError.badRequest("Failed to remove member from workspace")
    }

    // Revoke all sessions for the removed member
    const cookieAdapter = new HonoCookieAdapter(c)
    const sessionManager = new SessionManager({
      cookieAdapter,
      storageAdapter: this.storageAdapter,
    })
    await sessionManager.revoke(memberId)

    logger.info(`Manager ${user.id} removed member ${memberId} from workspace ${workspace.id}`)

    return c.json({
      success: true,
      message: "Member has been successfully removed from the workspace",
    })
  }
}
