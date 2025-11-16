"use client"

import { Button } from "@app/ui/components/button"
import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { useForm, useStore } from "@tanstack/react-form"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import z from "zod"
import { Stepper, StepperItem } from "@/features/bussiness/components/ui/stepper"
import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"

const formSchema = z.object({
  content: z.object({
    name: z.string().min(10),
  }),

  settings: z.object({
    color: z.string().min(10),
  }),

  code: z.object({
    url: z.url(),
  }),
})

export const CardEditor = () => {
  const [selectedStep, setSelectedStep] = useState(0)

  const form = useForm({
    defaultValues: {
      content: {
        name: "",
      },
      // settings: {
      //   color: "",
      // },
      // code: {
      //   url: "",
      // },
    },

    validators: {
      onSubmit: formSchema.pick({ content: true }),
      onChange: formSchema.pick({ content: true }),
    },

    onSubmitInvalid: (errors) => {
      console.log("onSubmitInvalid", errors)
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

  const formErrors = useStore(form.store, (state) => state.errors)

  useEffect(() => {
    form.validateAllFields("submit")
  }, [form])

  console.log(formErrors)

  return (
    <section className="border-container">
      <Stepper>
        {CARD_STEPS.map((step, index) => (
          <StepperItem
            key={step.id}
            index={index}
            title={step.title}
            onStepClick={handleStepClick}
            isSelected={selectedStep === index}
          />
        ))}
      </Stepper>

      {/* Content */}
      <form
        className="mt-12"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="content.name"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Enter the new full name</FieldLabel>
                <Input
                  type="text"
                  variant="gray"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </form>

      <Button
        variant="green-outline"
        onClick={async () => {
          await form.validateAllFields("change")
        }}
      >
        <ArrowLeft />
        Check the next
      </Button>

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
