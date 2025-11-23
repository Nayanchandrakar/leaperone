import { Button } from "@app/ui/components/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { Switch } from "@app/ui/components/switch"
import { EyeIcon, EyeOffIcon, PlusIcon } from "lucide-react"
import { useState } from "react"
import z from "zod"
import { useAppForm } from "@/components/ui/app-form"
import {
  EditorBlock,
  EditorBlockContent,
  EditorBlockGrip,
  EditorBlockGroup,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { EditorSubSortTwoColumnGrid } from "../../ui/editor-form-layout"
import { EditorSortGroup, EditorSortProvider, EditorSubSortItem } from "../../ui/editor-sort"

export default function ContentEditor() {
  const contactIcons = [
    {
      id: "1",
      name: "profile",
      icon: "facebook",
    },
    {
      id: "2",
      name: "Instagram",
      icon: "instagram",
    },
    {
      id: "3",
      name: "Twitter",
      icon: "twitter",
    },
    {
      id: "4",
      name: "LinkedIn",
      icon: "linkedin",
    },
    {
      id: "5",
      name: "YouTube",
      icon: "youtube",
    },
  ]

  const [contactIconsState, setContactIconsState] = useState(contactIcons)
  const isInvalid = false

  const formSchema = z.object({
    enabled: z.boolean(),
    name: z.string().min(1),
  })

  const form = useAppForm({
    defaultValues: {
      name: "",
      enabled: false,
    },
    validators: {
      onChange: formSchema,
    },
  })

  return (
    <section>
      <EditorBlock defaultValue="profile">
        <EditorBlockItem value="profile">
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
                    return <field.TextField label="Name" variant="gray" />
                  }}
                />

                <form.Field
                  name="name"
                  children={(field) => {
                    const inInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={inInvalid}>
                        <div className="flex items-center gap-2">
                          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                          <form.Field
                            name="enabled"
                            children={(field2) => {
                              const Icon = field2.state.value ? EyeIcon : EyeOffIcon
                              return (
                                <Icon
                                  className="size-4 cursor-pointer"
                                  onClick={() => field2.handleChange(!field2.state.value)}
                                />
                              )
                            }}
                          />
                        </div>

                        <Input
                          variant="gray"
                          id={field.name}
                          name={field.name}
                          aria-invalid={inInvalid}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />

                        {inInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  <EditorSortProvider data={contactIconsState} onDataChange={setContactIconsState}>
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
        </EditorBlockItem>
      </EditorBlock>
    </section>
  )
}

type FieldVisibilityProps = {
  label: string
  visible: boolean
  onVisibleChange?: (visible: boolean) => void
}

export const FieldVisibility = ({ label, visible, onVisibleChange }: FieldVisibilityProps) => {
  const Icon = visible ? EyeIcon : EyeOffIcon

  return (
    <div className="flex items-center gap-2">
      <FieldLabel>{label}</FieldLabel>
      <button type="button" onClick={() => onVisibleChange?.(!visible)} className="cursor-pointer">
        <Icon className="size-4" />
      </button>
    </div>
  )
}
