import { ApiError } from "@app/error"
import { desc, eq } from "drizzle-orm"
import { dbHttp } from "../index"
import { verification } from "../schema/index"
import type { Verification } from "../types/index"

export async function findVerificationByIdentifier(identifier: string) {
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

export async function createVerification(
  values: Omit<Verification, "createdAt" | "updatedAt" | "id">,
) {
  try {
    await dbHttp.insert(verification).values(values)
    return true
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
