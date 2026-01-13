import { ApiError } from "@app/error"
import { and, eq } from "drizzle-orm"
import { dbHttp, dbWs } from "../index"
import { accounts, invitations, roles, users, workspaceMembers } from "../schema"
import type { AcceptInvitation, CreateWorkspaceInviteAndUser } from "../types"

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
        userId,
        password: null,
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

export async function acceptInvitation({
  email,
  status,
  acceptedAt,
  invitationId,
  hashedPassword,
}: AcceptInvitation) {
  try {
    const data = await dbWs.transaction(async (tx) => {
      const [user] = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

      if (!user) tx.rollback()

      await tx.update(users).set({ emailVerified: true }).where(eq(users.email, email))

      await tx
        .update(accounts)
        .set({ password: hashedPassword })
        .where(and(eq(accounts.userId, user?.id!), eq(accounts.providerId, "credential")))

      await tx
        .update(invitations)
        .set({ status, acceptedAt })
        .where(eq(invitations.id, invitationId))

      return user
    })

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
