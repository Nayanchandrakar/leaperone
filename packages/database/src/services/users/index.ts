import { eq } from "drizzle-orm"
import { dbHttp, dbWs } from "../../index"
import { accounts, users } from "../../schema/users"

export async function getUserByEmail(email: string) {
  const [user] = await dbHttp
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  return user
}

export async function isUserNameTaken(username: string) {
  const [data] = await dbHttp
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username))
    .limit(1)

  return Boolean(data?.id)
}

export async function createUser({
  email,
  name,
  hash,
  username,
}: {
  username: string
  email: string
  name: string
  hash: string
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
          password: hash,
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
