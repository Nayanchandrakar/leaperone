import { ApiError } from "@app/error"
import { desc, eq } from "drizzle-orm"
import { verification } from "../schema/index"
import type { DatabaseClient, Verification } from "../types/index"

export async function findVerificationByIdentifier(db: DatabaseClient, identifier: string) {
  try {
    const [token] = await db
      .select()
      .from(verification)
      .where(eq(verification.identifier, identifier))
      .orderBy(desc(verification.createdAt))
      .limit(1)
    return token
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function createVerification(
  db: DatabaseClient,
  values: Omit<Verification, "createdAt" | "updatedAt" | "id">,
) {
  try {
    await db.insert(verification).values(values)
    return true
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
