import { ApiError } from "@app/error"
import { and, eq } from "drizzle-orm"
import { dbHttp, dbWs } from "../index"
import { accounts, invitations, roles, users, workspaceMembers } from "../schema"
import type { CreateWorkspaceInviteAndUser } from "../types"

interface AcceptWorkspaceInviteAndSetPasswordParams {
  token: string
  password: string
}

export async function getInvitationById(invitationId: string) {
  try {
    const [invitation] = await dbHttp
      .select()
      .from(invitations)
      .where(eq(invitations.id, invitationId))
      .limit(1)

    return invitation
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function createWorkspaceInviteAndUser({
  name,
  email,
  jobRole,
  username,
  expiresAt,
  inviterId,
  workspaceId,
}: CreateWorkspaceInviteAndUser) {
  try {
    const data = await dbWs.transaction(async (tx) => {
      const [user] = await tx
        .insert(users)
        .values({
          email,
          name,
          username,
          jobRole,
          emailVerified: false,
        })
        .returning({ id: users.id })

      if (!user) tx.rollback()
      const userId = user?.id as string

      await tx.insert(accounts).values({
        password: null,
        userId: userId,
        accountId: userId,
        providerId: "credential",
      })

      const [role] = await tx
        .select({ id: roles.id })
        .from(roles)
        .where(eq(roles.name, "member"))
        .limit(1)

      if (!role) tx.rollback()

      await tx.insert(workspaceMembers).values({
        userId,
        workspaceId,
        roleId: role?.id!,
      })

      const [invitation] = await tx
        .insert(invitations)
        .values({
          email,
          inviterId,
          expiresAt,
          workspaceId,
          status: "pending",
          roleId: role?.id!,
        })
        .returning({ id: invitations.id })

      if (!invitation) tx.rollback()

      return invitation
    })

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function acceptWorkspaceInviteAndSetPassword({
  token,
  password,
}: AcceptWorkspaceInviteAndSetPasswordParams) {
  try {
    const data = await dbWs.transaction(async (tx) => {
      // Load invitation (token is the invitation ID from Redis)
      const [invitation] = await tx
        .select()
        .from(invitations)
        .where(eq(invitations.id, token))
        .limit(1)

      if (!invitation) {
        throw ApiError.badRequest("Invitation not found")
      }

      if (invitation.status === "accepted") {
        throw ApiError.badRequest("Invitation already accepted")
      }

      if (invitation.expiresAt < new Date()) {
        throw ApiError.badRequest("Invitation has expired")
      }

      // Get user by email
      const [user] = await tx.select().from(users).where(eq(users.email, invitation.email)).limit(1)

      if (!user) {
        throw ApiError.badRequest("User not found")
      }

      // Update credential account password
      await tx
        .update(accounts)
        .set({ password })
        .where(and(eq(accounts.userId, user.id), eq(accounts.providerId, "credential")))

      // Mark invitation as accepted
      await tx
        .update(invitations)
        .set({
          status: "accepted",
          acceptedAt: new Date(),
        })
        .where(eq(invitations.id, token))

      return {
        userId: user.id,
        success: true,
      }
    })

    return data
  } catch (error) {
    console.error(error)
    if (error instanceof ApiError) {
      throw error
    }
    throw ApiError.internalServerError()
  }
}
