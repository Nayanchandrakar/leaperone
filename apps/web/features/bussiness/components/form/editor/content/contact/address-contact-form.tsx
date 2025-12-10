import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useCallback } from "react"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface AddressContactFormProps {
  contactIdx: number
  sectionIdx: number
}

export function AddressContactForm({ contactIdx, sectionIdx }: AddressContactFormProps) {
  const section = useContentSection(sectionIdx)
  const updateItem = useContentEditorStore((state) => state.updateItem)

  const handleFieldChange = useCallback(
    (field: string, value: string | number) => {
      if (section.type === "contact-details") {
        const currentItem = section.items[contactIdx]
        updateItem(sectionIdx, ["items"], contactIdx, {
          ...currentItem,
          [field]: value,
        })
      }
    },
    [section, sectionIdx, contactIdx, updateItem],
  )

  const handleLocationLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "contact-details") {
        const currentItem = section.items[contactIdx]
        if (currentItem.type === "address") {
          updateItem(sectionIdx, ["items"], contactIdx, {
            ...currentItem,
            location: {
              ...currentItem.location,
              label: e.target.value,
            },
          })
        }
      }
    },
    [section, sectionIdx, contactIdx, updateItem],
  )

  const handleLocationEnabledToggle = useCallback(() => {
    if (section.type === "contact-details") {
      const currentItem = section.items[contactIdx]
      if (currentItem.type === "address") {
        updateItem(sectionIdx, ["items"], contactIdx, {
          ...currentItem,
          location: {
            ...currentItem.location,
            enabled: !currentItem.location.enabled,
          },
        })
      }
    }
  }, [section, sectionIdx, contactIdx, updateItem])

  const handleLocationUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "contact-details") {
        const currentItem = section.items[contactIdx]
        if (currentItem.type === "address") {
          updateItem(sectionIdx, ["items"], contactIdx, {
            ...currentItem,
            location: {
              ...currentItem.location,
              url: e.target.value,
            },
          })
        }
      }
    },
    [section, sectionIdx, contactIdx, updateItem],
  )

  if (section.type !== "contact-details") return null
  const item = section.items[contactIdx]
  if (item.type !== "address") return null

  return (
    <div className="grid grid-cols-1 @[45rem]/editor-sub-sort:grid-cols-2 gap-3">
      <Field className="@[45rem]/editor-sub-sort:col-span-2">
        <FieldLabel htmlFor={`contact-${contactIdx}-label`}>Label</FieldLabel>
        <Input
          id={`contact-${contactIdx}-label`}
          value={item.label}
          onChange={(e) => handleFieldChange("label", e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`contact-${contactIdx}-address1`}>Address Line 1</FieldLabel>
        <Input
          id={`contact-${contactIdx}-address1`}
          value={item.streetAddress1}
          onChange={(e) => handleFieldChange("streetAddress1", e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`contact-${contactIdx}-address2`}>Address Line 2</FieldLabel>
        <Input
          id={`contact-${contactIdx}-address2`}
          value={item.streetAddress2}
          onChange={(e) => handleFieldChange("streetAddress2", e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`contact-${contactIdx}-city`}>City</FieldLabel>
        <Input
          id={`contact-${contactIdx}-city`}
          value={item.cityName}
          onChange={(e) => handleFieldChange("cityName", e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`contact-${contactIdx}-state`}>State</FieldLabel>
        <Input
          id={`contact-${contactIdx}-state`}
          value={item.stateName}
          onChange={(e) => handleFieldChange("stateName", e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`contact-${contactIdx}-zip`}>Zip Code</FieldLabel>
        <Input
          id={`contact-${contactIdx}-zip`}
          type="number"
          value={item.zipCode}
          onChange={(e) => handleFieldChange("zipCode", Number(e.target.value))}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`contact-${contactIdx}-country`}>Country</FieldLabel>
        <Input
          id={`contact-${contactIdx}-country`}
          value={item.countryName}
          onChange={(e) => handleFieldChange("countryName", e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel className="flex items-center justify-between">
          <span>Location Link Button Label</span>
          <button
            type="button"
            onClick={handleLocationEnabledToggle}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {item.location.enabled ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
          </button>
        </FieldLabel>
        <Input
          id={`contact-${contactIdx}-location-label`}
          value={item.location.label}
          onChange={handleLocationLabelChange}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`contact-${contactIdx}-location-url`}>
          Google Map Location URL
        </FieldLabel>
        <Input
          id={`contact-${contactIdx}-location-url`}
          value={item.location.url}
          onChange={handleLocationUrlChange}
        />
      </Field>
    </div>
  )
}
