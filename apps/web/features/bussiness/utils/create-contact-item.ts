import type { ContactItem } from "@app/core/types"
import type { ContactItemType } from "@/features/bussiness/types"
import { generateUUID } from "@/utils"

/**
 * Creates a new contact item based on the contact type
 * @param contactType - The type of contact item to create (phone, email, or address)
 * @returns A new ContactItem object with default values
 */
export function createContactItem(contactType: ContactItemType): ContactItem {
  switch (contactType) {
    case "phone":
      return {
        id: generateUUID(),
        type: "phone",
        url: "",
      }
    case "email":
      return {
        id: generateUUID(),
        type: "email",
        url: "",
      }
    case "address":
      return {
        id: generateUUID(),
        label: "",
        zipCode: 10001,
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
