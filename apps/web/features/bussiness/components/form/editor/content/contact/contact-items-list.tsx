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
  const { contactDetails, moveSubSection, removeSubSectionItem } = useContentEditorStore(
    useShallow((state) => ({
      moveSubSection: state.moveSubSection,
      removeSubSectionItem: state.removeSubSectionItem,
      contactDetails: state?.sections?.[index] as ContactDetailsSection,
    })),
  )

  return (
    <SortableList
      items={contactDetails?.items}
      onReorder={(fromIndex, toIndex) => moveSubSection(index, ["items"], fromIndex, toIndex)}
      renderItem={(contactItem: ContactItem, currentIndex: number) => (
        <SortableSubListItem
          key={contactItem?.id}
          itemId={contactItem?.id}
          onItemDelete={() => removeSubSectionItem(index, currentIndex, ["items"])}
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
