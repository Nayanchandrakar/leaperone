import type { ContactItemSchema, ContentEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { IGNORE_FORM_VALIDATION } from "@/constants/form"
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
  render: ({ form, sectionIdx }) => {
    return (
      <form.AppField mode="array" name={`sections[${sectionIdx}].items`}>
        {(arrayField) => {
          const items = arrayField.state.value

          return (
            <EditorSortProvider
              data={items}
              onDataChange={(oldIndex, newIndex) => {
                console.log({ oldIndex, newIndex })
                arrayField.moveValue(oldIndex, newIndex, IGNORE_FORM_VALIDATION)
              }}
            >
              <EditorSortGroup>
                {(contactItem: ContactItemSchema, currentIndex: number) => {
                  return (
                    <EditorSubSortItem
                      id={contactItem?.id}
                      key={contactItem?.id}
                      onDelete={() => {
                        arrayField.removeValue(currentIndex, IGNORE_FORM_VALIDATION)
                      }}
                    >
                      {contactItem?.type === "phone" && (
                        <PhoneContactForm
                          form={form}
                          key={contactItem?.id}
                          sectionIdx={sectionIdx}
                          contactIdx={currentIndex}
                        />
                      )}

                      {contactItem?.type === "email" && (
                        <EmailContactForm
                          form={form}
                          key={contactItem?.id}
                          sectionIdx={sectionIdx}
                          contactIdx={currentIndex}
                        />
                      )}

                      {contactItem?.type === "address" && (
                        <AddressContactForm
                          key={contactItem?.id}
                          form={form}
                          sectionIdx={sectionIdx}
                          contactIdx={currentIndex}
                        />
                      )}
                    </EditorSubSortItem>
                  )
                }}
              </EditorSortGroup>
            </EditorSortProvider>
          )
        }}
      </form.AppField>
    )
  },
})
