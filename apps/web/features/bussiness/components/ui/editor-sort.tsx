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
  // EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"

// Component type definitions

type EditorSortContextProps<T extends EditorSortItemProps = EditorSortItemProps> = {
  data: T[]
  activeCardId: string | null
}

type EditorSortItemProps = {
  id: string
  name: string
} & Record<string, any>

type EditorSortProviderProps<T extends EditorSortItemProps = EditorSortItemProps> = {
  data: T[]
  children: React.ReactNode
  onDataChange?: (data: T[]) => void
  onDragEnd?: (event: DragEndEvent) => void
  onDragStart?: (event: DragStartEvent) => void
}

type EditorSortGroupProps<T extends EditorSortItemProps = EditorSortItemProps> = {
  children: (item: T) => React.ReactNode
}

type EditorEditorSortItemProps = {
  id: string
  name: string
  isOpen: boolean
  checked: boolean
  children: React.ReactNode
  onTriggerClick: (id: string) => void
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
  const { data, activeCardId } = useEditorSortContext<T>()
  const items = data.map((i) => i.id)

  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      {data.map(children)}
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
  isOpen,
  checked,
  children,
  onTriggerClick,
  onCheckedChange,
}: EditorEditorSortItemProps) => {
  const { activeCardId } = useEditorSortContext()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <React.Fragment>
      <EditorBlockItem
        style={style}
        // open={isOpen}
        ref={setNodeRef}
        className={isDragging ? "pointer-events-none cursor-grabbing opacity-60" : undefined}
      >
        <EditorBlockHeader>
          <EditorBlockGroup>
            <EditorBlockGrip {...attributes} {...listeners} />
            <EditorBlockTitle>{name}</EditorBlockTitle>
          </EditorBlockGroup>
          <EditorBlockGroup>
            <Switch checked={checked} onCheckedChange={onCheckedChange} />
            {/* <EditorBlockTrigger onClick={() => onTriggerClick(id)} /> */}
          </EditorBlockGroup>
        </EditorBlockHeader>
        <EditorBlockContent>{children}</EditorBlockContent>
      </EditorBlockItem>

      {activeCardId === id && (
        <t.In>
          <EditorBlockItem
            //  open={isOpen}
            isDragging={isDragging}
          >
            <EditorBlockHeader>
              <EditorBlockGroup>
                <EditorBlockGrip />
                <EditorBlockTitle>{name}</EditorBlockTitle>
              </EditorBlockGroup>
              <EditorBlockGroup>
                <Switch checked={checked} />
                {/* <EditorBlockTrigger /> */}
              </EditorBlockGroup>
            </EditorBlockHeader>
            <EditorBlockContent>{children}</EditorBlockContent>
          </EditorBlockItem>
        </t.In>
      )}
    </React.Fragment>
  )
}
