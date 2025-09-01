import { eq } from "drizzle-orm"
import { dbHttp, dbWs } from "../../index"
import { accounts, users } from "../../schema"

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
    console.log(error)
    return null
  }
}

export async function getUserAndAccounts(email: string) {
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

export async function isUserNameTaken(username: string) {
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

export async function createUser({
  email,
  name,
  hashedPassword,
  username,
}: {
  username: string
  email: string
  name: string
  hashedPassword: string
}) {
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
          userId: data.id,
          password: hashedPassword,
          providerId: "credential",
          accountId: data.id,
        })
      }
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
