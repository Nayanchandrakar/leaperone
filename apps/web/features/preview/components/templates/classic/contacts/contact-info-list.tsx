import type { ContactAddressItem, ContactItem, EmailLink, PhoneLink } from "@app/core/types"
import {
  ContactInfoItem,
  ContactInfoValue,
} from "@/features/preview/components/ui/contact-info-item"

type ContactInfoListProps = {
  contacts: ContactItem[]
}

export const PhoneDetails = ({ phone }: { phone: PhoneLink }) => (
  <ContactInfoItem label="Contact number">
    <ContactInfoValue>{phone.url}</ContactInfoValue>
  </ContactInfoItem>
)

export const AddressDetails = ({ address }: { address: ContactAddressItem }) => {
  const addressLines = [
    address.streetAddress1,
    address.streetAddress2,
    address.cityName,
    address.stateName,
    address.zipCode,
    address.countryName,
  ].filter(Boolean)

  return (
    <ContactInfoItem label={address?.label}>
      {addressLines.map((line, index) => (
        <ContactInfoValue key={index}>{line}</ContactInfoValue>
      ))}
    </ContactInfoItem>
  )
}

const EmailDetails = ({ email }: { email: EmailLink }) => (
  <ContactInfoItem label="Email">
    <ContactInfoValue>{email.url}</ContactInfoValue>
  </ContactInfoItem>
)

export const ContactInfoList = ({ contacts }: ContactInfoListProps) => (
  <address className="w-full space-y-3 not-italic">
    {contacts?.map((contact) => {
      switch (contact.type) {
        case "address":
          return <AddressDetails key={contact.id} address={contact} />
        case "phone":
          return <PhoneDetails key={contact.id} phone={contact} />
        case "email":
          return <EmailDetails key={contact.id} email={contact} />
        default:
          return null
      }
    })}
  </address>
)
