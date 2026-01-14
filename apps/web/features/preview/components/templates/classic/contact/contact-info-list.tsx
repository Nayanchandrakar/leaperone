import type { ContactAddressItem, ContactItem, EmailLink, PhoneLink } from "@app/types"
import {
  ContactInfoItem,
  ContactInfoValue,
} from "@/features/preview/components/ui/contact-info-item"

type ContactInfoListProps = {
  contacts: ContactItem[]
}

export const PhoneDetails = ({ label, phoneNumber }: PhoneLink) => (
  <ContactInfoItem label={label}>
    <ContactInfoValue>{phoneNumber}</ContactInfoValue>
  </ContactInfoItem>
)

export const AddressDetails = ({
  label,
  zipCode,
  cityName,
  stateName,
  countryName,
  streetAddress1,
  streetAddress2,
}: ContactAddressItem) => {
  const addressLines = [
    streetAddress1,
    streetAddress2,
    cityName,
    stateName,
    zipCode,
    countryName,
  ].filter(Boolean)

  return (
    <ContactInfoItem label={label}>
      {addressLines.map((line, index) => (
        <ContactInfoValue key={index}>{line}</ContactInfoValue>
      ))}
    </ContactInfoItem>
  )
}

const EmailDetails = ({ email, label }: EmailLink) => (
  <ContactInfoItem label={label}>
    <ContactInfoValue>{email}</ContactInfoValue>
  </ContactInfoItem>
)

export const ContactInfoList = ({ contacts }: ContactInfoListProps) => (
  <address className="w-full space-y-3 not-italic">
    {contacts?.map((contact) => {
      switch (contact.type) {
        case "email":
          return <EmailDetails key={contact.id} {...contact} />
        case "address":
          return <AddressDetails key={contact.id} {...contact} />
        case "phone":
          return <PhoneDetails key={contact.id} {...contact} />
        default:
          return null
      }
    })}
  </address>
)
