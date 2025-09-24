import { ApiError } from "@app/error/index"
import { dbHttp } from "../index"
import { contactUs } from "../schema/contact-us"
import type { InsertContactUs } from "../types"

export async function createContact(values: InsertContactUs) {
  try {
    const [data] = await dbHttp.insert(contactUs).values(values).returning({
      id: contactUs.id,
    })
    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
