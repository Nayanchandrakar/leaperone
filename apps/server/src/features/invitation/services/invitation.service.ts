import { INVITATION_EXPIRY, SESSION_COOKIE_NAME, SESSION_EXPIRY } from "@app/core/constants"
import {
  acceptInvitation,
  createWorkspaceInviteAndUser,
  getInvitationById,
  getInvitationsByWorkspaceId,
} from "@app/database/repository/invitation"
import { hasPermissions } from "@app/database/repository/role-permission"
import { getUserByEmail, getUserById, getUserByUserName } from "@app/database/repository/user"
import { getWorkspaceMember } from "@app/database/repository/workspace-member"
import { ApiError } from "@app/error"
import { logger } from "@app/logger/index"
import { createId } from "@paralleldrive/cuid2"
import { hash } from "bcryptjs"
import { redis } from "@/config/redis"
import { MSG } from "@/constants/message"
import { sessionService } from "@/features/auth/modules/session.module"
import { Cookie } from "@/features/auth/utils/cookie.utils"
import { sendMail } from "@/features/auth/utils/mail"
import type { FullSession } from "@/types/global.types"
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

export class InvitationService {
  async inviteMember(c: InviteMemberContext) {
    const session = c.get("session")
    const { user } = session
    const workspace = c.get("workspace")
    const { email, jobRole, name, username } = c.req.valid("json")

    if (user.email === email || user.username === username) {
      throw ApiError.conflict(MSG.INVITATION.SELF_INVITE)
    }

    const canInvite = await hasPermissions(user.id, workspace.id, ["manage:members"], session)

    if (!canInvite) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      throw ApiError.conflict(MSG.USER.ALREADY_EXISTS)
    }

    const usernameTaken = await getUserByUserName(username)

    if (usernameTaken) {
      throw ApiError.conflict(MSG.USER.USERNAME_EXISTS)
    }

    const invitation = await createWorkspaceInviteAndUser({
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

    const invitation = await getInvitationById(invitationId)

    if (!invitation) {
      throw ApiError.badRequest(MSG.INVITATION.NOT_FOUND)
    }

    if (invitation.expiresAt < new Date()) {
      throw ApiError.badRequest(MSG.INVITATION.EXPIRED)
    }

    const hashedPassword = await hash(password, 10)

    // Accept the invitation and set the password
    const user = await acceptInvitation({
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
    const session = c.get("session")
    const { user } = session
    const workspace = c.get("workspace")

    const canInvite = await hasPermissions(user.id, workspace.id, ["manage:members"], session)

    if (!canInvite) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const invitations = await getInvitationsByWorkspaceId(workspace.id)

    return c.json({ data: invitations })
  }

  async accessAsMember(c: AccessAsMemberContext) {
    const managerSession = c.get("session")
    const { user } = managerSession
    const workspace = c.get("workspace")
    const { memberId } = c.req.valid("json")

    // Check if manager has permission to manage members
    // Note: We use managerSession here to check manager's permissions
    // (not the impersonated session, since we're not impersonating yet)
    const canManageMembers = await hasPermissions(
      user.id,
      workspace.id,
      ["manage:members"],
      managerSession,
    )

    if (!canManageMembers) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Prevent accessing own account
    if (user.id === memberId) {
      throw ApiError.badRequest(MSG.INVITATION.CANNOT_ACCESS_SELF)
    }

    // Verify the member exists in the workspace
    const member = await getWorkspaceMember(memberId, workspace.id)

    if (!member) {
      throw ApiError.notFound(MSG.INVITATION.MEMBER_NOT_FOUND)
    }

    // Get the member user details
    const memberUser = await getUserById(memberId)

    if (!memberUser) {
      throw ApiError.notFound(MSG.USER.NOT_FOUND)
    }

    // Check if member is restricted
    if (memberUser.isRestricted) {
      throw ApiError.badRequest(MSG.USER.RESTRICTED_USER)
    }

    // Create a new session for the member
    const memberSession = await sessionService.create(c, memberUser)

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
    // (sessionService.create already stored it, but without metadata)
    await redis.set(memberSession.session.token, memberSession, {
      ex: SESSION_EXPIRY,
    })

    // Set the session cookie to switch to member's account
    await Cookie.set(c, SESSION_COOKIE_NAME, memberSession.session.token)

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
    await Cookie.set(c, SESSION_COOKIE_NAME, managerToken)

    logger.info(`Manager ${managerSession.user.id} exited impersonation`)

    return c.json({
      success: true,
      data: { user: managerSession.user },
      message: MSG.INVITATION.EXIT_IMPERSONATION_SUCCESS,
    })
  }
}
