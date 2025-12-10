import type { ContactItem } from "@app/core/types"
import { useCallback } from "react"
import { AddressContactForm } from "@/features/bussiness/components/form/editor/content/contact/address-contact-form"
import { EmailContactForm } from "@/features/bussiness/components/form/editor/content/contact/email-contact-form"
import { PhoneContactForm } from "@/features/bussiness/components/form/editor/content/contact/phone-contact-form"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface ContactItemsListProps {
  sectionIdx: number
}

export function ContactItemsList({ sectionIdx }: ContactItemsListProps) {
  const section = useContentSection(sectionIdx)
  const removeItem = useContentEditorStore((state) => state.removeItem)
  const moveItem = useContentEditorStore((state) => state.moveItem)

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveItem(sectionIdx, ["items"], oldIndex, newIndex)
    },
    [sectionIdx, moveItem],
  )

  const handleDelete = useCallback(
    (currentIndex: number) => {
      removeItem(sectionIdx, ["items"], currentIndex)
    },
    [sectionIdx, removeItem],
  )

  if (section.type !== "contact-details") return null

  return (
    <EditorSortProvider data={section.items} onDataChange={handleDataChange}>
      <EditorSortGroup>
        {(contactItem: ContactItem, currentIndex: number) => (
          <EditorSubSortItem
            id={contactItem?.id}
            key={contactItem?.id}
            onDelete={() => handleDelete(currentIndex)}
          >
            {contactItem?.type === "phone" && (
              <PhoneContactForm
                key={currentIndex}
                sectionIdx={sectionIdx}
                contactIdx={currentIndex}
              />
            )}

            {contactItem?.type === "email" && (
              <EmailContactForm
                key={currentIndex}
                sectionIdx={sectionIdx}
                contactIdx={currentIndex}
              />
            )}

            {contactItem?.type === "address" && (
              <AddressContactForm
                key={currentIndex}
                sectionIdx={sectionIdx}
                contactIdx={currentIndex}
              />
            )}
          </EditorSubSortItem>
        )}
      </EditorSortGroup>
    </EditorSortProvider>
  )
}
