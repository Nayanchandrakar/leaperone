import { ApiError } from "@app/error"
import { and, desc, eq } from "drizzle-orm"
import {
  accounts,
  businessCard,
  invitations,
  roles,
  storage,
  users,
  workspaceMembers,
} from "../schema"
import type { AcceptInvitation, CreateWorkspaceInviteAndUser, DatabaseClient } from "../types"

export async function getInvitationById(db: DatabaseClient, invitationId: string) {
  try {
    const [invitation] = await db
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

export async function createWorkspaceInviteAndUser(
  db: DatabaseClient,
  {
    name,
    email,
    jobRole,
    username,
    expiresAt,
    inviterId,
    workspaceId,
  }: CreateWorkspaceInviteAndUser,
) {
  try {
    const data = await db.transaction(async (tx) => {
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

      await tx.insert(storage).values({
        userId,
        workspaceId,
      })

      const [invitation] = await tx
        .insert(invitations)
        .values({
          userId,
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

export async function acceptInvitation(
  db: DatabaseClient,
  { userId, status, acceptedAt, invitationId, hashedPassword }: AcceptInvitation,
) {
  try {
    const data = await db.transaction(async (tx) => {
      await tx.update(users).set({ emailVerified: true }).where(eq(users.id, userId))

      await tx
        .update(accounts)
        .set({ password: hashedPassword })
        .where(and(eq(accounts.userId, userId), eq(accounts.providerId, "credential")))

      await tx
        .update(invitations)
        .set({ status, acceptedAt })
        .where(eq(invitations.id, invitationId))

      return true
    })

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getInvitationsByWorkspaceId(db: DatabaseClient, workspaceId: string) {
  try {
    const data = await db
      .select({
        name: users.name,
        image: users.image,
        jobRole: users.jobRole,
        status: invitations.status,
        memberId: invitations.userId,
        businessCardId: businessCard.id,
        isRestricted: users.isRestricted,
        expiresAt: invitations.expiresAt,
      })
      .from(invitations)
      .innerJoin(users, eq(invitations.userId, users.id))
      .leftJoin(
        businessCard,
        and(eq(businessCard.userId, invitations.userId), eq(businessCard.workspaceId, workspaceId)),
      )
      .where(eq(invitations.workspaceId, workspaceId))
      .orderBy(desc(invitations.createdAt))

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
