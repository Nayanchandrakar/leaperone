import { create } from "zustand"

interface StepperStore {
  selectedStep: number
  goToNextStep: () => void
  goToPreviousStep: () => void
  setSelectedStep: (step: number) => void
}

export const useStepper = create<StepperStore>()((set) => ({
  selectedStep: 2,
  setSelectedStep: (step) => set({ selectedStep: step }),
  goToNextStep: () => set((state) => ({ selectedStep: state.selectedStep + 1 })),
  goToPreviousStep: () => set((state) => ({ selectedStep: state.selectedStep - 1 })),
}))
