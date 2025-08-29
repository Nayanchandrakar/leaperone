import { eq } from "drizzle-orm"
import { dbHttp, dbWs } from "../../index"
import { accounts, users } from "../../schema/users"

export async function getUserByEmail(email: string) {
  const [user] = await dbHttp
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .$withCache()
  return user
}

export async function getUserWithAccountsByEmail(email: string) {
  const data = await dbHttp
    .select()
    .from(users)
    .innerJoin(accounts, eq(users.id, accounts.userId))
    .where(eq(users.email, email))
    .$withCache()

  const formatted =
    data.length > 0
      ? {
          user: data[0]?.user,
          accounts: data.map((r) => r.accounts),
        }
      : null

  return formatted
}

export async function isUserNameTaken(username: string) {
  const [data] = await dbHttp
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username))
    .limit(1)
    .$withCache()

  return Boolean(data?.id)
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
  } catch (e) {
    console.log(e)
    return false
  }
}
