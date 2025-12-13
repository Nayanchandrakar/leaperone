import type { ContactDetailsSection, ContactItem } from "@app/core/types"
import { useShallow } from "zustand/react/shallow"
import { AddressContactForm } from "@/features/bussiness/components/form/editor/content/contact/address-contact-form"
import { EmailContactForm } from "@/features/bussiness/components/form/editor/content/contact/email-contact-form"
import { PhoneContactForm } from "@/features/bussiness/components/form/editor/content/contact/phone-contact-form"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface ContactItemsListProps {
  index: number
}

export function ContactItemsList({ index }: ContactItemsListProps) {
  const { section, moveItem, removeItem } = useContentEditorStore(
    useShallow((state) => ({
      section: state.sections[index] as ContactDetailsSection,
      moveItem: state.moveItem,
      removeItem: state.removeItem,
    })),
  )

  return (
    <SortableList
      items={section?.items}
      onOrderChange={(fromIndex, toIndex) => moveItem(index, ["items"], fromIndex, toIndex)}
      renderItem={(contactItem: ContactItem, currentIndex: number) => (
        <SortableSubListItem
          key={contactItem?.id}
          itemId={contactItem?.id}
          onItemDelete={() => removeItem(index, ["items"], currentIndex)}
        >
          {contactItem?.type === "phone" && (
            <PhoneContactForm key={currentIndex} index={index} contactIdx={currentIndex} />
          )}

          {contactItem?.type === "email" && (
            <EmailContactForm key={currentIndex} index={index} contactIdx={currentIndex} />
          )}

          {contactItem?.type === "address" && (
            <AddressContactForm key={currentIndex} index={index} contactIdx={currentIndex} />
          )}
        </SortableSubListItem>
      )}
    />
  )
}
