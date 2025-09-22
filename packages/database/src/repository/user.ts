import { ApiError } from "@app/error/index"
import { eq } from "drizzle-orm"
import { dbHttp, dbWs } from "../index"
import { accounts } from "../schema/accounts"
import {
  roles,
  storage,
  verification,
  workspace,
  workspaceMembers,
} from "../schema/index"
import { users } from "../schema/users"
import type { Account, BootStrapUser, User } from "../types"

export async function getUserByEmail(email: string) {
  try {
    const [user] = await dbHttp
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .$withCache()
    return user
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getUserWithAccount(email: string) {
  try {
    const data = await dbHttp
      .select()
      .from(users)
      .innerJoin(accounts, eq(users.id, accounts.userId))
      .where(eq(users.email, email))
      .$withCache()

    if (data.length === 0) {
      return null
    }

    const formatted = {
      user: data[0]?.user,
      accounts: data.map((a) => a.account),
    }

    return formatted
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getUserByUserName(username: string) {
  try {
    const [data] = await dbHttp
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    return Boolean(data?.id)
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function bootStrapUser({
  email,
  name,
  username,
  image,
  password,
  defaultRole,
}: BootStrapUser) {
  try {
    const data = await dbWs.transaction(async (tx) => {
      const [user] = await tx
        .insert(users)
        .values({
          email,
          name,
          username,
          image,
        })
        .returning({ id: users.id })

      // Rollback the transaction if no user is created
      if (!user) tx.rollback()
      const userId = user?.id as string

      await tx.insert(accounts).values({
        password,
        userId: userId,
        accountId: userId,
        providerId: "credential",
      })

      const [userWorkspace] = await tx
        .insert(workspace)
        .values({
          ownerId: userId,
        })
        .returning()

      // Rollback the transaction if no workspace is created
      if (!userWorkspace) tx.rollback()
      const workspaceId = userWorkspace?.id as string
      const [role] = await tx
        .select()
        .from(roles)
        .where(eq(roles.name, defaultRole))
        .limit(1)

      // Rollback the transaction if no role is found
      if (!role) tx.rollback()

      await tx.insert(workspaceMembers).values({
        roleId: role?.id!,
        workspaceId,
        userId,
      })

      await tx.insert(storage).values({
        workspaceId,
      })

      return {
        user: {
          id: user?.id!,
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
  email: string,
  overrides: Partial<User>,
) {
  try {
    const [user] = await dbHttp
      .update(users)
      .set(overrides)
      .where(eq(users.email, email))
      .returning()
    return user
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateUserById(id: string, overrides: Partial<User>) {
  try {
    const [user] = await dbHttp
      .update(users)
      .set(overrides)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
      })

    return user
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateUserAndDeleteVerification(
  userId: string,
  verificationId: string,
  overrides: Partial<Account>,
) {
  try {
    const udpatedAccount = await dbWs.transaction(async (tx) => {
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

export async function getUserById(userId: string) {
  try {
    const [user] = await dbHttp
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    return user
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
