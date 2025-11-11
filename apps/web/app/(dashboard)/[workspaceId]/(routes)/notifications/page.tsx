"use client"

import { ChevronDown } from "lucide-react"
import { createContext, useContext, useRef, useState } from "react"

type PanelRootProps = {
  type?: "single" | "multiple"
  collapsible?: boolean
  children: React.ReactNode
}

type PanelContextValue = {
  openItems: string[]
  toggleItem: (key: string) => void
  type: "single" | "multiple"
  collapsible: boolean
}

const PanelContext = createContext<PanelContextValue | null>(null)

function usePanelContext() {
  const ctx = useContext(PanelContext)
  if (!ctx) throw new Error("Panel components must be used within Panel")
  return ctx
}

const PanelRoot = ({ type = "multiple", collapsible = false, children }: PanelRootProps) => {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const isOpen = prev.includes(key)
      if (type === "multiple") {
        return isOpen ? prev.filter((item) => item !== key) : [...prev, key]
      }
      if (isOpen) {
        return collapsible ? [] : prev
      }
      return [key]
    })
  }

  return (
    <PanelContext.Provider value={{ openItems, toggleItem, type, collapsible }}>
      {children}
    </PanelContext.Provider>
  )
}

type PanelItemProps = {
  itemKey: string
  children: React.ReactNode
}

const PanelItem = ({ itemKey, children }: PanelItemProps) => {
  return (
    <div data-panel-item={itemKey} className="border rounded-xl overflow-hidden">
      {children}
    </div>
  )
}

type PanelTriggerProps = {
  itemKey: string
  children: React.ReactNode
  disabled?: boolean
}

const PanelTrigger = ({ itemKey, children, disabled }: PanelTriggerProps) => {
  const { openItems, toggleItem } = usePanelContext()
  const isOpen = openItems.includes(itemKey)
  return (
    <button
      type="button"
      data-state={isOpen}
      onClick={disabled ? undefined : () => toggleItem(itemKey)}
      className="w-full bg-muted p-5 flex items-center justify-between cursor-pointer data-[state=true]:border-b"
    >
      {children}
      <ChevronDown
        data-state={isOpen}
        className="size-4 transition-transform duration-200 data-[state=true]:rotate-180"
      />
    </button>
  )
}

type PanelContentProps = {
  itemKey: string
  children: React.ReactNode
}

const PanelContent = ({ itemKey, children }: PanelContentProps) => {
  const { openItems } = usePanelContext()
  const isOpen = openItems.includes(itemKey)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={contentRef}
      className="transition-[max-height] duration-200 ease-in-out overflow-hidden"
      style={{
        maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
      }}
    >
      <div className="p-5">{children}</div>
    </div>
  )
}

const Panel = Object.assign(PanelRoot, {
  Item: PanelItem,
  Trigger: PanelTrigger,
  Content: PanelContent,
})

// Usage example
const items = [
  { title: "Is it accessible?", content: "..." },
  { title: "Is it styled?", content: "..." },
  { title: "Is it animated?", content: "..." },
]

export default function NotificationsPage() {
  return (
    <section className="mt-8 container space-y-4">
      <Panel>
        {items.map(({ title, content }, index) => {
          const key = `item-${index}`
          return (
            <Panel.Item key={key} itemKey={key}>
              <Panel.Trigger itemKey={key}>{title}</Panel.Trigger>
              <Panel.Content itemKey={key}>{content}</Panel.Content>
            </Panel.Item>
          )
        })}
      </Panel>
    </section>
  )
}
