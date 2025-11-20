import { ChevronDown, GripVertical } from "lucide-react"

export const EditorBlock = ({ className, ...props }: React.ComponentProps<"ul">) => {
  return <ul className={`space-y-3 ${className}`} {...props} />
}

export const EditorBlockItem = ({
  open,
  className,
  ...props
}: React.ComponentProps<"li"> & { open: boolean }) => {
  return (
    <li
      data-slot="editor-block-item"
      data-state={open ? "open" : "closed"}
      className={`border rounded-xl overflow-hidden group/editor-block-item ${className}`}
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
  className,
  children,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <button
      data-slot="editor-block-trigger"
      className={`size-8 bg-white border  border-gray-300 rounded-full flex-center ${className}`}
      {...props}
    >
      {children ?? (
        <ChevronDown className="transition-transform group-data-[state=open]/editor-block-item:rotate-180 text-muted-foreground" />
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
