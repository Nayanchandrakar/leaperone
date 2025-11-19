import { LazyContentEditor, LazyDesignEditor, LazyQrCodeEditor } from "@/components/shared/dynamic"

type EditorStepFormProps = {
  selectedStep: number
}

export const EditorStepForm = ({ selectedStep }: EditorStepFormProps) => {
  switch (selectedStep) {
    case 0:
      return <LazyContentEditor />
    case 1:
      return <LazyDesignEditor />
    case 2:
      return <LazyQrCodeEditor />
    default:
      return null
  }
}
