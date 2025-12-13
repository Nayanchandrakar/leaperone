import type { ContactAddressItem, ContactDetailsSection } from "@app/core/types"
import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface AddressContactFormProps {
  contactIdx: number
  index: number
}

export function AddressContactForm({ contactIdx, index }: AddressContactFormProps) {
  const { section, updateItem } = useContentEditorStore(
    useShallow((state) => ({
      section: state.sections[index] as ContactDetailsSection,
      updateItem: state.updateItem,
    })),
  )

  const handleFieldChange = useCallback(
    (field: string, value: string | number) => {
      if (section.type === "contact-details") {
        const currentItem = section.items[contactIdx]
        updateItem(index, ["items"], contactIdx, {
          ...currentItem,
          [field]: value,
        })
      }
    },
    [section, index, contactIdx, updateItem],
  )

  const handleLocationLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "contact-details") {
        const currentItem = section.items[contactIdx]
        if (currentItem.type === "address") {
          updateItem(index, ["items"], contactIdx, {
            ...currentItem,
            location: {
              ...currentItem.location,
              label: e.target.value,
            },
          })
        }
      }
    },
    [section, index, contactIdx, updateItem],
  )

  const handleLocationEnabledToggle = useCallback(() => {
    if (section.type === "contact-details") {
      const currentItem = section.items[contactIdx]
      if (currentItem.type === "address") {
        updateItem(index, ["items"], contactIdx, {
          ...currentItem,
          location: {
            ...currentItem.location,
            enabled: !currentItem.location.enabled,
          },
        })
      }
    }
  }, [section, index, contactIdx, updateItem])

  const handleLocationUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "contact-details") {
        const currentItem = section.items[contactIdx]
        if (currentItem.type === "address") {
          updateItem(index, ["items"], contactIdx, {
            ...currentItem,
            location: {
              ...currentItem.location,
              url: e.target.value,
            },
          })
        }
      }
    },
    [section, index, contactIdx, updateItem],
  )

  const item = section?.items[contactIdx] as ContactAddressItem

  return (
    <div className="grid grid-cols-1 @[45rem]/editor-sub-sort:grid-cols-2 gap-3">
      <Field className="@[45rem]/editor-sub-sort:col-span-2">
        <FieldLabel>Label</FieldLabel>
        <Input
          value={item?.label}
          onChange={(e) => handleFieldChange("label", e?.target?.value ?? "")}
        />
      </Field>

      <Field>
        <FieldLabel>Address Line 1</FieldLabel>
        <Input
          value={item?.streetAddress1}
          onChange={(e) => handleFieldChange("streetAddress1", e?.target?.value ?? "")}
        />
      </Field>

      <Field>
        <FieldLabel>Address Line 2</FieldLabel>
        <Input
          value={item?.streetAddress2}
          onChange={(e) => handleFieldChange("streetAddress2", e?.target?.value ?? "")}
        />
      </Field>

      <Field>
        <FieldLabel>City</FieldLabel>
        <Input
          value={item?.cityName}
          onChange={(e) => handleFieldChange("cityName", e?.target?.value ?? "")}
        />
      </Field>

      <Field>
        <FieldLabel>State</FieldLabel>
        <Input
          value={item?.stateName}
          onChange={(e) => handleFieldChange("stateName", e?.target?.value ?? "")}
        />
      </Field>

      <Field>
        <FieldLabel>Zip Code</FieldLabel>
        <Input
          type="number"
          value={item?.zipCode}
          onChange={(e) => handleFieldChange("zipCode", Number(e?.target?.value ?? 0))}
        />
      </Field>

      <Field>
        <FieldLabel>Country</FieldLabel>
        <Input
          value={item?.countryName}
          onChange={(e) => handleFieldChange("countryName", e?.target?.value ?? "")}
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
        <Input value={item?.location?.label} onChange={handleLocationLabelChange} />
      </Field>

      <Field>
        <FieldLabel>Google Map Location URL</FieldLabel>
        <Input value={item?.location?.url} onChange={handleLocationUrlChange} />
      </Field>
    </div>
  )
}
