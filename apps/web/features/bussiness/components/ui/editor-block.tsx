import { cn } from "@app/ui/lib/utils"
import { ChevronDown, GripVertical } from "lucide-react"
import { createContext, type SetStateAction, useContext, useState } from "react"

type EditorBlockContextProps = {
  item: string
  setItem: React.Dispatch<SetStateAction<string>>
}

const EditorBlockContext = createContext<EditorBlockContextProps | null>(null)

export const useEditorBlockContext = () => {
  return useContext(EditorBlockContext)!
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
      <ul className={`space-y-3 ${className}`} {...props}>
        {children}
      </ul>
    </EditorBlockContext.Provider>
  )
}

export const EditorBlockItem = ({
  className,
  isDragging = false,
  ...props
}: React.ComponentProps<"li"> & { isDragging?: boolean }) => {
  return (
    <li
      data-dragging={isDragging}
      data-slot="editor-block-item"
      className={cn(
        "border rounded-xl bg-background overflow-hidden data-[dragging=true]:border-primary",
        className,
      )}
      {...props}
    />
  )
}

export const EditorBlockHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="editor-block-header"
      className={`w-full bg-muted p-5 flex items-center gap-2 justify-between group-data-[state=open]/editor-block-item:border-b ${className}`}
      {...props}
    />
  )
}

export const EditorBlockGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="editor-block-group"
      className={`flex items-center gap-2 ${className}`}
      {...props}
    />
  )
}

export const EditorBlockTitle = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p
      data-slot="editor-block-title"
      className={`text-sm font-medium text-muted-foreground ${className}`}
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
      className={`size-8 bg-white border  border-gray-300 rounded-full cursor-grab flex-center ${className}`}
      {...props}
    >
      {children ?? <GripVertical className="size-5 shrink-0 text-muted-foreground" />}
    </span>
  )
}

export const EditorBlockTrigger = ({
  value,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"button">, "onClick"> & { value: string }) => {
  const { item, setItem } = useEditorBlockContext()
  const open = item === value

  return (
    <button
      onClick={() => setItem(value)}
      data-slot="editor-block-trigger"
      className={`size-8 bg-white border  border-gray-300 rounded-full flex-center ${className}`}
      {...props}
    >
      {children ?? (
        <ChevronDown
          data-state={open}
          className="transition-transform data-[state=ture]:rotate-180 text-muted-foreground"
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
      className="transition-[max-height] duration-200 ease-in-out overflow-hidden  group-data-[state=open]/editor-block-item:max-h-80 group-data-[state=closed]/editor-block-item:max-h-0"
      {...props}
    >
      <div className={`p-5 ${className}`}>{children}</div>
    </div>
  )
}
