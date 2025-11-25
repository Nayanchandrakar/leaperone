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
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import React, { createContext, useContext, useState } from "react"
import { createPortal } from "react-dom"
import tunnel from "tunnel-rat"
import {
  EditorBlockContent,
  EditorBlockGrip,
  EditorBlockGroup,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { EditorSubSortListItem } from "./editor-sub-sort-list-item"

// Component type definitions

type EditorSortContextProps<T extends EditorSortItemProps = EditorSortItemProps> = {
  data: T[]
  activeCardId: string | null
}

type EditorSortItemProps = {
  id: string
} & Record<string, any>

type EditorSortProviderProps<T extends EditorSortItemProps = EditorSortItemProps> = {
  data: T[]
  children: React.ReactNode
  onDataChange?: (data: T[]) => void
  onDragEnd?: (event: DragEndEvent) => void
  onDragStart?: (event: DragStartEvent) => void
}

type EditorSortGroupProps<T extends EditorSortItemProps = EditorSortItemProps> = {
  children: (item: T, index: number) => React.ReactNode
}

type EditorEditorSortItemProps = {
  id: string
  name: string
  checked: boolean
  children: React.ReactNode
  contentClassName?: string
  onCheckedChange: (checked: boolean) => void
}

export const EditorSortContext = createContext<EditorSortContextProps>({
  data: [],
  activeCardId: null,
})

const t = tunnel()

export const useEditorSortContext = <T extends EditorSortItemProps = EditorSortItemProps>() => {
  return useContext(EditorSortContext) as EditorSortContextProps<T>
}

export const EditorSortProvider = <T extends EditorSortItemProps = EditorSortItemProps>({
  data,
  children,
  onDragEnd,
  onDragStart,
  onDataChange,
  ...props
}: EditorSortProviderProps<T>) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)

  const sensor = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  )

  const handleDragStart = (event: DragStartEvent) => {
    const card = data.find((item) => item.id === event.active.id)
    if (card) {
      setActiveCardId(card.id)
    }
    onDragStart?.(event)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCardId(null)
    onDragEnd?.(event)

    const { active, over } = event
    if (!over || active.id === over.id) return

    let newData = [...data]
    const oldIndex = newData.findIndex((item) => item.id === active.id)
    const newIndex = newData.findIndex((item) => item.id === over.id)
    newData = arrayMove(data, oldIndex, newIndex)

    onDataChange?.(newData)
  }

  return (
    <EditorSortContext.Provider value={{ data, activeCardId }}>
      <DndContext
        sensors={sensor}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        collisionDetection={closestCenter}
        modifiers={[restrictToWindowEdges, restrictToVerticalAxis]}
        {...props}
      >
        {children}
      </DndContext>
    </EditorSortContext.Provider>
  )
}

export const EditorSortGroup = <T extends EditorSortItemProps = EditorSortItemProps>({
  children,
}: EditorSortGroupProps<T>) => {
  const { data = [], activeCardId } = useEditorSortContext<T>()
  const items = data.map((i) => i.id)

  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      {data?.map(children)}
      {createPortal(
        <DragOverlay dropAnimation={null}>{activeCardId && <t.Out />}</DragOverlay>,
        document.body,
      )}
    </SortableContext>
  )
}

export const EditorSortItem = ({
  id,
  name,
  checked,
  children,
  contentClassName,
  onCheckedChange,
}: EditorEditorSortItemProps) => {
  const { activeCardId } = useEditorSortContext()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <React.Fragment>
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
            <Switch checked={checked} onCheckedChange={onCheckedChange} />
            <EditorBlockTrigger />
          </EditorBlockGroup>
        </EditorBlockHeader>
        <EditorBlockContent className={contentClassName}>{children}</EditorBlockContent>
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
                <Switch checked={checked} />
                <EditorBlockTrigger />
              </EditorBlockGroup>
            </EditorBlockHeader>
            <EditorBlockContent>{children}</EditorBlockContent>
          </EditorBlockItem>
        </t.In>
      )}
    </React.Fragment>
  )
}

export const EditorSubSortItem = ({
  id,
  onDelete,
  children,
}: {
  id: string
  onDelete?: () => void
  children: React.ReactNode
}) => {
  const { activeCardId } = useEditorSortContext()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <React.Fragment>
      <EditorSubSortListItem
        style={{
          transition,
          transform: CSS.Transform.toString(transform),
        }}
        ref={setNodeRef}
        onDelete={onDelete!}
        listeners={listeners!}
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
    </React.Fragment>
  )
}
