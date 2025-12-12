import { Switch } from "@app/ui/components/switch"
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { memo, type ReactNode, useCallback, useMemo } from "react"
import tunnel from "tunnel-rat"
import { useShallow } from "zustand/react/shallow"
import {
  EditorBlockContent,
  EditorBlockGrip,
  EditorBlockGroup,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { EditorSubSortListItem } from "@/features/bussiness/components/ui/editor-sub-sort-list-item"
import {
  useSortableListHandlers,
  useSortableListStore,
} from "@/features/bussiness/hooks/home/use-sortable-list"

export type SortData = {
  id: string
} & Record<string, any>

type SortableListProps<T extends SortData = SortData> = {
  data: T[]
  onDragEnd?: (event: DragEndEvent) => void
  onDragStart?: (event: DragStartEvent) => void
  children: (item: T, index: number) => ReactNode
  onDataChange?: (fromIndex: number, toIndex: number) => void
}

type SortableListItemProps = {
  id: string
  name: string
  enabled: boolean
  className?: string
  children: ReactNode
  onEnabledChange: (enabled: boolean) => void
}

type EditorSubSortableListItemProps = {
  id: string
  onDelete?: () => void
  children: ReactNode
}

const t = tunnel()

export function SortableList<T extends SortData = SortData>({
  data,
  children,
  onDragStart,
  onDragEnd,
  onDataChange,
}: SortableListProps<T>) {
  const { activeCardId, setActiveCardId } = useSortableListStore(
    useShallow((state) => ({
      activeCardId: state.activeCardId,
      setActiveCardId: state.setActiveCardId,
    })),
  )

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  )

  const { handleDragStart, handleDragEnd } = useSortableListHandlers(
    data,
    setActiveCardId,
    onDragStart,
    onDragEnd,
    onDataChange,
  )

  const sortedChildren = useMemo(
    () => (data?.length > 0 ? data.map(children) : null),
    [data, children],
  )

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges, restrictToVerticalAxis]}
    >
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        {sortedChildren}
        <DragOverlay dropAnimation={null}>{activeCardId && <t.Out />}</DragOverlay>
      </SortableContext>
    </DndContext>
  )
}

export const SortableListItem = memo(
  ({ id, name, enabled, children, className, onEnabledChange }: SortableListItemProps) => {
    const activeCardId = useSortableListStore((state) => state.activeCardId)
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id,
    })

    const handleEnabledChange = useCallback((v: boolean) => onEnabledChange?.(v), [onEnabledChange])

    return (
      <>
        <EditorBlockItem
          value={id}
          style={{
            transition,
            transform: CSS.Transform.toString(transform),
          }}
          ref={setNodeRef}
          isGrabbing={isDragging}
        >
          <EditorBlockHeader>
            <EditorBlockGroup>
              <EditorBlockGrip {...attributes} {...listeners} />
              <EditorBlockTitle>{name}</EditorBlockTitle>
            </EditorBlockGroup>
            <EditorBlockGroup>
              <Switch checked={enabled} onCheckedChange={handleEnabledChange} />
              <EditorBlockTrigger />
            </EditorBlockGroup>
          </EditorBlockHeader>
          <EditorBlockContent className={className}>{children}</EditorBlockContent>
        </EditorBlockItem>

        {activeCardId === id && (
          <t.In>
            <EditorBlockItem value={id} isDragging={isDragging}>
              <EditorBlockHeader>
                <EditorBlockGroup>
                  <EditorBlockGrip />
                  <EditorBlockTitle>{name}</EditorBlockTitle>
                </EditorBlockGroup>
                <EditorBlockGroup>
                  <Switch checked={enabled} />
                  <EditorBlockTrigger />
                </EditorBlockGroup>
              </EditorBlockHeader>
              <EditorBlockContent className="relative before:content-[''] before:absolute before:bottom-0 before:w-full before:h-50 before:bg-linear-to-b before:from-transparent before:to-white before:z-50 max-h-60">
                {children}
              </EditorBlockContent>
            </EditorBlockItem>
          </t.In>
        )}
      </>
    )
  },
)

export const SortableSubListItem = memo(
  ({ id, onDelete, children }: EditorSubSortableListItemProps) => {
    const activeCardId = useSortableListStore((state) => state.activeCardId)
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id,
    })

    const handleDelete = useCallback(() => onDelete?.(), [onDelete])

    return (
      <>
        <EditorSubSortListItem
          style={{
            transition,
            transform: CSS.Transform.toString(transform),
          }}
          ref={setNodeRef}
          listeners={listeners!}
          onDelete={handleDelete}
          attributes={attributes}
          isGrabbing={isDragging}
        >
          {children}
        </EditorSubSortListItem>

        {activeCardId === id && (
          <t.In>
            <EditorSubSortListItem isDragging={isDragging}>{children}</EditorSubSortListItem>
          </t.In>
        )}
      </>
    )
  },
)
