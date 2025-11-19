import { create } from "zustand"

interface StepperStore {
  selectedStep: number
  nextStep: () => void
  previousStep: () => void
  setSelectedStep: (step: number) => void
}

export const useStepper = create<StepperStore>()((set) => ({
  selectedStep: 0,
  setSelectedStep: (step) => set({ selectedStep: step }),
  nextStep: () => set((state) => ({ selectedStep: state.selectedStep + 1 })),
  previousStep: () => set((state) => ({ selectedStep: state.selectedStep - 1 })),
}))
