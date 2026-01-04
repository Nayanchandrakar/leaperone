import { Button } from "@app/ui/components/button"
import { cn } from "@app/ui/lib/utils"
import type { DraggableAttributes } from "@dnd-kit/core"
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities"
import { GripVertical, Trash } from "lucide-react"
import { useCallback } from "react"

type EditorSubSortListItemProps = React.ComponentProps<"div"> & {
  isDragging?: boolean
  isGrabbing?: boolean
  onDelete?: () => void
  attributes?: DraggableAttributes
  listeners?: SyntheticListenerMap
}

export const EditorSubSortListItem = ({
  className,
  onDelete,
  children,
  attributes,
  listeners,
  isDragging = false,
  isGrabbing = false,
  ...props
}: EditorSubSortListItemProps) => {
  const handleDelete = useCallback(() => {
    onDelete?.()
  }, [onDelete])

  return (
    <div
      data-grabbing={isGrabbing}
      data-dragging={isDragging}
      data-slot="editor-sub-sort-list-item"
      className={cn(
        "rounded-xl bg-muted px-4 sm:px-6 py-8 relative border @container/editor-sub-sort",
        "data-[dragging=true]:border-primary",
        "data-[grabbing=true]:pointer-events-none data-[grabbing=true]:cursor-grabbing data-[grabbing=true]:opacity-50",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 *:bg-white absolute -top-4.5 sm:right-6 right-4">
        <Button
          size="icon"
          type="button"
          onClick={handleDelete}
          variant="gray-outline"
          className="text-destructive hover:text-destructive/90"
        >
          <Trash />
        </Button>

        <Button
          size="icon"
          type="button"
          {...listeners}
          {...attributes}
          variant="gray-outline"
          className="cursor-grab text-muted-foreground"
        >
          <GripVertical />
        </Button>
      </div>

      {children}
    </div>
  )
}
