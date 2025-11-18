import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"

type CardEditorStepperProps = {
  selectedStep: number
  onStepClick: (index: number) => void
}

export const CardEditorStepper = ({ selectedStep, onStepClick }: CardEditorStepperProps) => {
  return (
    <ul
      data-slot="card-editor-stepper"
      className="flex items-start min-[1170px]:items-center min-[1170px]:justify-between gap-5 bg-zinc-50 border border-gray-300 flex-col p-7 rounded-4xl min-[1170px]:flex-row min-[1170px]:rounded-full min-[1170px]:px-12 min-[1170px]:py-5"
    >
      {CARD_STEPS.map(({ id, title }, index) => (
        <CardEditorStepperItem
          key={id}
          title={title}
          index={index}
          isSelected={selectedStep === index}
          onStepClick={() => onStepClick(index)}
        />
      ))}
    </ul>
  )
}

type CardEditorStepperItemProps = {
  title: string
  index: number
  isSelected: boolean
  onStepClick: (index: number) => void
}

const CardEditorStepperItem = ({
  title,
  index,
  isSelected,
  onStepClick,
}: CardEditorStepperItemProps) => {
  return (
    <li
      data-state={isSelected}
      onClick={() => onStepClick(index)}
      data-slot="card-editor-stepper-item"
      className="flex gap-2 items-center group cursor-pointer"
    >
      <span className="size-6 rounded-full flex items-center justify-center font-semibold text-xs transition-colors text-zinc-500 bg-zinc-200 group-data-[state=true]:bg-primary group-data-[state=true]:text-white">
        {index + 1}
      </span>
      <span className="font-semibold text-base transition-colors text-zinc-500 group-data-[state=true]:text-primary">
        {title}
      </span>
    </li>
  )
}
