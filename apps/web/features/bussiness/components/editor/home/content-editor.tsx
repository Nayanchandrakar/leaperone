import { Switch } from "@app/ui/components/switch"
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import {
  EditorBlock,
  EditorBlockContent,
  EditorBlockGrip,
  EditorBlockGroup,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { useEditorBlock } from "@/features/bussiness/hooks/home/use-editor-block"

export default function ContentEditor() {
  const [data, setData] = useState<{ tittle: string; id: string }[]>([
    {
      tittle: "Card Profile",
      id: "card-profile",
    },
    {
      tittle: "Heading + Text",
      id: "heading-text",
    },
  ])

  const { currentItem, onToggle } = useEditorBlock("")

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = Number(active.id)
      const newIndex = Number(over.id)
      const reorderedItems = arrayMove(data, oldIndex, newIndex)
      setData(reorderedItems)
    }
  }

  return (
    <EditorBlock>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={data.map((_, index) => String(index))}
          strategy={verticalListSortingStrategy}
        >
          {data.map((item, index) => {
            return (
              <SortableEditorBlockItem
                checked
                key={index}
                index={index}
                item={item.id}
                title={item.tittle}
                onTriggerClick={onToggle}
                onCheckedChange={() => {}}
                isOpen={currentItem === item.id}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptates error
                temporibus omnis quos iure dolor corporis velit fugit totam quod suscipit quam
                accusamus harum aliquid illum blanditiis, reprehenderit obcaecati.
              </SortableEditorBlockItem>
            )
          })}
        </SortableContext>
      </DndContext>
    </EditorBlock>
  )
}

type SortableEditorBlockItemProps = {
  item: string
  title: string
  index: number
  isOpen: boolean
  checked: boolean
  children: React.ReactNode
  onTriggerClick: (newItem: string) => void
  onCheckedChange: (checked: boolean) => void
}

const SortableEditorBlockItem = ({
  item,
  title,
  index,
  isOpen,
  checked,
  children,
  onTriggerClick,
  onCheckedChange,
}: SortableEditorBlockItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: String(index),
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties

  return (
    <div ref={setNodeRef} style={style}>
      <EditorBlockItem
        open={isOpen}
        className={isDragging ? "pointer-events-none cursor-grabbing opacity-30" : ""}
      >
        <EditorBlockHeader>
          <EditorBlockGroup>
            <EditorBlockGrip {...attributes} {...listeners} />
            <EditorBlockTitle>{title}</EditorBlockTitle>
          </EditorBlockGroup>

          <EditorBlockGroup>
            <Switch checked={checked} onCheckedChange={onCheckedChange} />
            <EditorBlockTrigger onClick={() => onTriggerClick(item)} />
          </EditorBlockGroup>
        </EditorBlockHeader>

        <EditorBlockContent>{children}</EditorBlockContent>
      </EditorBlockItem>
    </div>
  )
}
