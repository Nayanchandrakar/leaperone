import { Checkbox } from "@app/ui/components/checkbox"
import { Field, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useCallback } from "react"
import { TimePicker } from "@/features/bussiness/components/ui/time-picker"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface BussinessHoursItemProps {
  index: number
  subIndex: number
}

export const BussinessHoursItem = memo(({ index, subIndex }: BussinessHoursItemProps) => {
  const [active, setActive] = useSubSectionField<boolean>(
    index,
    subIndex,
    ["timing", "periods"],
    ["active"],
  )

  const [label, setLabel] = useSubSectionField<string>(
    index,
    subIndex,
    ["timing", "periods"],
    ["label"],
  )

  const [startValue, setStartValue] = useSubSectionField<Date>(
    index,
    subIndex,
    ["timing", "periods"],
    ["start"],
  )

  const [endValue, setEndValue] = useSubSectionField<Date>(
    index,
    subIndex,
    ["timing", "periods"],
    ["end"],
  )

  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e?.target?.value)
    },
    [setLabel],
  )

  return (
    <FieldSet>
      <div className="grid @sm/editor-block-content:grid-cols-2 @lg/editor-block-content:grid-cols-[1.2fr_0.9fr_0.9fr] gap-3 @lg/editor-block-content:max-w-xl">
        <Field
          orientation="horizontal"
          className="col-span-1 @sm/editor-block-content:col-span-2 @lg/editor-block-content:col-span-1"
        >
          <Checkbox checked={active} onCheckedChange={setActive} className="size-5" />
          <Input variant="gray" value={label} onChange={handleLabelChange} />
        </Field>
        <TimePicker value={startValue} onChange={setStartValue} />
        <TimePicker value={endValue} onChange={setEndValue} />
      </div>
    </FieldSet>
  )
})
