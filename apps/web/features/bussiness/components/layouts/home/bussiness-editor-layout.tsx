"use client"

import { Editor } from "@/features/bussiness/components/editor/home"
import { EditorPreviewPanel } from "@/features/bussiness/components/editor/home/editor-preview-panel"

export const BusinessEditorLayout = () => {
  return (
    <div className="container my-20 grid grid-cols-1 md:grid-cols-[1.6fr_minmax(330px,0.4fr)] gap-6 md:gap-8">
      <Editor />
      <EditorPreviewPanel />
    </div>
  )
}
