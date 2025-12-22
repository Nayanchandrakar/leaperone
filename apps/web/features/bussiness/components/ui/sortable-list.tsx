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
  items: T[]
  onDragEnd?: (event: DragEndEvent) => void
  renderItem: (item: T, index: number) => ReactNode
  onDragStart?: (event: DragStartEvent) => void
  onReorder?: (fromIndex: number, toIndex: number) => void
}

type SortableListItemProps = {
  itemId: string
  itemTitle: string
  isEnabled: boolean
  itemClassName?: string
  children: ReactNode
  onIsEnabledChange: (enabled: boolean) => void
}

type EditorSubSortableListItemProps = {
  itemId: string
  onItemDelete?: () => void
  children: ReactNode
}

const t = tunnel()

export const SortableList = memo(function SortableList<T extends SortData = SortData>({
  items,
  renderItem,
  onDragStart,
  onDragEnd,
  onReorder,
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
    items,
    setActiveCardId,
    onDragStart,
    onDragEnd,
    onReorder,
  )

  const sortedChildren = useMemo(
    () => (items?.length > 0 ? items.map(renderItem) : null),
    [items, renderItem],
  )

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges, restrictToVerticalAxis]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {sortedChildren}
        <DragOverlay dropAnimation={null}>{activeCardId && <t.Out />}</DragOverlay>
      </SortableContext>
    </DndContext>
  )
}) as <T extends SortData>(props: SortableListProps<T>) => ReactNode

export const SortableListItem = memo(
  ({
    itemId,
    itemTitle,
    isEnabled,
    children,
    itemClassName,
    onIsEnabledChange,
  }: SortableListItemProps) => {
    const activeCardId = useSortableListStore((state) => state.activeCardId)
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: itemId,
    })

    const handleIsEnabledChange = useCallback(
      (v: boolean) => onIsEnabledChange?.(v),
      [onIsEnabledChange],
    )

    return (
      <>
        <EditorBlockItem
          value={itemId}
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
              <EditorBlockTitle>{itemTitle}</EditorBlockTitle>
            </EditorBlockGroup>
            <EditorBlockGroup>
              <Switch checked={isEnabled} onCheckedChange={handleIsEnabledChange} />
              <EditorBlockTrigger />
            </EditorBlockGroup>
          </EditorBlockHeader>
          <EditorBlockContent className={itemClassName}>{children}</EditorBlockContent>
        </EditorBlockItem>

        {activeCardId === itemId && (
          <t.In>
            <EditorBlockItem value={itemId} isDragging={isDragging}>
              <EditorBlockHeader>
                <EditorBlockGroup>
                  <EditorBlockGrip />
                  <EditorBlockTitle>{itemTitle}</EditorBlockTitle>
                </EditorBlockGroup>
                <EditorBlockGroup>
                  <Switch checked={isEnabled} />
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
  ({ itemId, onItemDelete, children }: EditorSubSortableListItemProps) => {
    const activeCardId = useSortableListStore((state) => state.activeCardId)
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: itemId,
    })

    const handleDelete = useCallback(() => onItemDelete?.(), [onItemDelete])

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

        {activeCardId === itemId && (
          <t.In>
            <EditorSubSortListItem isDragging={isDragging}>{children}</EditorSubSortListItem>
          </t.In>
        )}
      </>
    )
  },
)
