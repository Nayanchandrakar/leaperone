import { cn } from "@app/ui/lib/utils"
import { ChevronDown, GripVertical } from "lucide-react"
import { createContext, type SetStateAction, useContext, useState } from "react"

type EditorBlockContextProps = {
  item: string
  setItem: React.Dispatch<SetStateAction<string>>
}

type EditorBlockItemContextProps = {
  value: string
}

const EditorBlockContext = createContext<EditorBlockContextProps | null>(null)
const EditorBlockItemContext = createContext<EditorBlockItemContextProps | null>(null)

const useEditorBlockContext = () => {
  const context = useContext(EditorBlockContext)
  if (!context) {
    throw new Error("useEditorBlockContext must be used within EditorBlock")
  }
  return context
}

const useEditorBlockItemContext = () => {
  const context = useContext(EditorBlockItemContext)
  if (!context) {
    throw new Error("useEditorBlockItemContext must be used within EditorBlockItem")
  }
  return context
}

export const EditorBlock = ({
  className,
  children,
  defaultValue,
  ...props
}: React.ComponentProps<"ul"> & {
  defaultValue?: string
}) => {
  const [item, setItem] = useState(defaultValue ?? "")

  return (
    <EditorBlockContext.Provider value={{ item, setItem }}>
      <ul className={cn("space-y-3", className)} {...props}>
        {children}
      </ul>
    </EditorBlockContext.Provider>
  )
}

export const EditorBlockItem = ({
  value,
  className,
  children,
  isGrabbing = false,
  isDragging = false,
  ...props
}: React.ComponentProps<"li"> & { isGrabbing?: boolean; isDragging?: boolean; value: string }) => {
  const { item } = useEditorBlockContext()
  const open = item === value

  return (
    <EditorBlockItemContext.Provider value={{ value }}>
      <li
        data-dragging={isDragging}
        data-grabbing={isGrabbing}
        data-slot="editor-block-item"
        data-state={open ? "open" : "closed"}
        className={cn(
          "border rounded-xl bg-background overflow-hidden group/editor-block-item",
          "data-[dragging=true]:border-primary",
          "has-[data-slot=editor-block-content]:overflow-visible",
          "data-[grabbing=true]:pointer-events-none data-[grabbing=true]:cursor-grabbing data-[grabbing=true]:opacity-60",
          className,
        )}
        {...props}
      >
        {children}
      </li>
    </EditorBlockItemContext.Provider>
  )
}

export const EditorBlockHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="editor-block-header"
      className={cn(
        "w-full bg-muted p-5 flex items-center gap-2 justify-between",
        "group-data-[state=open]/editor-block-item:border-b",
        className,
      )}
      {...props}
    />
  )
}

export const EditorBlockGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="editor-block-group"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

export const EditorBlockTitle = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p
      data-slot="editor-block-title"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

export const EditorBlockGrip = ({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="editor-block-grip"
      className={cn(
        "size-8 bg-white border border-gray-300 rounded-full cursor-grab flex-center",
        className,
      )}
      {...props}
    >
      {children ?? <GripVertical className="size-5 shrink-0 text-muted-foreground" />}
    </span>
  )
}

export const EditorBlockTrigger = ({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const { setItem } = useEditorBlockContext()
  const { value } = useEditorBlockItemContext()

  return (
    <button
      type="button"
      data-slot="editor-block-trigger"
      onClick={() => setItem((prev) => (prev === value ? "" : value))}
      className={cn("size-8 bg-white border border-gray-300 rounded-full flex-center", className)}
      {...props}
    >
      {children ?? (
        <ChevronDown
          className={cn(
            "transition-transform text-muted-foreground",
            "group-data-[state=open]/editor-block-item:rotate-180",
          )}
        />
      )}
    </button>
  )
}

export const EditorBlockContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="editor-block-content"
      className={cn(
        "group-data-[state=open]/editor-block-item:max-h-500",
        "group-data-[state=closed]/editor-block-item:max-h-0",
        "transition-[max-height] duration-200 ease-in-out overflow-hidden",
      )}
      {...props}
    >
      <div
        className={cn(
          "@container/editor-block-content p-5 has-[>[data-slot=editor-block-footer]]:p-0",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export const EditorBlockFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="editor-block-footer"
      className={cn("px-5 py-4 border-t border-border", className)}
      {...props}
    />
  )
}
