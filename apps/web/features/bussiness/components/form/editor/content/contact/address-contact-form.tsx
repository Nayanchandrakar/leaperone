import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useCallback } from "react"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface AddressContactFormProps {
  contactIdx: number
  index: number
}

export const AddressContactForm = memo(({ contactIdx, index }: AddressContactFormProps) => {
  const [label, setLabel] = useSubSectionField<string>(index, contactIdx, ["items"], ["label"])
  const [street1, setStreet1] = useSubSectionField<string>(
    index,
    contactIdx,
    ["items"],
    ["streetAddress1"],
  )
  const [street2, setStreet2] = useSubSectionField<string>(
    index,
    contactIdx,
    ["items"],
    ["streetAddress2"],
  )
  const [city, setCity] = useSubSectionField<string>(index, contactIdx, ["items"], ["cityName"])
  const [stateName, setStateName] = useSubSectionField<string>(
    index,
    contactIdx,
    ["items"],
    ["stateName"],
  )
  const [zip, setZip] = useSubSectionField<number>(index, contactIdx, ["items"], ["zipCode"])
  const [country, setCountry] = useSubSectionField<string>(
    index,
    contactIdx,
    ["items"],
    ["countryName"],
  )

  const [locEnabled, setLocEnabled] = useSubSectionField<boolean>(
    index,
    contactIdx,
    ["items"],
    ["location", "enabled"],
  )
  const [locLabel, setLocLabel] = useSubSectionField<string>(
    index,
    contactIdx,
    ["items"],
    ["location", "label"],
  )
  const [locUrl, setLocUrl] = useSubSectionField<string>(
    index,
    contactIdx,
    ["items"],
    ["location", "url"],
  )

  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setLabel(e?.target?.value ?? ""),
    [setLabel],
  )

  const handleStreet1Change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setStreet1(e?.target?.value ?? ""),
    [setStreet1],
  )

  const handleStreet2Change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setStreet2(e?.target?.value ?? ""),
    [setStreet2],
  )

  const handleCityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setCity(e?.target?.value ?? ""),
    [setCity],
  )

  const handleStateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setStateName(e?.target?.value ?? ""),
    [setStateName],
  )

  const handleZipChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setZip(Number(e?.target?.value ?? 0)),
    [setZip],
  )

  const handleCountryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setCountry(e?.target?.value ?? ""),
    [setCountry],
  )

  const handleToggleLocation = useCallback(
    () => setLocEnabled(!locEnabled),
    [locEnabled, setLocEnabled],
  )

  const handleLocationLabelChange = useCallback(
    (value: string) => setLocLabel(value),
    [setLocLabel],
  )

  const handleLocationUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setLocUrl(e?.target?.value ?? ""),
    [setLocUrl],
  )

  return (
    <div className="grid grid-cols-1 @[45rem]/editor-sub-sort:grid-cols-2 gap-3">
      <Field className="@[45rem]/editor-sub-sort:col-span-2">
        <FieldLabel>Label</FieldLabel>
        <Input value={label} onChange={handleLabelChange} />
      </Field>

      <Field>
        <FieldLabel>Address Line 1</FieldLabel>
        <Input value={street1} onChange={handleStreet1Change} />
      </Field>

      <Field>
        <FieldLabel>Address Line 2</FieldLabel>
        <Input value={street2} onChange={handleStreet2Change} />
      </Field>

      <Field>
        <FieldLabel>City</FieldLabel>
        <Input value={city} onChange={handleCityChange} />
      </Field>

      <Field>
        <FieldLabel>State</FieldLabel>
        <Input value={stateName} onChange={handleStateChange} />
      </Field>

      <Field>
        <FieldLabel>Zip Code</FieldLabel>
        <Input type="number" value={zip} onChange={handleZipChange} />
      </Field>

      <Field>
        <FieldLabel>Country</FieldLabel>
        <Input value={country} onChange={handleCountryChange} />
      </Field>

      <ToggleField
        value={locLabel}
        variant="default"
        enabled={locEnabled}
        label="Location Link Button"
        onEnabledChange={handleToggleLocation}
        onValueChange={handleLocationLabelChange}
      />

      <Field>
        <FieldLabel>Google Map Location URL</FieldLabel>
        <Input value={locUrl} onChange={handleLocationUrlChange} />
      </Field>
    </div>
  )
})

AddressContactForm.displayName = "AddressContactForm"
