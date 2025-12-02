import type { ContactItemSchema } from "@app/zod/types"
import type { ContactItemType } from "@/features/bussiness/types"
import { generateUUID } from "@/utils"

/**
 * Creates a new contact item based on the contact type
 * @param contactType - The type of contact item to create (phone, email, or address)
 * @returns A new ContactItemSchema object with default values
 */
export function createContactItem(contactType: ContactItemType): ContactItemSchema {
  switch (contactType) {
    case "phone":
      return {
        id: generateUUID(),
        type: "phone",
        label: "",
        url: "",
      }
    case "email":
      return {
        id: generateUUID(),
        type: "email",
        label: "",
        url: "",
      }
    case "address":
      return {
        id: generateUUID(),
        label: "",
        zipCode: 0,
        cityName: "",
        stateName: "",
        countryName: "",
        type: "address",
        streetAddress1: "",
        streetAddress2: "",
        location: {
          enabled: true,
          label: "",
          url: "",
        },
      }
  }
}
