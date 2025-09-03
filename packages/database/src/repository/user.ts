import { eq } from "drizzle-orm"
import { dbHttp, dbWs } from "../index"
import { accounts } from "../schema/accounts"
import { users } from "../schema/users"

export class UserRepository {
  private static instance: UserRepository | null = null
  private constructor() {}

  public static init() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository()
    }
    return UserRepository.instance
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
        .$withCache()

      return Boolean(data?.id)
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async createUser(
    email: string,
    username: string,
    password: string,
    name: string,
  ) {
    try {
      await dbWs.transaction(async (tx) => {
        const [data] = await tx
          .insert(users)
          .values({
            email,
            name,
            username,
            emailVerified: false,
          })
          .returning()

        if (data) {
          await tx.insert(accounts).values({
            password,
            userId: data.id,
            accountId: data.id,
            providerId: "credential",
          })
        }
      })

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
