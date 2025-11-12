"use client"

import { cn } from "@app/ui/lib/utils"
import type * as React from "react"
import { createContext, useCallback, useContext, useRef, useState } from "react"

type PanelType = "single" | "multiple"

type PanelContext = {
  type: PanelType
  openItems: string[]
  collapsible: boolean
  toggleItem: (key: string) => void
}

const PanelContext = createContext<PanelContext | null>(null)
const PanelItemContext = createContext<string | null>(null)

function usePanelContext() {
  const context = useContext(PanelContext)
  if (!context) throw new Error("usePanelContext must be used within Panel")
  return context
}

function usePanelItem() {
  const itemKey = useContext(PanelItemContext)
  if (!itemKey) throw new Error("usePanelItem must be used within PanelItem")
  return itemKey
}

export const Panel = ({
  type = "multiple",
  collapsible = true,
  children,
}: {
  type?: PanelType
  collapsible?: boolean
  children: React.ReactNode
}) => {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = useCallback(
    (key: string) => {
      setOpenItems((prev) => {
        const isOpen = prev.includes(key)

        if (type === "multiple") {
          return isOpen ? prev.filter((item) => item !== key) : [...prev, key]
        }

        if (!isOpen) return [key]
        return collapsible ? [] : prev
      })
    },
    [type, collapsible],
  )

  return (
    <PanelContext.Provider
      value={{
        openItems,
        toggleItem,
        type,
        collapsible,
      }}
    >
      {children}
    </PanelContext.Provider>
  )
}

export const PanelItem = ({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  value: string
}) => {
  return (
    <PanelItemContext.Provider value={value}>
      <div className={cn("border rounded-xl overflow-hidden", className)} {...props}>
        {children}
      </div>
    </PanelItemContext.Provider>
  )
}

export const PanelTrigger = ({
  trigger = true,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { trigger?: boolean }) => {
  const itemKey = usePanelItem()
  const { openItems, toggleItem } = usePanelContext()
  const isOpen = openItems.includes(itemKey)

  return (
    <button
      type="button"
      data-state={isOpen}
      onClick={trigger ? () => toggleItem(itemKey) : undefined}
      className={cn(
        "w-full bg-muted p-5 flex items-center justify-between cursor-pointer data-[state=true]:border-b",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export const PanelContent = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const itemKey = usePanelItem()
  const { openItems } = usePanelContext()
  const isOpen = openItems.includes(itemKey)
  const contentRef = useRef<React.ComponentRef<"div">>(null)

  return (
    <div
      ref={contentRef}
      className="transition-[max-height] duration-200 ease-in-out overflow-hidden"
      style={{
        maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
      }}
    >
      <div className={cn("p-5", className)} {...props}>
        {children}
      </div>
    </div>
  )
}
