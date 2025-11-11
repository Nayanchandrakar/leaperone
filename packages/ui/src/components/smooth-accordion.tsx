"use client"
import { cn } from "@app/ui/lib/utils"
import { createContext, useCallback, useContext, useRef, useState } from "react"

type type = "single" | "multiple"

interface PanelProps {
  type: type
  trigger?: boolean
  collapsible?: boolean
}

interface PanelContextType extends PanelProps {
  items: string[]
  setItems: React.Dispatch<React.SetStateAction<string[]>>
}

interface PanelItemContextType {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

interface PanelTriggerProps extends Omit<React.ComponentProps<"button">, "onClick"> {
  value: string
}

const PanelContext = createContext<PanelContextType | null>(null)
const panelItemContext = createContext<PanelItemContextType | null>(null)

const usePanel = () => {
  const context = useContext(PanelContext)
  if (!context) {
    throw new Error("usePanel must be used within a Panel")
  }
  return context
}

const usePanelItem = () => {
  const context = useContext(panelItemContext)
  if (!context) {
    throw new Error("usePanelItem must be used within a PanelItem")
  }
  return context
}

export const Panel = ({
  children,
  trigger = true,
  type = "single",
  collapsible = true,
}: PanelProps & { children: React.ReactNode }) => {
  const [items, setItems] = useState<string[]>([])

  return (
    <PanelContext.Provider
      value={{ type, trigger, collapsible, items, setItems }}
      children={children}
    />
  )
}

export const PanelItem = ({
  className,
  children,
  value: initialValue,
  ...props
}: React.ComponentProps<"div"> & { value: string }) => {
  const [value, setValue] = useState<string>(initialValue)
  return (
    <panelItemContext.Provider value={{ value, setValue }}>
      <div className={cn("border rounded-xl overflow-hidden", className)} {...props}>
        {children}
      </div>
    </panelItemContext.Provider>
  )
}

export const PanelTrigger = ({ className, children, ...props }: PanelTriggerProps) => {
  const { value } = usePanelItem()
  const { items, type, trigger, collapsible, setItems } = usePanel()
  const isOpen = items?.includes(value)

  const handleClick = useCallback(() => {
    switch (type) {
      case "multiple":
        if (isOpen) {
          setItems((prev) => prev.filter((item) => item !== value))
        } else {
          setItems((prev) => [...prev, value])
        }
        break
      case "single":
        if (isOpen) {
          collapsible && setItems([])
        } else {
          setItems([value])
        }
        break
    }
  }, [type, collapsible, setItems, value, isOpen])

  return (
    <button
      type="button"
      data-state={isOpen}
      onClick={trigger ? handleClick : undefined}
      className={cn(
        "w-full bg-muted p-5 flex items-center justify-between cursor-pointer data-[state=true]:border-b",
        className,
      )}
      {...props}
    />
  )
}

export const PanelContent = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const { items } = usePanel()
  const { value } = usePanelItem()
  const isOpen = items?.includes(value)
  const ref = useRef<React.ComponentRef<"div">>(null)
  return (
    <div
      ref={ref}
      className={cn("transition-[max-height] duration-200 ease-in-out overflow-hidden", className)}
      style={{
        maxHeight: isOpen ? `${ref.current?.scrollHeight ?? 0}px` : "0px",
      }}
      {...props}
    />
  )
}
