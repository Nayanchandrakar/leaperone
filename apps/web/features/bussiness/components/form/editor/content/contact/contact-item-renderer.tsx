import type { ContactItem } from "@app/core/types"
import { memo, useCallback } from "react"
import { AddressContactForm } from "@/features/bussiness/components/form/editor/content/contact/address-contact-form"
import { EmailContactForm } from "@/features/bussiness/components/form/editor/content/contact/email-contact-form"
import { PhoneContactForm } from "@/features/bussiness/components/form/editor/content/contact/phone-contact-form"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"

interface ContactItemRendererProps {
  item: ContactItem
  index: number
  subIndex: number
  onDelete: (index: number) => void
}

export const ContactItemRenderer = memo(
  ({ item, index, subIndex, onDelete }: ContactItemRendererProps) => {
    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    return (
      <SortableSubListItem itemId={item?.id} onItemDelete={handleDelete}>
        {item?.type === "phone" && <PhoneContactForm index={index} contactIdx={subIndex} />}
        {item?.type === "email" && <EmailContactForm index={index} contactIdx={subIndex} />}
        {item?.type === "address" && <AddressContactForm index={index} contactIdx={subIndex} />}
      </SortableSubListItem>
    )
  },
)

ContactItemRenderer.displayName = "ContactItemRenderer"
