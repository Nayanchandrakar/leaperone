import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"

export const EditorStepForm = () => {
  const selectedStep = useStepper((state) => state.selectedStep)

  switch (selectedStep) {
    case 0:
      return <div>Step 0</div>
    case 1:
      return <div>Step 1</div>
    case 2:
      return <div>Step 2</div>
    default:
      return null
  }
}
