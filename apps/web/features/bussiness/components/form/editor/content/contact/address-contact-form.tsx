import type { ContactAddressItem, ContactDetailsSection } from "@app/core/types"
import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface AddressContactFormProps {
  contactIdx: number
  index: number
}

export const AddressContactForm = memo(({ contactIdx, index }: AddressContactFormProps) => {
  const { item, updateSubSectionField } = useContentEditorStore(
    useShallow((state) => ({
      item: (state.sections[index] as ContactDetailsSection).items[
        contactIdx
      ] as ContactAddressItem,
      updateSubSectionField: state.updateSubSectionField,
    })),
  )

  return (
    <div className="grid grid-cols-1 @[45rem]/editor-sub-sort:grid-cols-2 gap-3">
      <Field className="@[45rem]/editor-sub-sort:col-span-2">
        <FieldLabel>Label</FieldLabel>
        <Input
          value={item?.label}
          onChange={(e) =>
            updateSubSectionField(index, contactIdx, ["items"], ["label"], e?.target?.value ?? "")
          }
        />
      </Field>

      <Field>
        <FieldLabel>Address Line 1</FieldLabel>
        <Input
          value={item?.streetAddress1}
          onChange={(e) =>
            updateSubSectionField(
              index,
              contactIdx,
              ["items"],
              ["streetAddress1"],
              e?.target?.value ?? "",
            )
          }
        />
      </Field>

      <Field>
        <FieldLabel>Address Line 2</FieldLabel>
        <Input
          value={item?.streetAddress2}
          onChange={(e) =>
            updateSubSectionField(
              index,
              contactIdx,
              ["items"],
              ["streetAddress2"],
              e?.target?.value ?? "",
            )
          }
        />
      </Field>

      <Field>
        <FieldLabel>City</FieldLabel>
        <Input
          value={item?.cityName}
          onChange={(e) =>
            updateSubSectionField(
              index,
              contactIdx,
              ["items"],
              ["cityName"],
              e?.target?.value ?? "",
            )
          }
        />
      </Field>

      <Field>
        <FieldLabel>State</FieldLabel>
        <Input
          value={item?.stateName}
          onChange={(e) =>
            updateSubSectionField(
              index,
              contactIdx,
              ["items"],
              ["stateName"],
              e?.target?.value ?? "",
            )
          }
        />
      </Field>

      <Field>
        <FieldLabel>Zip Code</FieldLabel>
        <Input
          type="number"
          value={item?.zipCode}
          onChange={(e) =>
            updateSubSectionField(
              index,
              contactIdx,
              ["items"],
              ["zipCode"],
              Number(e?.target?.value ?? 0),
            )
          }
        />
      </Field>

      <Field>
        <FieldLabel>Country</FieldLabel>
        <Input
          value={item?.countryName}
          onChange={(e) =>
            updateSubSectionField(
              index,
              contactIdx,
              ["items"],
              ["countryName"],
              e?.target?.value ?? "",
            )
          }
        />
      </Field>

      <Field>
        <FieldLabel className="flex items-center justify-between">
          <span>Location Link Button Label</span>
          <button
            type="button"
            onClick={() =>
              updateSubSectionField(
                index,
                contactIdx,
                ["items"],
                ["location", "enabled"],
                !item?.location?.enabled,
              )
            }
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
          value={item?.location?.label}
          onChange={(e) =>
            updateSubSectionField(
              index,
              contactIdx,
              ["items"],
              ["location", "label"],
              e?.target?.value ?? "",
            )
          }
        />
      </Field>

      <Field>
        <FieldLabel>Google Map Location URL</FieldLabel>
        <Input
          value={item?.location?.url}
          onChange={(e) =>
            updateSubSectionField(
              index,
              contactIdx,
              ["items"],
              ["location", "url"],
              e?.target?.value ?? "",
            )
          }
        />
      </Field>
    </div>
  )
})
