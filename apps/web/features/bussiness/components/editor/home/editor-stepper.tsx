import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"

export const EditorStepper = () => {
  const { selectedStep } = useStepper()

  return (
    <ul
      data-slot="card-editor-stepper"
      className="flex p-6 items-start lg:items-center lg:flex-row flex-col lg:justify-between gap-4 border border-gray-300 bg-zinc-50 rounded-3xl lg:rounded-full lg:px-8 lg:py-4.5 xl:px-8"
    >
      {CARD_STEPS.map(({ id, title }, index) => (
        <EditorStepperItem key={id} title={title} index={index} selectedStep={selectedStep} />
      ))}
    </ul>
  )
}

type EditorStepperItemProps = {
  title: string
  index: number
  selectedStep: number
}

const EditorStepperItem = ({ title, index, selectedStep }: EditorStepperItemProps) => {
  return (
    <button
      type="submit"
      data-state={selectedStep === index}
      data-slot="card-editor-stepper-item"
      form={CARD_STEPS[selectedStep]?.formId}
      className="flex gap-2 items-center group cursor-pointer"
    >
      <span className="size-6 rounded-full flex items-center justify-center font-semibold text-xs transition-colors text-zinc-500 bg-zinc-200 group-data-[state=true]:bg-primary group-data-[state=true]:text-white">
        {index + 1}
      </span>
      <span className="font-semibold text-sm xl:text-base transition-colors text-zinc-500 group-data-[state=true]:text-primary">
        {title}
      </span>
    </button>
  )
}
