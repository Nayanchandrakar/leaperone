import { desc, eq } from "drizzle-orm"
import { dbHttp, dbWs } from "../index"
import { accounts } from "../schema/accounts"
import { member, verification, workspace } from "../schema/index"
import { users } from "../schema/users"
import type { Account, InsertUser, User, Verification } from "../types"

export class AuthRepository {
  private static instance: AuthRepository | null = null
  private constructor() {}

  public static init() {
    if (!AuthRepository.instance) {
      AuthRepository.instance = new AuthRepository()
    }
    return AuthRepository.instance
  }

  public async findUserByEmail(email: string) {
    try {
      const [user] = await dbHttp
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
        .$withCache()
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async findUserWithAccount(email: string) {
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
      console.log(error)
      return null
    }
  }

  async findUserWithUserName(username: string) {
    try {
      const [data] = await dbHttp
        .select({ id: users.id })
        .from(users)
        .where(eq(users.username, username))
        .limit(1)

      return Boolean(data?.id)
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async bootStrapUser({
    email,
    name,
    username,
    image,
    password,
  }: InsertUser & { password: string }) {
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

        await tx.insert(member).values({
          roleId: "unknown",
          workspaceId,
          userId,
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
      return null
    }
  }

  async updateUserByEmail(email: string, overrides: Partial<User>) {
    try {
      const [user] = await dbHttp
        .update(users)
        .set(overrides)
        .where(eq(users.email, email))
        .returning()
      return user
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async updateUserById(id: string, overrides: Partial<User>) {
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
      return null
    }
  }

  async createVerification(
    values: Omit<Verification, "createdAt" | "updatedAt" | "id">,
  ) {
    try {
      await dbHttp.insert(verification).values(values)
      return true
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async findVerificationByIdentifier(identifier: string) {
    try {
      const [token] = await dbHttp
        .select()
        .from(verification)
        .where(eq(verification.identifier, identifier))
        .orderBy(desc(verification.createdAt))
        .limit(1)
      return token
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async updateUserAndDeleteVerification(
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
          await tx
            .delete(verification)
            .where(eq(verification.id, verificationId))
        }
        return data
      })

      return udpatedAccount
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
