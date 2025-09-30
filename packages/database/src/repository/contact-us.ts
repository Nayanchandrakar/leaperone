import { ApiError } from "@app/error"
import { dbHttp } from "../index"
import { contactUs } from "../schema/contact-us"
import type { InsertContactUs } from "../types"

export async function createContact(values: InsertContactUs) {
  try {
    await dbHttp.insert(contactUs).values(values)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
