import { ApiError } from "@app/error"
import { contactUs } from "../schema/contact-us"
import type { DatabaseClient, InsertContactUs } from "../types"

export async function createContact(db: DatabaseClient, values: InsertContactUs) {
  try {
    await db.insert(contactUs).values(values)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
