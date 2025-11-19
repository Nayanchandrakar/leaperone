import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"

type EditorStepperProps = {
  selectedStep: number
  onStepClick: (index: number) => void
}

export const EditorStepper = ({ selectedStep, onStepClick }: EditorStepperProps) => {
  return (
    <ul
      data-slot="card-editor-stepper"
      className="flex p-6 items-start lg:items-center lg:flex-row flex-col lg:justify-between gap-4 border border-gray-300 bg-zinc-50 rounded-3xl lg:rounded-full lg:px-8 lg:py-4.5 xl:px-8"
    >
      {CARD_STEPS.map(({ id, title }, index) => (
        <EditorStepperItem
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

type EditorStepperItemProps = {
  title: string
  index: number
  isSelected: boolean
  onStepClick: (index: number) => void
}

const EditorStepperItem = ({ title, index, isSelected, onStepClick }: EditorStepperItemProps) => {
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
      <span className="font-semibold text-sm xl:text-base transition-colors text-zinc-500 group-data-[state=true]:text-primary">
        {title}
      </span>
    </li>
  )
}
