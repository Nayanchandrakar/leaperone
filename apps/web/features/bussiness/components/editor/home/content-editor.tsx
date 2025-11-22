import { useState } from "react"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import {
  EditorSortGroup,
  EditorSortItem,
  EditorSortProvider,
} from "@/features/bussiness/components/ui/editor-sort"

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

  return (
    <EditorBlock defaultValue="card-profile">
      <EditorSortProvider data={data} onDataChange={setData}>
        <EditorSortGroup>
          {(item) => (
            <EditorSortItem
              id={item.id}
              key={item.id}
              checked={false}
              name={item.name}
              onCheckedChange={() => {}}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptates error
              temporibus omnis quos iure dolor corporis velit fugit totam quod suscipit quam
              accusamus harum aliquid illum blanditiis, reprehenderit obcaecati.
            </EditorSortItem>
          )}
        </EditorSortGroup>
      </EditorSortProvider>
    </EditorBlock>
  )
}
