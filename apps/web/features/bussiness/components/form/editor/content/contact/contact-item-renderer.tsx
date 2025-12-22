import type { ContactItem } from "@app/core/types"
import { memo } from "react"
import { AddressContactForm } from "@/features/bussiness/components/form/editor/content/contact/address-contact-form"
import { EmailContactForm } from "@/features/bussiness/components/form/editor/content/contact/email-contact-form"
import { PhoneContactForm } from "@/features/bussiness/components/form/editor/content/contact/phone-contact-form"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"

interface ContactItemRendererProps {
  item: ContactItem
  index: number
  subIndex: number
  onDelete: () => void
}

export const ContactItemRenderer = memo(
  ({ item, index, subIndex, onDelete }: ContactItemRendererProps) => {
    return (
      <SortableSubListItem itemId={item?.id} onItemDelete={onDelete}>
        {item?.type === "phone" && <PhoneContactForm index={index} contactIdx={subIndex} />}
        {item?.type === "email" && <EmailContactForm index={index} contactIdx={subIndex} />}
        {item?.type === "address" && <AddressContactForm index={index} contactIdx={subIndex} />}
      </SortableSubListItem>
    )
  },
)
