import { FieldDescription } from "@app/ui/components/field"
import { RadioGroupItem } from "@app/ui/components/radio-group"
import { useId } from "react"
import { AgreementDescription } from "@/features/dashboard/components/pages/agreement-form/agreement-heading"

type AgreementContentChoiceProps = {
  value: string
  title: string
  description: string
}

export const AgreementContentChoice = ({
  value,
  title,
  description,
}: AgreementContentChoiceProps) => {
  const id = useId()

  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors hover:border-primary focus-within:border-primary"
    >
      <RadioGroupItem id={id} value={value} />
      <div className="space-y-1">
        <AgreementDescription className="text-foreground">{title}</AgreementDescription>
        <FieldDescription>{description}</FieldDescription>
      </div>
    </label>
  )
}
