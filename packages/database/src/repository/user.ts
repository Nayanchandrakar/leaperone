import { ApiError } from "@app/error"
import { and, eq, or, sql } from "drizzle-orm"
import { accounts } from "../schema/accounts"
import {
  roles,
  storage,
  verification,
  workspace,
  workspaceMembers,
  workspaceSettings,
} from "../schema/index"
import { users } from "../schema/users"
import type { Account, CreateUser, DatabaseClient, User } from "../types"

export async function getUserByEmail(db: DatabaseClient, email: string) {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1).$withCache()
    return user
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function doesUserExistByUsernameOrEmail(
  db: DatabaseClient,
  username: string,
  email: string,
) {
  try {
    const [user] = await db
      .select({ exists: sql`1` })
      .from(users)
      .where(or(eq(users.username, username), eq(users.email, email)))
      .limit(1)

    return Boolean(user?.exists)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function doesUserExistByUsername(db: DatabaseClient, username: string) {
  try {
    const [data] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1)
    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getUserWithProviderAccount(
  db: DatabaseClient,
  email: string,
  providerId: string,
) {
  try {
    const [userWithAcccount] = await db
      .select({
        user: users,
        account: {
          id: accounts.id,
          password: accounts.password,
          providerId: accounts.providerId,
        },
      })
      .from(users)
      .innerJoin(accounts, eq(accounts.userId, users.id))
      .where(and(eq(users.email, email), eq(accounts.providerId, providerId)))
      .limit(1)
      .$withCache()

    return userWithAcccount
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function createUser(
  db: DatabaseClient,
  { email, name, username, image, password, defaultRole }: CreateUser,
) {
  try {
    const data = await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(users)
        .values({
          email,
          name,
          image,
          username,
        })
        .returning({ id: users.id })

      // Rollback the transaction if no user is created
      if (!user) tx.rollback()
      const userId = user?.id as string

      await tx.insert(accounts).values({
        userId,
        password,
        accountId: userId,
        providerId: "credential",
      })

      const [userWorkspace] = await tx
        .insert(workspace)
        .values({
          ownerId: userId,
        })
        .returning({ id: workspace.id })

      // Rollback the transaction if no workspace is created
      if (!userWorkspace) tx.rollback()
      const workspaceId = userWorkspace?.id as string
      const [role] = await tx.select().from(roles).where(eq(roles.name, defaultRole)).limit(1)

      // Rollback the transaction if no role is found
      if (!role) tx.rollback()

      await tx.insert(workspaceMembers).values({
        roleId: role?.id!,
        workspaceId,
        userId,
      })

      await tx.insert(storage).values({
        userId,
        workspaceId,
      })

      await tx.insert(workspaceSettings).values({
        workspaceId,
        createAndEdit: true,
      })

      return {
        user: {
          id: userId,
          workspaceId,
        },
      }
    })

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateUserByEmail(
  db: DatabaseClient,
  email: string,
  overrides: Partial<User>,
) {
  try {
    const [user] = await db.update(users).set(overrides).where(eq(users.email, email)).returning()
    return user
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateUserById(db: DatabaseClient, id: string, overrides: Partial<User>) {
  try {
    const [user] = await db.update(users).set(overrides).where(eq(users.id, id)).returning({
      id: users.id,
    })

    return user
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateUserAndDeleteVerification(
  db: DatabaseClient,
  userId: string,
  verificationId: string,
  overrides: Partial<Account>,
) {
  try {
    const udpatedAccount = await db.transaction(async (tx) => {
      const [data] = await tx
        .update(accounts)
        .set(overrides)
        .where(eq(accounts.userId, userId))
        .returning()

      if (data) {
        await tx.delete(verification).where(eq(verification.id, verificationId))
      }
      return data
    })

    return udpatedAccount
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
