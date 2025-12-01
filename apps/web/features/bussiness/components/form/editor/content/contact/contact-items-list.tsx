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
      {(field) => (
        <EditorSortProvider data={field.state.value} onDataChange={field.moveValue}>
          <EditorSortGroup>
            {(contact: ContactItemSchema, contactIdx) => (
              <EditorSubSortItem
                id={contact?.id}
                key={contact?.id}
                onDelete={() => field.removeValue(contactIdx)}
              >
                {contact?.type === "phone" && (
                  <PhoneContactForm
                    key={contact?.id}
                    form={form}
                    sectionIdx={sectionIdx}
                    contactIdx={contactIdx}
                  />
                )}

                {contact?.type === "email" && (
                  <EmailContactForm
                    key={contact?.id}
                    form={form}
                    sectionIdx={sectionIdx}
                    contactIdx={contactIdx}
                  />
                )}

                {contact?.type === "address" && (
                  <AddressContactForm
                    key={contact?.id}
                    form={form}
                    sectionIdx={sectionIdx}
                    contactIdx={contactIdx}
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
