import type { ContactItemSchema, ContentEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { AddressContactForm } from "@/features/bussiness/components/form/editor/content/contact/address-contact-form"
import { EmailContactForm } from "@/features/bussiness/components/form/editor/content/contact/email-contact-form"
import { PhoneContactForm } from "@/features/bussiness/components/form/editor/content/contact/phone-contact-form"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"

interface ContactItemsListProps {
  sectionIdx: number
}

export const ContactItemsList = withForm({
  props: {} as ContactItemsListProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => (
    <form.AppField mode="array" name={`sections[${sectionIdx}].items`}>
      {(arrayField) => (
        <EditorSortProvider
          data={arrayField.state.value}
          onDataChange={(oldIndex, newIndex) => {
            arrayField.moveValue(oldIndex, newIndex, {
              dontValidate: true,
            })
          }}
        >
          <EditorSortGroup>
            {(contactItem: ContactItemSchema, currentIndex) => (
              <EditorSubSortItem
                id={contactItem?.id}
                key={contactItem?.id}
                onDelete={() => {
                  arrayField.removeValue(currentIndex)
                }}
              >
                {contactItem?.type === "phone" && (
                  <PhoneContactForm
                    form={form}
                    key={currentIndex}
                    sectionIdx={sectionIdx}
                    contactIdx={currentIndex}
                  />
                )}

                {contactItem?.type === "email" && (
                  <EmailContactForm
                    form={form}
                    key={currentIndex}
                    sectionIdx={sectionIdx}
                    contactIdx={currentIndex}
                  />
                )}

                {contactItem?.type === "address" && (
                  <AddressContactForm
                    form={form}
                    key={currentIndex}
                    sectionIdx={sectionIdx}
                    contactIdx={currentIndex}
                  />
                )}
              </EditorSubSortItem>
            )}
          </EditorSortGroup>
        </EditorSortProvider>
      )}
    </form.AppField>
  ),
})
