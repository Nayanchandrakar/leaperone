import { INVITATION_EXPIRY } from "@app/core/constants"
import {
  acceptWorkspaceInviteAndSetPassword,
  createWorkspaceInviteAndUser,
} from "@app/database/repository/invitation"
import { hasPermissions } from "@app/database/repository/role-permission"
import { getUserByEmail, getUserByUserName } from "@app/database/repository/user"
import { ApiError } from "@app/error"
import { logger } from "@app/logger/index"
import { createId } from "@paralleldrive/cuid2"
import { hash } from "bcryptjs"
import { redis } from "@/config/redis"
import { MSG } from "@/constants/message"
import type { AcceptInvitationContext, InviteMemberContext } from "@/types/invitation.types"
import { getDate } from "@/utils/date"
import { getInviteKey } from "@/utils/invite.utils"
import { RouteUtils } from "@/utils/route.utils"

export class InvitationService {
  async inviteMember(c: InviteMemberContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { email, jobRole, name, username } = c.req.valid("json")

    if (user.email === email || user.username === username) {
      throw ApiError.conflict(MSG.INVITATION.SELF_INVITE)
    }

    const canInvite = await hasPermissions(user.id, workspace.id, ["manage:members"])

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

    await Promise.all([
      // Mark the username as reserved to avoid race conditions
      redis.hset("username_records", { [username]: 1 }),
      redis.set(getInviteKey(token), invitation.id, {
        ex: INVITATION_EXPIRY,
      }),
    ])

    const inviteLink = RouteUtils.createAbsoluteRoute(`/invite/accept?token=${token}`)

    // await sendMail({
    //   to: email,
    //   subject: "You've been invited to join a workspace on Leaper One",
    //   html: `<h2>Welcome to Leaper One!</h2><p>You've been invited to join a workspace. Click the link below to set up your password and complete your account:</p><p><a href="${inviteLink}">Accept Invitation</a></p><p>This link will expire in 7 days.</p><p>If you didn't expect this invitation, you can safely ignore this email.</p>`,
    // })

    logger.info(inviteLink)
    return c.json({ message: MSG.INVITATION.INVITE_SENT })
  }

  async acceptInvitation(c: AcceptInvitationContext) {
    const { token, password } = c.req.valid("json")

    // Look up invitation ID from Redis
    const inviteKey = getInviteKey(token)
    const invitationId = await redis.get<string>(inviteKey)

    if (!invitationId) {
      throw ApiError.badRequest(MSG.INVITATION.INVALID_OR_EXPIRED)
    }

    // Hash the password
    const hashedPassword = await hash(password, 10)

    await acceptWorkspaceInviteAndSetPassword({
      token: invitationId,
      password: hashedPassword,
    })

    await redis.del(inviteKey)

    return c.json({
      success: true,
      message: MSG.INVITATION.INVITE_ACCEPTED,
    })
  }
}
