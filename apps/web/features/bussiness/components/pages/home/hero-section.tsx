"use client"

import { cn } from "@app/ui/lib/utils"
import { useState } from "react"

const STEPS = [
  { id: 34634564, title: "Add Content" },
  { id: 66756765, title: "Customize Design & Settings" },
  { id: 98798798, title: "Design QR Code" },
]

export const Stepper = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-zinc-50 border-gray-300 border rounded-full px-12 py-4 h-fit flex justify-between",
        className,
      )}
      {...props}
    />
  )
}

export const Step = ({
  title,
  index,
  isSelected,
  onStepClick,
}: {
  title: string
  index: number
  isSelected: boolean
  onStepClick: (index: number) => void
}) => {
  return (
    <li className="flex gap-2 items-center group cursor-pointer" onClick={() => onStepClick(index)}>
      <span
        data-state={isSelected}
        className="size-6 rounded-full flex items-center justify-center font-semibold text-xs transition-colors text-zinc-500 bg-zinc-200 data-[state=true]:bg-primary data-[state=true]:text-white"
      >
        {index + 1}
      </span>
      <span
        data-state={isSelected}
        className="font-semibold text-base transition-colors text-zinc-500 data-[state=true]:text-primary"
      >
        {title}
      </span>
    </li>
  )
}

export const HeroSection = () => {
  const [selectedStep, setSelectedStep] = useState(0)

  const handleStepClick = (index: number) => {
    if (selectedStep === index) return
    setSelectedStep(index)
  }

  return (
    <section className="container my-8 ">
      <section className="grid grid-cols-[1.4fr_0.6fr] min-h-[50vh] gap-12">
        <div className="border-container grid gap-2 p-4">
          <Stepper>
            {STEPS.map(({ id, title }, index) => {
              return (
                <Step
                  key={id}
                  title={title}
                  index={index}
                  onStepClick={handleStepClick}
                  isSelected={selectedStep === index}
                />
              )
            })}
          </Stepper>

          <div className="mt-8">
            {selectedStep === 0 && (
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Add Content</h3>
                <p className="text-sm text-gray-500">Add your content here.</p>
              </div>
            )}
            {selectedStep === 1 && (
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Customize Design & Settings</h3>
                <p className="text-sm text-gray-500">Customize your design and settings here.</p>
              </div>
            )}
            {selectedStep === 2 && (
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Design QR Code</h3>
                <p className="text-sm text-gray-500">Design your QR code here.</p>
              </div>
            )}
            <div className="h-1 w-full bg-primary" />
          </div>
        </div>
        <div className="border-container">Bussiness card preview</div>
      </section>
    </section>
  )
}
