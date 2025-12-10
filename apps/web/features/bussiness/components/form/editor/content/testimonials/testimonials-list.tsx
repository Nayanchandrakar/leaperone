import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useCallback } from "react"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface TestimonialsListProps {
  sectionIdx: number
}

export function TestimonialsList({ sectionIdx }: TestimonialsListProps) {
  const section = useContentSection(sectionIdx)
  const updateItem = useContentEditorStore((state) => state.updateItem)
  const removeItem = useContentEditorStore((state) => state.removeItem)
  const moveItem = useContentEditorStore((state) => state.moveItem)

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveItem(sectionIdx, ["testimonials"], oldIndex, newIndex)
    },
    [sectionIdx, moveItem],
  )

  const handleAuthorNameChange = useCallback(
    (testimonialIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "testimonials") {
        const currentTestimonial = section.testimonials[testimonialIdx]
        updateItem(sectionIdx, ["testimonials"], testimonialIdx, {
          ...currentTestimonial,
          authorName: e.target.value,
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleDesignationChange = useCallback(
    (testimonialIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "testimonials") {
        const currentTestimonial = section.testimonials[testimonialIdx]
        updateItem(sectionIdx, ["testimonials"], testimonialIdx, {
          ...currentTestimonial,
          authorDesignation: e.target.value,
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleProfileEnabledChange = useCallback(
    (testimonialIdx: number, checked: boolean) => {
      if (section.type === "testimonials") {
        const currentTestimonial = section.testimonials[testimonialIdx]
        updateItem(sectionIdx, ["testimonials"], testimonialIdx, {
          ...currentTestimonial,
          authorProfile: {
            ...currentTestimonial.authorProfile,
            enabled: checked,
          },
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleTestimonialTextChange = useCallback(
    (testimonialIdx: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (section.type === "testimonials") {
        const currentTestimonial = section.testimonials[testimonialIdx]
        updateItem(sectionIdx, ["testimonials"], testimonialIdx, {
          ...currentTestimonial,
          testimonialText: {
            ...currentTestimonial.testimonialText,
            text: e.target.value,
          },
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleTestimonialEnabledToggle = useCallback(
    (testimonialIdx: number) => {
      if (section.type === "testimonials") {
        const currentTestimonial = section.testimonials[testimonialIdx]
        updateItem(sectionIdx, ["testimonials"], testimonialIdx, {
          ...currentTestimonial,
          testimonialText: {
            ...currentTestimonial.testimonialText,
            enabled: !currentTestimonial.testimonialText.enabled,
          },
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleDelete = useCallback(
    (testimonialIdx: number) => {
      removeItem(sectionIdx, ["testimonials"], testimonialIdx)
    },
    [sectionIdx, removeItem],
  )

  if (section.type !== "testimonials") return null
  const hasTestimonials = section.testimonials?.length > 0
  if (!hasTestimonials) return null

  return (
    <EditorSortProvider data={section.testimonials} onDataChange={handleDataChange}>
      <EditorSortGroup>
        {(testimonial: any, testimonialIdx: number) => (
          <EditorSubSortItem
            id={testimonial.id}
            key={testimonial.id}
            onDelete={() => handleDelete(testimonialIdx)}
          >
            <FieldSet>
              <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor={`testimonial-${testimonialIdx}-name`}>Name</FieldLabel>
                  <Input
                    id={`testimonial-${testimonialIdx}-name`}
                    value={testimonial.authorName}
                    onChange={(e) => handleAuthorNameChange(testimonialIdx, e)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`testimonial-${testimonialIdx}-designation`}>
                    Designation/Company
                  </FieldLabel>
                  <Input
                    id={`testimonial-${testimonialIdx}-designation`}
                    value={testimonial.authorDesignation}
                    onChange={(e) => handleDesignationChange(testimonialIdx, e)}
                  />
                </Field>
              </div>

              <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
                <Field className="w-fit">
                  <FieldLabel
                    htmlFor={`testimonial-${testimonialIdx}-profile-enabled`}
                    className="flex-row gap-2"
                  >
                    <span>Profile</span>
                    <Switch
                      id={`testimonial-${testimonialIdx}-profile-enabled`}
                      checked={testimonial.authorProfile.enabled}
                      onCheckedChange={(checked) =>
                        handleProfileEnabledChange(testimonialIdx, checked)
                      }
                    />
                  </FieldLabel>
                  <EditorImageUploader src={testimonial.authorProfile.imageSrc} />
                </Field>

                <Field className="h-full">
                  <FieldLabel className="flex items-center justify-between">
                    <span>Testimonial</span>
                    <button
                      type="button"
                      onClick={() => handleTestimonialEnabledToggle(testimonialIdx)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {testimonial.testimonialText.enabled ? (
                        <EyeIcon className="size-4" />
                      ) : (
                        <EyeOffIcon className="size-4" />
                      )}
                    </button>
                  </FieldLabel>
                  <Textarea
                    className="h-full"
                    value={testimonial.testimonialText.text}
                    onChange={(e) => handleTestimonialTextChange(testimonialIdx, e)}
                  />
                </Field>
              </div>
            </FieldSet>
          </EditorSubSortItem>
        )}
      </EditorSortGroup>
    </EditorSortProvider>
  )
}
