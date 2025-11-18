"use client"

import { Button } from "@app/ui/components/button"
import { useForm } from "@tanstack/react-form"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRef, useState } from "react"
import { CardEditorStepper } from "@/features/bussiness/components/editor/home/card-editor-stepper"
import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"

export const CardEditor = () => {
  const [selectedStep, setSelectedStep] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm({
    defaultValues: {
      content: {
        name: "",
      },
      settings: {
        color: "",
      },
      code: {
        url: "",
      },
    },
  })

  const handleStepClick = (index: number) => {
    if (selectedStep === index) return
    setSelectedStep(index)
  }

  const handleNextStep = () => {
    if (selectedStep < CARD_STEPS.length - 1) {
      setSelectedStep((prev) => prev + 1)
    }
  }

  const handlePreviousStep = () => {
    if (selectedStep > 0) {
      setSelectedStep((prev) => prev - 1)
    }
  }

  return (
    <section className="border-container">
      <CardEditorStepper selectedStep={selectedStep} onStepClick={handleStepClick} />

      {/* Content */}
      <form
        ref={formRef}
        id="myform"
        className="mt-12"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="">sdfsdf</div>
      </form>

      {/* Navigation buttons */}
      <div className="bg-muted p-4 justify-between flex items-center">
        {selectedStep > 0 && (
          <Button variant="green-outline" onClick={handlePreviousStep}>
            <ArrowLeft />
            Previous Step
          </Button>
        )}

        {selectedStep < CARD_STEPS.length - 1 && (
          <Button className="px-8" onClick={handleNextStep}>
            Next Step
            <ArrowRight />
          </Button>
        )}
      </div>
    </section>
  )
}
