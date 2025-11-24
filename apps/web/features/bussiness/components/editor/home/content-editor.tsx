import { useAppForm } from "@/components/ui/app-form"
import { ContentFormRenderer } from "@/features/bussiness/components/form/editor/content/content-form-renderer"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortGroup, EditorSortProvider } from "@/features/bussiness/components/ui/editor-sort"
import { useContentFormOptions } from "@/features/bussiness/hooks/home/use-content-form-options"
import type { ContentEditorSortItem } from "@/features/bussiness/types"

export default function ContentEditor() {
  const formOptions = useContentFormOptions()
  const form = useAppForm(formOptions)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <form.AppForm>
        <EditorBlock defaultValue={formOptions?.defaultValues?.sections[0]?.id!}>
          <form.AppField
            name="sections"
            children={(field) => {
              return (
                <EditorSortProvider data={field.state.value} onDataChange={field.handleChange}>
                  <EditorSortGroup>
                    {(item: ContentEditorSortItem, index) => (
                      <ContentFormRenderer key={index} form={form} item={item} index={index} />
                    )}
                  </EditorSortGroup>
                </EditorSortProvider>
              )
            }}
          />
          {/* <EditorBlockItem value="profile">
            <EditorBlockHeader>
              <EditorBlockGroup>
                <EditorBlockGrip />
                <EditorBlockTitle>Card Profile</EditorBlockTitle>
              </EditorBlockGroup>

              <EditorBlockGroup>
                <Switch checked />
                <EditorBlockTrigger />
              </EditorBlockGroup>
            </EditorBlockHeader>

            <EditorBlockContent>
              <FieldGroup>
                <FieldSet>
                  <form.AppField
                    name="name"
                    children={(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <form.Field
                            name="enabled"
                            children={(field2) => {
                              return (
                                <ToggleField
                                  label="Name"
                                  value={field2.state.value}
                                  onClick={field2.handleChange}
                                />
                              )
                            }}
                          />
                          <Input
                            variant="gray"
                            id={field.name}
                            name={field.name}
                            aria-invalid={isInvalid}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                      )
                    }}
                  />
                  <Field className="bg-emerald-200">
                    <form.AppField
                      name="name"
                      children={(field) => {
                        return <field.TextField label="Name" variant="gray" />
                      }}
                    />
                  </Field>

                  <div className="grid @lg/editor-block-content:grid-cols-2 gap-4">
                    <Field data-invalid={isInvalid}>
                      <FieldVisibility label="Name" visible />
                      <Input variant="gray" />
                    </Field>

                    <Field data-invalid={isInvalid}>
                      <FieldVisibility label="Name" visible />
                      <Input variant="gray" />
                    </Field>
                  </div>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                  <FieldGroup>
                    <Field orientation="horizontal" className="w-fit">
                      <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
                      <Switch id="newsletter" />
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSet>
                  <FieldGroup className="gap-7 sm:gap-8">
                    <EditorSortProvider
                      data={contactIconsState}
                      onDataChange={setContactIconsState}
                    >
                      <EditorSortGroup>
                        {(item) => {
                          return (
                            <EditorSubSortItem
                              id={item.id}
                              key={item.id}
                              onDelete={() => {
                                setContactIconsState((prev) => prev.filter((i) => i.id !== item.id))
                              }}
                            >
                              <EditorSubSortTwoColumnGrid>
                                <Field>
                                  <Select>
                                    <SelectTrigger className="bg-white">
                                      <SelectValue placeholder="Choose department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="engineering">Engineering</SelectItem>
                                      <SelectItem value="design">Design</SelectItem>
                                      <SelectItem value="marketing">Marketing</SelectItem>
                                      <SelectItem value="sales">Sales</SelectItem>
                                      <SelectItem value="support">Customer Support</SelectItem>
                                      <SelectItem value="hr">Human Resources</SelectItem>
                                      <SelectItem value="finance">Finance</SelectItem>
                                      <SelectItem value="operations">Operations</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </Field>
                                <Input variant="default" />
                              </EditorSubSortTwoColumnGrid>
                            </EditorSubSortItem>
                          )
                        }}
                      </EditorSortGroup>
                    </EditorSortProvider>

                    <Button
                      size="lg"
                      variant="green-outline"
                      className="w-fit px-6"
                      onClick={() => {
                        setContactIconsState((prev) => [
                          ...prev,
                          { id: (prev.length + 1).toString(), name: "", icon: "" },
                        ])
                      }}
                    >
                      <PlusIcon />
                      <span>Add more contact icons</span>
                    </Button>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </EditorBlockContent>
          </EditorBlockItem> */}
        </EditorBlock>
      </form.AppForm>
    </form>
  )
}
