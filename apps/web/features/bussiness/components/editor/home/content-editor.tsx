import { useState } from "react"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import {
  EditorSortGroup,
  // EditorSortItem,
  EditorSortProvider,
} from "@/features/bussiness/components/ui/editor-sort"
// import { useEditorBlock } from "@/features/bussiness/hooks/home/use-editor-block"

export default function ContentEditor() {
  const [data, setData] = useState([
    {
      name: "Card Profile",
      id: "card-profile",
    },
    {
      name: "Heading + Text",
      id: "heading-text",
    },
  ])

  // const { currentItem, onToggle } = useEditorBlock("card-profile")

  return (
    <EditorBlock>
      <EditorSortProvider data={data} onDataChange={setData}>
        <EditorSortGroup>
          {(item) => (
            // <EditorSortItem
            //   id={item.id}
            //   key={item.id}
            //   name={item.name}
            //   checked={false}
            //   onTriggerClick={onToggle}
            //   onCheckedChange={() => {}}
            //   isOpen={currentItem === item.id}
            // >
            //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptates error
            //   temporibus omnis quos iure dolor corporis velit fugit totam quod suscipit quam
            //   accusamus harum aliquid illum blanditiis, reprehenderit obcaecati.
            // </EditorSortItem>
            <div className="" />
          )}
        </EditorSortGroup>
      </EditorSortProvider>
    </EditorBlock>
  )
}
