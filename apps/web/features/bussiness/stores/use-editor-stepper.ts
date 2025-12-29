import { create } from "zustand"

interface EditorStepperStore {
  selectedStep: number
  goToNextStep: () => void
  goToPreviousStep: () => void
  setSelectedStep: (step: number) => void
}

export const useEditorStepper = create<EditorStepperStore>()((set) => ({
  selectedStep: 1,
  setSelectedStep: (step) => set({ selectedStep: step }),
  goToNextStep: () => set((state) => ({ selectedStep: state.selectedStep + 1 })),
  goToPreviousStep: () => set((state) => ({ selectedStep: state.selectedStep - 1 })),
}))
