"use client"
import { cn } from "@app/ui/lib/utils"
import { motion } from "motion/react"
import * as React from "react"
import { ListComponent } from "@/components/shared/list-component"

interface SmoothTabProps {
  items: {
    id: string
    title: string
  }[]
  className?: string
  selected: string
  onChange: (tabId: string) => void
}

export const SmoothTab = ({ items, className, onChange, selected }: SmoothTabProps) => {
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 })

  // Reference for the selected button
  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Update dimensions whenever selected tab changes or on mount
  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected)
      const container = containerRef.current

      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        })
      }
    }

    // Initial update
    requestAnimationFrame(() => {
      updateDimensions()
    })

    // Update on resize
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [selected])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, tabId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onChange(tabId)
    }
  }

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={cn(
        "flex items-center justify-between gap-1 py-1.5 relative",
        "bg-background w-[280px]",
        "border border-primary rounded-full",
        "transition-all duration-200",
        className,
      )}
    >
      <motion.div
        className="absolute rounded-full z-[1] bg-primary"
        initial={false}
        animate={{
          width: dimensions.width - 8,
          x: dimensions.left + 4,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        style={{ height: "calc(100% - 8px)", top: "4px" }}
      />

      <ListComponent
        items={items}
        className="grid grid-cols-2 w-full gap-1 relative z-[2]"
        renderItem={({ id, title }) => {
          const isSelected = selected === id
          return (
            <motion.button
              key={id}
              ref={(el) => {
                if (el) buttonRefs.current.set(id, el)
                else buttonRefs.current.delete(id)
              }}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(id)}
              onKeyDown={(e) => handleKeyDown(e, id)}
              className={cn(
                "relative flex items-center justify-center gap-0.5 rounded-full px-2 py-1.5 cursor-pointer",
                "text-sm font-semibold transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "truncate",
                isSelected ? "text-white" : "text-primary",
              )}
            >
              <span className="truncate">{title}</span>
            </motion.button>
          )
        }}
      />
    </div>
  )
}
