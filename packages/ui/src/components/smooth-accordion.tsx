"use client"

import { cn } from "@app/ui/lib/utils"
import { createContext, useContext, useRef, useState } from "react"

type AccordionType = "single" | "multiple"
type AccordionMode = "accordion" | "switch"

type AccordionContextValue = {
  type: AccordionType
  collapsible?: boolean
  value: Array<string> | string | undefined
  onValueChange?: (value: Array<string> | string) => void
}

type AccordionItemContextValue = {
  value: string
  isOpen: boolean
  onToggle: () => void
}

type AccordionProps = {
  className?: string
  type?: AccordionType
  collapsible?: boolean
  children: React.ReactNode
  value?: Array<string> | string
  defaultValue?: Array<string> | string
  onValueChange?: (value: Array<string> | string) => void
}

type AccordionContentProps = React.ComponentProps<"div">

type AccordionTriggerProps = React.ComponentProps<"div"> & { mode?: AccordionMode }

const AccordionContext = createContext<AccordionContextValue | null>(null)
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null)

const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within Accordion")
  }
  return context
}

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext)
  if (!context) {
    throw new Error("AccordionItem components must be used within AccordionItem")
  }
  return context
}

export const Accordion = ({
  children,
  defaultValue,
  onValueChange,
  type = "single",
  collapsible = false,
  value: controlledValue,
}: AccordionProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | string[]>(
    defaultValue ?? (type === "multiple" ? [] : ""),
  )

  const value = controlledValue ?? uncontrolledValue
  const handleValueChange = (newValue: string | string[]) => {
    if (!controlledValue) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <AccordionContext.Provider
      value={{ value, type, collapsible, onValueChange: handleValueChange }}
    >
      {children}
    </AccordionContext.Provider>
  )
}

export const AccordionItem = ({
  value,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  value: string
}) => {
  const { value: accordionValue, onValueChange, type, collapsible } = useAccordionContext()

  const isOpen =
    type === "multiple"
      ? Array.isArray(accordionValue) && accordionValue.includes(value)
      : accordionValue === value

  const onToggle = () => {
    if (type === "multiple") {
      const currentValue = (accordionValue as string[]) ?? []
      const newValue = isOpen ? currentValue.filter((v) => v !== value) : [...currentValue, value]
      onValueChange?.(newValue)
    } else {
      if (isOpen && !collapsible) return
      onValueChange?.(isOpen ? "" : value)
    }
  }

  return (
    <AccordionItemContext.Provider value={{ value, isOpen, onToggle }}>
      <div className={cn("rounded-xl border overflow-hidden", className)} {...props} />
    </AccordionItemContext.Provider>
  )
}

export const AccordionTrigger = ({
  mode = "accordion",
  className,
  ...props
}: AccordionTriggerProps) => {
  const { isOpen, onToggle } = useAccordionItemContext()
  const isAccordion = mode === "accordion"

  return (
    <div
      data-state={isOpen}
      onClick={isAccordion ? onToggle : undefined}
      className={cn(
        "flex items-center justify-between bg-muted p-5 cursor-pointer data-[state=true]:border-b [&[data-state=true]>svg]:rotate-180",
        className,
      )}
      {...props}
    />
  )
}

export const AccordionContent = ({ className, ...props }: AccordionContentProps) => {
  const { isOpen } = useAccordionItemContext()
  const contentRef = useRef<React.ComponentRef<"div">>(null)

  return (
    <div
      ref={contentRef}
      className="transition-[max-height] duration-200 ease-in-out overflow-hidden"
      style={{
        maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
      }}
    >
      <div className={cn("p-5", className)} {...props} />
    </div>
  )
}
